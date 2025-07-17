from fastapi import FastAPI
from app.routes.auth import router as auth

app = FastAPI()

# Register routes
app.include_router(auth, prefix="/auth")

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI – Ronsare"}