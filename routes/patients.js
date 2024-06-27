const express = require("express");
const app = express();
require("dotenv").config();
const Middleware = require("../Middleware/patientAuth");
const route = express.Router();
const patient = require("../controller/patients");
const doctor = require("../controller/doctor");
const appointment = require("../controller/appointment");
const message = require("../controller/message");
const { body, validationResult, Result } = require("express-validator");

route.post(
  "/Login",
  body("username"),
  Middleware.patientLogin,
);

route.post(
  "/signup",
  body("age").isInt().withMessage("enter a valid age"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("phone"),
  body("postal_code"),
  body("registration_date").isDate().withMessage("enter a valid date"),
  body("password").isStrongPassword().withMessage("enter a strong password"),
  patient.createPt,
  (req, res) => {
    res.status(200).send("Account created succesfully");
  }
);

route.get(
  "/detail",
  body("id").isInt().withMessage("enter your valid patient id"),
  Middleware.authToken,
  patient.patient,
  (req, res) => {
    const id = req.body;
    res.status(200).send("Error: Cannot get patient details");
  }
);

route.get("/doctor/all", Middleware.authToken, doctor.getAlldr, (req, res) => {
  res.status(200).send("Error: Cannot get all doctors");
});

route.post(
  "/appointment/create",
  // body("patient_id").isInt().withMessage("enter your valid patient id"),
  // body("doctor_id").isInt().withMessage("enter a valid doctor id"),
  // body("appointment_date").isDate().withMessage("enter a valid date"),
  Middleware.authToken,
  appointment.createAp,
  (req, res) => {
    res.status(200).send(" appointment Created successfully");
  }
);

route.post(
  "/message/create",
  // body("age").isInt().withMessage("enter a valid age"),
  Middleware.authToken,
  message.createMsg,
  (req, res) => {
    res.status(200).send(" Message created succefully");
  }
);
route.get(
  "/forgotPassword",
  patient.forgotPassword,
  (req, res) => {
    res.status(200).send(req.msg);
  }
);
route.post('/resetPassword/:token', patient.resetPassword);

module.exports = route;
