from dotenv import load_dotenv
import os
import base64
import firebase_admin
from firebase_admin import credentials, firestore

# Load .env from the project root
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env"))
load_dotenv(dotenv_path=env_path)

# Now access the env var
firebase_key_base64 = os.getenv("FIREBASE_KEY_BASE64")
if not firebase_key_base64:
    raise Exception("Missing FIREBASE_KEY_BASE64 environment variable")

# Write the decoded key to a temp file
key_path = "/tmp/firebase-key.json"
with open(key_path, "wb") as f:
    f.write(base64.b64decode(firebase_key_base64))

# Initialize Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate(key_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()
