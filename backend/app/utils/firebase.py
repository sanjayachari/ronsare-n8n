import firebase_admin
from firebase_admin import credentials, firestore

# Replace this path with your actual service account JSON path
cred = credentials.Certificate("app/utils/serviceAccountKey.json")

# Initialize Firebase only once
default_app = firebase_admin.initialize_app(cred)

# Optional: create Firestore client if needed
db = firestore.client()
