# Clinic Management System

A full-stack web application for managing clinic patients and appointments.

## Overview

This project allows clinic staff to manage patient records and schedule doctor appointments through a simple web interface.

## Features

* Add, update, and delete patient records
* Search patients by name
* Schedule doctor appointments
* View all appointments
* Delete appointments
* Simple responsive UI

## Tech Stack

Frontend:

* React
* Bootstrap

Backend:

* Python
* Flask
* Flask-CORS

Database:

* PostgreSQL

## Project Structure

```
clinic-management-system
│
├── backend
│   ├── clinic_app.py
│   ├── db.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── .gitignore
└── README.md
```

## How to Run the Project

### Backend

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python clinic_app.py
```

### Frontend

```
cd frontend
npm install
npm start
```

The application will run on:

* Frontend: http://localhost:3000
* Backend API: http://localhost:5000

## Future Improvements

* Doctor management
* Authentication (admin login)
* Appointment status tracking
* Dashboard analytics


## Author

Fathima Amrin Shaik
