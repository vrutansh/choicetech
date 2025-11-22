from config import db
from datetime import datetime
from bson import ObjectId

jobs = db.jobs

def create_job(data):
    data["createdAt"] = datetime.utcnow()
    return jobs.insert_one(data)

def get_jobs():
    return list(jobs.find())

def get_job(job_id):
    return jobs.find_one({"_id": ObjectId(job_id)})

def update_job(job_id, data):
    return jobs.update_one({"_id": ObjectId(job_id)}, {"$set": data})

def delete_job(job_id):
    return jobs.delete_one({"_id": ObjectId(job_id)})
