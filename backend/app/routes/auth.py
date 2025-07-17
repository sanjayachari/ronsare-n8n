from fastapi import APIRouter, HTTPException, status , Depends
from pydantic import BaseModel
from app.controllers.auth import register_user, authenticate_user
from app.utils.jwt import create_jwt_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.jwt import verify_jwt_token

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate):
    success = register_user(user.email, user.password)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return {"message": "User registered successfully"}

from fastapi.responses import JSONResponse

@router.post("/login")
def login(user: UserLogin):
    is_authenticated = authenticate_user(user.email, user.password)
    if not is_authenticated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token = create_jwt_token({"sub": user.email})

    response = JSONResponse(content={"message": "Login successful"})
    # Set cookie in response
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,  # prevents JavaScript access (recommended)
        secure=False,   # set to True in production with HTTPS
        samesite="Lax", # or "Strict"/"None" depending on frontend/backend setup
        max_age=86400   # 1 day
    )
    return response



auth_scheme = HTTPBearer()

SECRET_KEY = "ronsare-n8n" 
ALGORITHM = "HS256"


from jose import JWTError, jwt

@router.get("/verify")
def verify_token(request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=403, detail="Access token missing")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {"message": "Authenticated", "email": payload.get("sub")}
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid or expired token")