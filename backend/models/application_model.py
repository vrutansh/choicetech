from config import db
from datetime import datetime

applications = db.applications

def apply_to_job(data):
    data["appliedAt"] = datetime.utcnow()
    return applications.insert_one(data)
