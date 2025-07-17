from app.database.db import fake_users_db

def get_users():
    return fake_users_db

def get_user_by_id(user_id: int):
    for user in fake_users_db:
        if user["id"] == user_id:
            return user
    return {"error": "User not found"}
