from config import db
from datetime import datetime

applications = db.applications

def apply_to_job(data):
    # Prevent duplicate application
    existing = applications.find_one({
        "jobId": data["jobId"],
        "applicantId": data["applicantId"]
    })

    if existing:
        return {"error": "Already applied"}

    data["createdAt"] = datetime.utcnow()
    applications.insert_one(data)
    return {"success": True}

def get_applications_by_applicant(applicant_id):
    return list(applications.find({"applicantId": applicant_id}))


def get_applications_by_job(job_id):
    return list(applications.find({"jobId": job_id}))