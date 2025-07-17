import bcrypt
import jwt
import datetime
from app.utils.firebase import db
from fastapi import HTTPException

# Constants
SECRET_KEY = "ronsare-n8n" 
ALGORITHM = "HS256"

def register_user(email: str, password: str) -> bool:
    user_ref = db.collection("USER-COLLECTION").document(email.lower())
    if user_ref.get().exists:
        return False

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    user_ref.set({
        "email": email,
        "password": hashed_password.decode('utf-8')  # Store hash as string
    })
    return True


def authenticate_user(email: str, password: str):
    user_ref = db.collection("USER-COLLECTION").document(email.lower())
    doc = user_ref.get()

    if not doc.exists:
        return None

    user_data = doc.to_dict()
    stored_hash = user_data["password"].encode("utf-8")

    if bcrypt.checkpw(password.encode("utf-8"), stored_hash):
        token = generate_token(email)
        return {"email": email, "token": token}

    return None


def generate_token(email: str) -> str:
    payload = {
        "sub": email,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
