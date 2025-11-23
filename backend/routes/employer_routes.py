from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.role_required import role_required
from models.application_model import get_applications_by_job
from models.job_model import *
from bson import ObjectId
from models.user_model import users

employer = Blueprint("employer", __name__)

# Create job
@employer.post("/employer/jobs")
@jwt_required()
@role_required("employer")
def create_job_route():
    employer_id = get_jwt_identity()  # Now a plain string (user ID)
    
    data = request.json
    data["postedBy"] = employer_id     # Save employer ID as string

    create_job(data)
    return jsonify({"msg": "Job created successfully"}), 201


# Employer dashboard (view own jobs)
@employer.get("/employer/jobs")
@jwt_required()
@role_required("employer")
def employer_jobs():
    employer_id = get_jwt_identity()

    jobs_list = list(jobs.find({"postedBy": employer_id}))


    for job in jobs_list:
        job["_id"] = str(job["_id"])

    return jsonify(jobs_list), 200


# Edit a job
@employer.put("/employer/jobs/<job_id>")
@jwt_required()
@role_required("employer")
def update_job_route(job_id):
    data = request.json

    update_job(job_id, data)
    return jsonify({"msg": "Job updated successfully"}), 200


# Delete a job
@employer.delete("/employer/jobs/<job_id>")
@jwt_required()
@role_required("employer")
def delete_job_route(job_id):
    delete_job(job_id)
    return jsonify({"msg": "Job deleted"}), 200



@employer.get("/employer/jobs/<job_id>/applications")
@jwt_required()
@role_required("employer")
def view_applicants(job_id):
    employer_id = get_jwt_identity()

    # Ensure employer owns this job
    job = jobs.find_one({"_id": ObjectId(job_id), "postedBy": employer_id})

    if not job:
        return jsonify({"msg": "Job not found or unauthorized"}), 404

    applications = get_applications_by_job(job_id)

    response = []

    for a in applications:
       
        user = users.find_one({"_id": ObjectId(a["applicantId"])})

        response.append({
            "applicationId": str(a["_id"]),
            "resumeUrl": a.get("resumeUrl"),
            "appliedAt": a.get("createdAt"),
            "user": {
                "_id": a["applicantId"],
                "name": user.get("name") if user else None,
                "email": user.get("email") if user else None,
                "phone": user.get("phone") if user else None,
            }
        })

    return jsonify(response), 200   