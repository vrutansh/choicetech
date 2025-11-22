from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.role_required import role_required
from models.job_model import get_jobs, get_job
from models.application_model import apply_to_job
from bson import ObjectId

applicant = Blueprint("applicant", __name__)

# Browse all jobs
@applicant.get("/jobs")
def browse_jobs():
    jobs_list = get_jobs()
    for job in jobs_list:
        job["_id"] = str(job["_id"])
    return jsonify(jobs_list)

# Job details
@applicant.get("/jobs/<job_id>")
def job_details(job_id):
    job = get_job(job_id)
    job["_id"] = str(job["_id"])
    return jsonify(job)

# Apply to job
@applicant.post("/jobs/<job_id>/apply")
@jwt_required()
@role_required("applicant")
def apply(job_id):
    applicant_id = get_jwt_identity()

    data = {
        "jobId": job_id,
        "applicantId": applicant_id,
        "resumeUrl": request.json.get("resumeUrl")
    }

    apply_to_job(data)

    return jsonify({"msg": "Application submitted successfully"})
