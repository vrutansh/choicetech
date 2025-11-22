from flask import Flask
from config import create_app
from routes.auth_routes import auth
from routes.applicant_routes import applicant
from routes.employer_routes import employer

app = create_app()

app.register_blueprint(auth, url_prefix="/api/auth")
app.register_blueprint(applicant, url_prefix="/api")
app.register_blueprint(employer, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
