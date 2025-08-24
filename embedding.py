from sentence_transformers import SentenceTransformer
import numpy as np

"""
Chargement du model de l'embedding
"""

try :
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

except Exception as e:
    print(f"Erreur lors du chargement du modele {e}")
    model = None

def embed(sentences) -> np.ndarray : ## La fonction qui s'occuppe de faire l'embedding
    if model is None :
        return []
    embedding = model.encode([sentences])
    return embedding