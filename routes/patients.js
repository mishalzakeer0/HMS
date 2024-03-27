const express = require('express');
const app = express();
require('dotenv').config();
const Middleware = require('../Middleware/patientAuth');
const route = express.Router();
const patient = require('../controller/patients');
const doctor = require('../controller/doctor');
const appointment = require('../controller/appointment');
const message = require('../controller/message');

route.post('/patient/Login', Middleware.patientLogin, (req, res) => {
    res.status(200).send("Login Successful");
});

route.get('/detail', Middleware.authToken, patient.patient, (req, res) => {
    const id = req.body;
    res.status(200).send("Error: Cannot get patient details");
});

route.get('/doctor/all', Middleware.authToken, doctor.getAlldr, (req, res) => {
    res.status(200).send("Error: Cannot get all doctors");
});

route.get('/appointment/create', Middleware.authToken, appointment.createAp, (req, res) => {
    res.status(200).send("Error: Cannot create appointment");
});

route.get('/message/create', Middleware.authToken, message.createMsg, (req, res) => {
    res.status(200).send("Error: Cannot create message");
});

module.exports = route