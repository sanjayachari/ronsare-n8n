from fastapi import FastAPI
from app.routes.auth import router as auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173" , "https://ronsare-n8n-frontend.onrender.com"],  # 👈 use exact origin, not "*"
    allow_credentials=True,      # Allow cookies/auth headers (can cause issues with '*')
    allow_methods=["*"],         # Allow all HTTP methods: GET, POST, etc.
    allow_headers=["*"],         # Allow all headers
)

# Register routes
app.include_router(auth, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI – Ronsare"}