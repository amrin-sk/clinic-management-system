import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";

function App() {

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [appointmentPatientId, setAppointmentPatientId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [activePage, setActivePage] = useState("patients");
  const totalPatients = patients.length;

const totalAppointments = appointments.length;

const today = new Date().toISOString().split("T")[0];

const appointmentsToday = appointments.filter(
  a => a.appointment_date === today
).length;

  const loadPatients = () => {
    fetch("http://localhost:5000/patients")
      .then(res => res.json())
      .then(data => setPatients(data));
  };

  const loadAppointments = () => {
    fetch("http://localhost:5000/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data));
  };
const deleteAppointment = (id) => {

  fetch(`http://localhost:5000/delete_appointment/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => loadAppointments());

};
  useEffect(() => {
    loadPatients();
    loadAppointments();
  }, []);

  const addPatient = () => {

    if (!name || !age || !phone) {
      alert("Fill all patient fields");
      return;
    }

    fetch("http://localhost:5000/add_patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        age,
        gender: "Female",
        phone
      })
    })
      .then(res => res.json())
      .then(() => {
        loadPatients();
        setName("");
        setAge("");
        setPhone("");
      });
  };

  const deletePatient = (id) => {
    fetch(`http://localhost:5000/delete_patient/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => loadPatients());
  };

  const updatePatientField = (id, field, value) => {

    setPatients(prev =>
      prev.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const savePatient = (id) => {

    const patient = patients.find(p => p.id === id);

    fetch(`http://localhost:5000/update_patient/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: patient.name,
        age: patient.age,
        phone: patient.phone
      })
    })
      .then(res => res.json())
      .then(() => loadPatients());
  };

  const addAppointment = () => {

    if (!appointmentPatientId || !doctorName || !appointmentDate || !appointmentTime) {
      alert("Fill all appointment fields");
      return;
    }

    fetch("http://localhost:5000/add_appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patient_id: appointmentPatientId,
        doctor_name: doctorName,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime
      })
    })
      .then(res => res.json())
      .then(() => {
        loadAppointments();
        setAppointmentPatientId("");
        setDoctorName("");
        setAppointmentDate("");
        setAppointmentTime("");
      });
  };

  return (

    <div>

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand">Clinic Management System</span>

          <div>
            <button
              className="btn btn-light me-2"
              onClick={() => setActivePage("patients")}
            >
              Patients
            </button>

            <button
              className="btn btn-light"
              onClick={() => setActivePage("appointments")}
            >
              Appointments
            </button>
          </div>
        </div>
      </nav>
<div className="container mt-3">

  <div className="row">

    <div className="col-md-4">
      <div className="card text-center bg-light">
        <div className="card-body">
          <h6>Total Patients</h6>
          <h3>{totalPatients}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card text-center bg-light">
        <div className="card-body">
          <h6>Total Appointments</h6>
          <h3>{totalAppointments}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card text-center bg-light">
        <div className="card-body">
          <h6>Appointments Today</h6>
          <h3>{appointmentsToday}</h3>
        </div>
      </div>
    </div>

  </div>

</div>
      {/* PATIENTS PAGE */}
      {activePage === "patients" && (

        <div className="container mt-4">

          <div className="card mb-4">
            <div className="card-body">

              <h5>Add Patient</h5>

              <div className="row g-2">

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <button
                    className="btn btn-primary w-100"
                    onClick={addPatient}
                  >
                    <FaUserPlus /> Add
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Patient Table */}
          <div className="card">
            <div className="card-body">

              <h5>Patient List</h5>
             <input
  type="text"
  className="form-control mb-3"
  placeholder="Search patient by name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {patients
  .filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map(patient => (

                    <tr key={patient.id}>

                      <td>{patient.id}</td>

                      <td>
                        <input
                          className="form-control"
                          value={patient.name}
                          onChange={e =>
                            updatePatientField(patient.id, "name", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          className="form-control"
                          value={patient.age}
                          onChange={e =>
                            updatePatientField(patient.id, "age", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          className="form-control"
                          value={patient.phone}
                          onChange={e =>
                            updatePatientField(patient.id, "phone", e.target.value)
                          }
                        />
                      </td>

                      <td>

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => savePatient(patient.id)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deletePatient(patient.id)}
                        >
                          <FaTrash />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          </div>

        </div>
      )}

      {/* APPOINTMENTS PAGE */}
      {activePage === "appointments" && (

        <div className="container mt-4">

          <div className="card mb-4">
            <div className="card-body">

              <h5>Add Appointment</h5>

              <div className="row g-2">

                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={appointmentPatientId}
                    onChange={e => setAppointmentPatientId(e.target.value)}
                  >
                    <option value="">Select Patient</option>

                    {patients.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}

                  </select>
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Doctor Name"
                    value={doctorName}
                    onChange={e => setDoctorName(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    value={appointmentDate}
                    onChange={e => setAppointmentDate(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="time"
                    className="form-control"
                    value={appointmentTime}
                    onChange={e => setAppointmentTime(e.target.value)}
                  />
                </div>

                <div className="col-md-1">
                  <button
                    className="btn btn-success w-100"
                    onClick={addAppointment}
                  >
                    Add
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Appointment Table */}
          <div className="card">
            <div className="card-body">

              <h5>Appointments List</h5>

<table className="table table-bordered">

  <thead>
    <tr>
      <th>ID</th>
      <th>Patient</th>
      <th>Doctor</th>
      <th>Date</th>
      <th>Time</th>
      <th>Actions</th>
    </tr>
  </thead>

                <tbody>

  {appointments.map(a => (

    <tr key={a.id}>
      <td>{a.id}</td>
      <td>{a.patient_name}</td>
      <td>{a.doctor_name}</td>
      <td>{a.appointment_date}</td>
      <td>{a.appointment_time}</td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteAppointment(a.id)}
        >
          <FaTrash />
        </button>
      </td>

    </tr>

  ))}

</tbody>


              </table>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;