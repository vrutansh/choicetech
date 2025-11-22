from flask import Blueprint, request, jsonify
from models.user_model import *
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth = Blueprint("auth", __name__)

@auth.post("/register")
def register():
    data = request.json
    if find_user_by_email(data["email"]):
        return jsonify({"error": "Email already exists"}), 400
    
    create_user(data)
    return jsonify({"msg": "User registered successfully"}), 201


@auth.post("/login")
def login():
    data = request.json
    user = find_user_by_email(data["email"])

    if not user or not verify_password(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(
        identity=str(user["_id"]),                      # string only
        additional_claims={"role": user["role"]},       # role goes here
        expires_delta=timedelta(days=1)
    )

    return jsonify({"token": token, "role": user["role"]})

