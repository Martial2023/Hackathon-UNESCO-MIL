import pandas as pd
import mysql.connector
import joblib
import os
from dotenv import load_dotenv
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score, classification_report
from embedding import embed

# --- CONFIGURATION (lue depuis le fichier .env) ---
load_dotenv()
DB_CONFIG = {
    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME')
}

MODEL_FILENAME = 'Hackathon-UNESCO-MIL/modele_fakeNews.joblib'


# --- 3. APPRENTISSAGE CONTINU ---
def retrain_model():
    """Charge le modèle existant et le ré-entraîne sur de nouvelles données étiquetées par l'humain."""
    if not os.path.exists(MODEL_FILENAME):
        print(f"Erreur: Le fichier modèle '{MODEL_FILENAME}' n'existe pas. Exécutez le script d'abord pour l'entraînement initial.")
        return
        
    print("\nDébut de l'apprentissage incrémental du modèle...")
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True) # Utilise le dictionnaire pour un accès facile
        
        # Récupère les nouvelles données qui ont été étiquetées manuellement (is_fake n'est pas NULL)
        cursor.execute("SELECT content, is_fake FROM news_articles WHERE is_fake IS NOT NULL ")
        new_data_raw = cursor.fetchall()
        
        if not new_data_raw:
            print("Aucune nouvelle donnée étiquetée par l'humain à utiliser pour le ré-entraînement.")
            return

        # Prépare les données pour le ré-entraînement
        new_df = pd.DataFrame(new_data_raw)
        X_new = embed(new_df['content'])
        y_new = new_df['is_fake']

        # Charge le modèle et le ré-entraîne
        pipeline = joblib.load(MODEL_FILENAME)
        pipeline.fit(X_new, y_new) # Le PassiveAggressiveClassifier est incrémental par défaut

        # Sauvegarde du modèle mis à jour
        joblib.dump(pipeline, MODEL_FILENAME)
        print(f"Modèle mis à jour avec {len(new_data_raw)} nouveaux articles et sauvegardé.")
        
    except mysql.connector.Error as err:
        print(f"Erreur de base de données lors du ré-entraînement: {err}")
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# --- EXÉCUTION DU SCRIPT PRINCIPAL ---
if __name__ == "__main__": 
    retrain_model()