from werkzeug.security import generate_password_hash, check_password_hash
from config import db

users = db.users

def create_user(data):
    data["password"] = generate_password_hash(data["password"])
    users.insert_one(data)
    return True

def find_user_by_email(email):
    return users.find_one({"email": email})

def verify_password(hashed, password):
    return check_password_hash(hashed, password)
