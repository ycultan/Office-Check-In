const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getPatientsList = () => {
  const patients = () =>
    fs.readFileSync(__dirname + "/patients.json", { encoding: "utf8" });
    const patientsList = JSON.parse(patients() || '[]');
    return patientsList
}

// Create a new patient
app.post("/patients", (req, res) => {
  const patientsList = getPatientsList()
  const json = JSON.stringify([...patientsList, req.body], null, 2)
  fs.writeFile("patients.json", json, "utf8", (err) => {
    if (err) return console.error(err);
    res.json(req.body);
  });
});

// Get full list of patients
app.get("/patients", (req, res) => {
  const patientsList = getPatientsList()
  res.json(patientsList);
});

// Get a single patient
app.get("/patients/:email", (req, res) => {
  const email = req.params.email;
  const patientsList = getPatientsList()
  res.json(patientsList.find((patient) => patient.email === email));
});

// Delete patient from list
app.delete("/patients/:email", (req, res) => {
  const emailParams = req.params.email;
  const patientsList = getPatientsList()
  patientsList.splice(
    patientsList.findIndex(({ email }) => email === emailParams),
    1
  );
  const json = JSON.stringify(patientsList, null, 2)
  fs.writeFile("patients.json", json, "utf8", (err) => {
    if (err) return console.error(err);
    res.json({});
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}. Check me out!`));
