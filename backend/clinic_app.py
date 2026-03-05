from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)


# -----------------------------
# HOME ROUTE
# -----------------------------
@app.route('/')
def home():
    try:
        conn = get_connection()
        conn.close()
        return "CLINIC DATABASE CONNECTION SUCCESSFUL"
    except Exception as e:
        return f"Database connection failed: {str(e)}"


# -----------------------------
# ADD PATIENT
# -----------------------------
@app.route('/add_patient', methods=['POST'])
def add_patient():
    try:
        data = request.get_json()

        name = data['name']
        age = data['age']
        gender = data.get('gender')
        phone = data.get('phone')

        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO patients (name, age, gender, phone)
            VALUES (%s, %s, %s, %s)
        """, (name, age, gender, phone))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Patient added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------
# GET ALL PATIENTS
# -----------------------------
@app.route('/patients')
def get_patients():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT id, name, age, gender, phone, created_at
            FROM patients
            ORDER BY id DESC
        """)

        rows = cur.fetchall()

        patients = []

        for row in rows:
            patients.append({
                "id": row[0],
                "name": row[1],
                "age": row[2],
                "gender": row[3],
                "phone": row[4],
                "created_at": str(row[5])
            })

        cur.close()
        conn.close()

        return jsonify(patients)

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------
# DELETE PATIENT
# -----------------------------
@app.route('/delete_patient/<int:id>', methods=['DELETE'])
def delete_patient(id):
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("DELETE FROM patients WHERE id = %s", (id,))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Patient deleted successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------
# UPDATE PATIENT
# -----------------------------
@app.route('/update_patient/<int:id>', methods=['PUT'])
def update_patient(id):
    try:
        data = request.get_json()

        name = data['name']
        age = data['age']
        phone = data['phone']

        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            UPDATE patients
            SET name = %s, age = %s, phone = %s
            WHERE id = %s
        """, (name, age, phone, id))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Patient updated successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------
# ADD APPOINTMENT
# -----------------------------
@app.route('/add_appointment', methods=['POST'])
def add_appointment():
    try:
        data = request.get_json()

        patient_id = data['patient_id']
        doctor_name = data['doctor_name']
        appointment_date = data['appointment_date']
        appointment_time = data['appointment_time']

        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO appointments
            (patient_id, doctor_name, appointment_date, appointment_time)
            VALUES (%s, %s, %s, %s)
        """, (patient_id, doctor_name, appointment_date, appointment_time))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Appointment added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------
# GET ALL APPOINTMENTS
# -----------------------------
@app.route('/appointments')
def get_appointments():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT
                appointments.id,
                appointments.patient_id,
                patients.name,
                appointments.doctor_name,
                appointments.appointment_date,
                appointments.appointment_time
            FROM appointments
            JOIN patients
            ON appointments.patient_id = patients.id
            ORDER BY appointments.id DESC
        """)

        rows = cur.fetchall()

        appointments = []

        for row in rows:
            appointments.append({
                "id": row[0],
                "patient_id": row[1],
                "patient_name": row[2],
                "doctor_name": row[3],
                "appointment_date": str(row[4]),
                "appointment_time": str(row[5])
            })

        cur.close()
        conn.close()

        return jsonify(appointments)

    except Exception as e:
        return jsonify({"error": str(e)})
@app.route('/delete_appointment/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("DELETE FROM appointments WHERE id = %s", (id,))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Appointment deleted"})

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == '__main__':
    print("RUNNING CLINIC APP")
    app.run(debug=True)