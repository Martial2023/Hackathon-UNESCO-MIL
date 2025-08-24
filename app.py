import joblib
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import numpy as np
from model import process_news_pipeline, get_fake_news
from embedding import embed


classifier_model = joblib.load("/home/koubra/Documents/fake_news_detector/Hackathon-UNESCO-MIL/modele_fakeNews.joblib") # Chargement du modele

# --- Configuration de l'API FastAPI et de l'ordonnanceur ---
app = FastAPI()
scheduler = AsyncIOScheduler()

class PredictionRequest(BaseModel):
    text: str

@app.on_event("startup")
async def startup_event():
    """
    Cette fonction s'exécute au lancement de l'application.
    Elle lance la première exécution et planifie les suivantes.
    """
    print("Application démarrée. Lancement de la première exécution de la pipeline...")
    
    # Exécution immédiate de la tâche
    scheduler.add_job(process_news_pipeline, 'date')
    
    # Planification des exécutions futures toutes les 5 heures
    scheduler.add_job(process_news_pipeline, 'interval', hours=5)
    
    scheduler.start()
    print("Tâche de récupération et de prédiction planifiée pour s'exécuter toutes les 5 heures.")

# --- Définition des endpoints de l'API ---

@app.post("/predict")
async def predict_single_text(request: PredictionRequest):
    """
    Endpoint pour prédire le label d'un seul texte en temps réel.
    """
    if classifier_model is None :
        return {"error": "Les modèles ne sont pas chargés sur le serveur."}
    
    try:
        text_embedding = embed(request.text)
        prediction_label = classifier_model.predict(text_embedding)[0]
        prediction_score = classifier_model.decision_function(text_embedding)[0]
        
        label = 'FAKE' if prediction_label == True else 'REAL'

        if prediction_score < 0.6 :
            surete = "Faible"
        elif prediction_score >= 0.6 and prediction_score <= 0.8 :
            surete = 'Moyen'
        else : 
            surete = 'Eleve'
        
        return {
            "prediction": label,
            "surete" : surete
        }
    except Exception as e:
        return {"error": f"Une erreur est survenue lors de la prédiction: {e}"}
    
@app.get("/recent-fakenews")
async def get_recent_fakenews():
   recents_fake_news = get_fake_news()
   return recents_fake_news