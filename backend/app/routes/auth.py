from fastapi import APIRouter
from app.controllers.auth import get_users, get_user_by_id

router = APIRouter()

@router.get("/")
def list_users():
    return get_users()

@router.get("/{user_id}")
def get_user(user_id: int):
    return get_user_by_id(user_id)
