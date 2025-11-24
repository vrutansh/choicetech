from flask import Blueprint, request, jsonify
from models.user_model import *
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth = Blueprint("auth", __name__)

# ---------------------------
# REGISTER USER (Job Seeker)
# ---------------------------
@auth.post("/register-user")
def register_user():
    data = request.json
    
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email & password required"}), 400

    if find_user_by_email(data["email"]):
        return jsonify({"error": "Email already exists"}), 400

    data["role"] = "user"  
    create_user(data)

    return jsonify({"msg": "User registered successfully"}), 201


# ---------------------------
# REGISTER EMPLOYER
# ---------------------------
@auth.post("/register-employer")
def register_employer():
    data = request.json
    if not data.get("companyName"):
        return jsonify({"error": "Company name required"}), 400

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email & password required"}), 400

    if find_user_by_email(data["email"]):
        return jsonify({"error": "Email already exists"}), 400

    data["role"] = "employer" 
    create_user(data)

    return jsonify({"msg": "Employer registered successfully"}), 201


# ---------------------------
# LOGIN (Same for both)
# ---------------------------
@auth.post("/login")
def login():
    data = request.json

    user = find_user_by_email(data.get("email"))

    if not user or not verify_password(user["password"], data.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(
        identity=str(user["_id"]),
        additional_claims={"role": user.get("role")},
        expires_delta=timedelta(days=1)
    )

    return jsonify({
        "token": token,
        "role": user.get("role"),
        "msg": "Login successful"
    }), 200