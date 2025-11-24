from flask_jwt_extended import get_jwt
from functools import wraps
from flask import jsonify

# def role_required(role):
#     def wrapper(fn):
#         @wraps(fn)
#         def decorator(*args, **kwargs):
#             claims = get_jwt()
#             if claims.get("role") != role:
#                 return jsonify({"error": "Access denied"}), 403
#             return fn(*args, **kwargs)
#         return decorator
#     return wrapper



def role_required(allowed_roles):
    if isinstance(allowed_roles, str):
        allowed_roles = [allowed_roles]

    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            user_role = claims.get("role")

            if user_role not in allowed_roles:
                return jsonify({"error": "Access denied"}), 403

            return fn(*args, **kwargs)

        return decorator
    return wrapper
