from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.role_required import role_required
from models.job_model import get_jobs, get_job, jobs
from models.application_model import apply_to_job, get_applications_by_applicant
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
    if not job:
        return jsonify({"msg": "Job not found"}), 404
    
    job["_id"] = str(job["_id"])
    return jsonify(job)


# Apply to job
@applicant.post("/jobs/<job_id>/apply")
@jwt_required()
@role_required(["user", "applicant"])
# @role_required("applicant")
def apply(job_id):
    applicant_id = get_jwt_identity()

    data = {
        "jobId": job_id,
        "applicantId": applicant_id,
        "resumeUrl": request.json.get("resumeUrl")
    }

    result = apply_to_job(data)

    if "error" in result:
        return jsonify({"msg": result["error"]}), 400

    return jsonify({"msg": "Application submitted successfully"}), 201


# Logged-in user applied jobs
@applicant.get("/applied-jobs")
@jwt_required()
@role_required(["user", "applicant"])
# @role_required("applicant")
def applied_jobs():
    applicant_id = get_jwt_identity()
    applications = get_applications_by_applicant(applicant_id)

    from models.job_model import jobs  # safe import

    output = []

    for app in applications:
        job = jobs.find_one({"_id": ObjectId(app["jobId"])})

        if job:
            job["_id"] = str(job["_id"])
            output.append({
                
                "applicationId": str(app["_id"]),
                "job": job,
                "resumeUrl": app.get("resumeUrl")
            })

    return jsonify(output), 200
