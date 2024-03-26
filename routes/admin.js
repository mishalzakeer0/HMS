const express = require('express');
const app = express();
require('dotenv').config();
const Middleware = require('../Middleware/adminAuth');
const route = express.Router();
const patient = require('../controller/patients');
const admin = require('../controller/admin');
const appointment = require('../controller/appointment');
const doctor = require('../controller/doctor');
const message = require('../controller/message');

// login & signUp
route.post('/Login', Middleware.adminLogin, (req, res) => {
    res.status(200).send("Login Successful");
});

route.post('/signUp', Middleware.authToken, admin.createAd, (req, res) => {
    res.status(200).send("SignUp Completed");
});

// patient route
route.get('/patient/detail', Middleware.authToken, patient.patient, (req, res) => {
    res.status(200).send("Error: Cannot get patient details");
});

route.get('/patient/create', Middleware.authToken, patient.createPt, (req, res) => {
    res.status(200).send("Error: Cannot create patient");
});

route.get('/patient/delete', Middleware.authToken, patient.deletePt, (req, res) => {
    res.status(200).send("Error: Cannot delete patient");
});

route.get('/patient/all', Middleware.authToken, patient.getAllPt, (req, res) => {
    res.status(200).send("Error: Cannot get all patients");
});

route.get('/patient/search', Middleware.authToken, patient.searchPt, (req, res) => {
    res.status(200).send("Error: Cannot search for patients");
});

// doctor route
route.get('/doctor/create', Middleware.authToken, doctor.createDoctor, (req, res) => {
    res.status(200).send("Error: Cannot create doctor");
});

route.get('/doctor/delete', Middleware.authToken, doctor.deleteDoctor, (req, res) => {
    res.status(200).send("Error: Cannot delete doctor");
});

route.get('/doctor/DrById', Middleware.authToken, doctor.doctor, (req, res) => {
    res.status(200).send("Error: Cannot get doctor by ID");
});

route.get('/doctor/all', Middleware.authToken, doctor.getAlldr, (req, res) => {
    res.status(200).send("Error: Cannot get all doctors");
});

route.get('/doctor/search', Middleware.authToken, doctor.searchDoctor, (req, res) => {
    res.status(200).send("Error: Cannot search for doctors");
});

// appointment route
route.get('/appointment/create', Middleware.authToken, appointment.createAp, (req, res) => {
    res.status(200).send("Error: Cannot create appointment");
});

route.get('/appointment/delete', Middleware.authToken, appointment.deleteAp, (req, res) => {
    res.status(200).send("Error: Cannot delete appointment");
});

route.get('/appointment/all', Middleware.authToken, appointment.getAllAp, (req, res) => {
    res.status(200).send("Error: Cannot get all appointments");
});

route.get('/appointment/id', Middleware.authToken, appointment.appointment, (req, res) => {
    res.status(200).send("Error: Cannot get appointment by ID");
});

// admin route
route.get('/admin/create', Middleware.authToken, admin.createAd, (req, res) => {
    res.status(200).send("Error: Cannot create admin");
});

route.get('/admin/delete', Middleware.authToken, admin.deleteAd, (req, res) => {
    res.status(200).send("Error: Cannot delete admin");
});

route.get('/admin/Id', Middleware.authToken, admin.admin, (req, res) => {
    res.status(200).send("Error: Cannot get admin by ID");
});

// message route
route.get('/message/create', Middleware.authToken, message.createMsg, (req, res) => {
    res.status(200).send("Error: Cannot create message");
});

route.get('/message/delete', Middleware.authToken, message.deleteMsg, (req, res) => {
    res.status(200).send("Error: Cannot delete message");
});

route.get('/message/Id', Middleware.authToken, message.msg, (req, res) => {
    res.status(200).send("Error: Cannot get message by ID");
});

route.get('/message/all', Middleware.authToken, message.getAllMsg, (req, res) => {
    res.status(200).send("Error: Cannot get all messages");
});

module.exports = route;
