const express = require('express');
const app = express();
require('dotenv').config();
const Middleware = require('../Middleware/doctorAuth');
const route = express.Router();
const patient = require('../controller/patients');
const appointment = require('../controller/appointment');
const doctor = require('../controller/doctor');
const message = require('../controller/message');

// Dr. Login
route.post('/doctor/Login', Middleware.doctorLogin,(req, res) => {
  res.status(200).send({ message: 'Login Successful' });
});

// Patient routes
route.get('/doctor/patient/detail', Middleware.authToken, patient.patient, (req, res) => {
  const id = req.body;
  res.status(200).send({ message: 'Patient details retrieved successfully', result: result });
});

route.get('/doctor/patient/create', Middleware.authToken, patient.createPt, (req, res) => {
  res.status(200).send({ message: 'Patient created successfully', result: result });
});

route.get('/doctor/patient/delete', Middleware.authToken, patient.deletePt, (req, res) => {
  res.status(200).send({ message: 'Patient deleted successfully', result: result });
});

route.get('/doctor/patient/all', Middleware.authToken, patient.getAllPt, (req, res) => {
  res.status(200).send({ message: 'All patients retrieved successfully', result: result });
});

route.get('/doctor/patient/search', Middleware.authToken, patient.searchPt, (req, res) => {
  res.status(200).send({ message: 'Patient search successful', result: result });
});

// Doctor routes
route.get('/doctor/all', Middleware.authToken, doctor.getAlldr, (req, res) => {
  res.status(200).send({ message: 'All doctors retrieved successfully', result: result });
});

route.get('/doctor/search', Middleware.authToken, doctor.searchDoctor, (req, res) => {
  res.status(200).send({ message: 'Doctor search successful', result: result });
});

// Appointment routes
route.get('/doctor/appointment/create', Middleware.authToken, appointment.createAp, (req, res) => {
  res.status(200).send({ message: 'Appointment created successfully', result: result });
});

route.get('/doctor/appointment/delete', Middleware.authToken, appointment.deleteAp, (req, res) => {
  res.status(200).send({ message: 'Appointment deleted successfully', result: result });
});

route.get('/doctor/appointment/all', Middleware.authToken, appointment.getAllAp, (req, res) => {
  res.status(200).send({ message: 'All appointments retrieved successfully', result: result });
});

route.get('/doctor/appointment/id', Middleware.authToken, appointment.appointment, (req, res) => {
  res.status(200).send({ message: 'Appointment retrieved successfully', result: result });
});

// Message routes
route.get('/doctor/message/create', Middleware.authToken, message.createMsg, (req, res) => {
  res.status(200).send({ message: 'Message created successfully', result: result });
});

route.get('/doctor/message/delete', Middleware.authToken, message.deleteMsg, (req, res) => {
  res.status(200).send({ message: 'Message deleted successfully', result: result });
});

route.get('/doctor/message/Id', Middleware.authToken, message.msg, (req, res) => {
  res.status(200).send({ message: 'Message retrieved successfully', result: result });
});

route.get('/doctor/message/all', Middleware.authToken, message.getAllMsg, (req, res) => {
  res.status(200).send({ message: 'All messages retrieved successfully', result: result });
});

module.exports = route
