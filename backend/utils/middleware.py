import jwt
from flask import request, jsonify
import os
from bson import ObjectId
from backend.models.user_model import users

def auth_required(role=None):
    def wrapper(fn):
        def decorated(*args, **kwargs):
            token = request.headers.get("Authorization")

            if not token:
                return jsonify({"error": "Missing token"}), 401

            try:
                payload = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
                user = users.find_one({"_id": ObjectId(payload["id"])})
                
                if not user:
                    return jsonify({"error": "User not found"}), 401

                if role and user["role"] != role:
                    return jsonify({"error": "Unauthorized"}), 403

                request.user = user
            except jwt.ExpiredSignatureError:
                return jsonify({"error": "Token expired"}), 401
            except Exception:
                return jsonify({"error": "Invalid token"}), 401

            return fn(*args, **kwargs)
        decorated.__name__ = fn.__name__
        return decorated
    return wrapper
