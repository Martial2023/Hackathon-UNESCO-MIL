import mysql.connector
import joblib
import os
import requests
import pandas as pd
from fastapi import HTTPException
from datetime import datetime
from dotenv import load_dotenv
from embedding import embed

# Charge les variables d'environnement
load_dotenv() 

# --- CONFIGURATION (lue depuis .env) ---
DB_CONFIG = {
    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME')
}

THRESHOLD_DE_CONFIANCE = 0.5

# --- Chargement des modèles une seule fois ---
try:
    classifier_model = joblib.load("/home/koubra/Documents/fake_news_detector/Hackathon-UNESCO-MIL/modele_fakeNews.joblib")

    print("Modèles de classification et d'embedding chargés avec succès.")
except Exception as e:
    print(f"Erreur lors du chargement des modèles : {e}")
    classifier_model = None


# --- FONCTION D'INSTANCIATION DE LA BASE DE DONNÉES ---
def get_db_connection():
    """Crée et renvoie un objet de connexion à la base de données."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        print(f"Erreur de connexion à la base de données : {err}")
        return None

# --- FONCTION UNIQUE POUR GÉRER L'ENSEMBLE DU FLUX ---
def process_news_pipeline(api_name='newsapi', categories=["General"]):
    """
    Récupère, nettoie, prédit et stocke les données d'actualités.
    """
    if classifier_model is None :
        print("Erreur : Impossible d'exécuter la pipeline. Les modèles n'ont pas été chargés.")
        return

    conn = get_db_connection()
    if not conn:
        return

    try:
        cursor = conn.cursor(dictionary=True)
        
        # 1. RÉCUPÉRER ET STOCKER LES DONNÉES DE L'API
        print(f"\n--- Étape 1: Récupération des données depuis l'API {api_name} ---")
        articles = []
        for category in categories:
            url = ""
            if api_name.lower() == 'newsapi':
                url = f"https://newsapi.org/v2/top-headlines?category={category}&apiKey={os.environ.get('NEWSAPI_KEY')}"
            elif api_name.lower() == 'gnews':
                url = f"https://gnews.io/api/v4/top-headlines?lang=en&token={os.environ.get('GNEWS_KEY')}"
            
            try:
                response = requests.get(url, timeout=10)
                response.raise_for_status()
                data = response.json()
                articles.extend(data.get('articles', []))
                print(f"  > Récupéré {len(data.get('articles', []))} articles pour la catégorie '{category}'.")
            except requests.exceptions.RequestException as e:
                print(f"  > Erreur lors de la récupération pour la catégorie '{category}' : {e}")

        if not articles:
            print("Aucun article à traiter.")
            return

        # Stockage des données brutes
        print("\n--- Étape 2: Nettoyage et stockage des données brutes dans la DB ---")
        sql = """
        INSERT INTO news_articles (source_name, author, title, description, url, published_at, content)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE content=VALUES(content)
        """
        data_to_insert = []
        for article in articles:
            source_name = article.get('source', {}).get('name') if isinstance(article.get('source'), dict) else None
            published_at_str = article.get('publishedAt') or article.get('published_at')
            published_at = datetime.fromisoformat(published_at_str.replace('Z', '+00:00')) if published_at_str else None
            data_to_insert.append((
                source_name,
                article.get('author'),
                article.get('title'),
                article.get('description'),
                article.get('url'),
                published_at,
                article.get('content')
            ))
        cursor.executemany(sql, data_to_insert)
        conn.commit()
        print(f"{cursor.rowcount} articles insérés ou mis à jour.")

        # 3. PRÉDICTION DES ARTICLES NON ÉTIQUETÉS
        print("\n--- Étape 3: Prédiction des articles et stockage des résultats ---")
        select_query = "SELECT id, content FROM news_articles WHERE predicted_label IS NULL AND content IS NOT NULL"
        cursor.execute(select_query)
        unlabeled_articles = cursor.fetchall()

        if not unlabeled_articles:
            print("Aucun article à prédire.")
            return

        articles_ids = [article['id'] for article in unlabeled_articles]
        articles_content = [article['content'] for article in unlabeled_articles]
        
        # Générer les embeddings pour la prédiction
        articles_embeddings = embed(articles_content)
        predictions_labels = classifier_model.predict(articles_embeddings)
        predictions_scores = classifier_model.decision_function(articles_embeddings)
        
        articles_a_mettre_a_jour = []
        articles_douteux = 0

        for i, score in enumerate(predictions_scores):
            # C'est la ligne correcte pour convertir les prédictions
            label = str(predictions_labels[i])
            if abs(score) < THRESHOLD_DE_CONFIANCE:
                articles_douteux += 1
            else:
                article_id = articles_ids[i]
                articles_a_mettre_a_jour.append((label, score, article_id))

        if not articles_a_mettre_a_jour:
            print("Aucun article avec une prédiction de haute confiance à mettre à jour.")
            return

        update_query = """
        UPDATE news_articles
        SET predicted_label = %s, prediction_score = %s
        WHERE id = %s
        """
        cursor.executemany(update_query, articles_a_mettre_a_jour)
        conn.commit()
        print(f"{cursor.rowcount} articles mis à jour avec les prédictions.")
        print(f"Articles mis de côté pour vérification humaine : {articles_douteux}")

    except mysql.connector.Error as err:
        print(f"Erreur de base de données : {err}")
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


def get_fake_news() :
    """
    Récupère de manière aléatoire 10 articles étiquetés comme de fausses nouvelles
    (predicted_label = True).
    """
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True)
        
        # Requête SQL pour sélectionner 10 articles aléatoires.
        # Nous utilisons `ORDER BY RAND()` pour une sélection aléatoire
        # et vérifions si `predicted_label` est vrai et le score est élevé.
        # Remarque : `True` est stocké sous forme de 1 dans MySQL.
        query = """
        SELECT  title, description, url, published_at
        FROM news_articles
        WHERE predicted_label = TRUE AND abs(prediction_score) > %s
        ORDER BY RAND()
        LIMIT 10
        """
        cursor.execute(query, (THRESHOLD_DE_CONFIANCE,))
        fakenews_articles = cursor.fetchall()

        if not fakenews_articles:
            # Si aucun article n'est trouvé, on lève une erreur HTTP 404
            raise HTTPException(status_code=404, detail="Aucune fausse nouvelle récente n'a été trouvée avec un score de haute confiance.")

        return fakenews_articles

    except mysql.connector.Error as err:
        print(f"Erreur de base de données : {err}")
        raise HTTPException(status_code=500, detail="Erreur de base de données.")
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


# --- EXÉCUTION DU SCRIPT PRINCIPAL ---
if __name__ == "__main__":
    api_name = 'newsapi'
    categories = ["Business", "Entertainment", "General", "Health", "Science", "Sports","Technology"]
    process_news_pipeline(api_name, categories)