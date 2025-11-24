# ChoiceTech Job Portal

This is a full-stack Job Portal application built with **Flask** (backend) and **Vite + React** (frontend). The project allows users to register, browse jobs, apply for jobs, and for employers to manage job postings and view applicants.

---

## 📗 Repository Structure

```
choicetech/
├── backend/        # Flask backend application
├── frontend/       # Vite + React frontend application
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vrutansh/choicetech.git
cd choicetech
```

---

### 2. Backend Setup

1. Create a Python virtual environment:

```bash
python -m venv venv
```

2. Activate the environment:

* **Windows:**

```bash
venv\Scripts\activate
```

* **Linux / MacOS:**

```bash
source venv/bin/activate
```

3. Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

4. Run the Flask server:

```bash
cd backend
flask run
```

The backend will run on `http://127.0.0.1:5000`.

---

### 3. Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite chooses).

---

## 🔑 Features

* **User Functionality:**

  * Register and login
  * Browse all jobs
  * View a single job
  * Apply for jobs with resume URL
  * View applied jobs

* **Employer Functionality:**

  * Register and login
  * Create, edit, and delete job postings
  * View all jobs they posted
  * View applicants for a job

* **Authentication:** JWT-based authentication for protected routes.

* **Database:** MongoDB for storing users, employers, jobs, and applications.

---

## ⚡ Tech Stack

* **Backend:** Flask, Flask-JWT-Extended, Flask-CORS, PyMongo
* **Frontend:** React, Vite, Axios, TailwindCSS
* **Database:** MongoDB

---

## 📖 API Documentation

Complete API documentation is available [here](https://github.com/vrutansh/choicetech/raw/main/Job_Portal_API_Documentation.pdf).


---

## 📌 Notes

* Ensure MongoDB is running before starting the backend.
* Use the provided Postman collection or API documentation PDF for testing endpoints.
* JWT token from login must be sent in `Authorization: Bearer <TOKEN>` header for protected routes.

---

## 🛠 Author

**Vrutansh Patel**
GitHub: [https://github.com/vrutansh](https://github.com/vrutansh)
