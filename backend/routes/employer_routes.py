from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.role_required import role_required
from models.job_model import *
from bson import ObjectId

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

    # Convert ObjectId to string for JSON response
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
