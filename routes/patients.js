const express = require("express");
const app = express();
require("dotenv").config();
const Middleware = require("../Middleware/patientAuth");
const route = express.Router();
const patient = require("../controller/patients");
const doctor = require("../controller/doctor");
const appointment = require("../controller/appointment");
const message = require("../controller/message");
const { body, validationResult } = require("express-validator");

route.post(
  "/Login",
  body("username").isEmail().withMessage("enter a valid email"),
  Middleware.patientLogin,
  (req, res) => {
    res.status(200).send("Login Successful");
  }
);

route.post(
  "/signup",
  body("age").isInt().withMessage("enter a valid age"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("phone"),//.isMobilePhone().withMessage("enter a valid phone number"),
  body("postal_code"),//.isPostalCode().withMessage("enter a valid postal code"),
  body("registration_date").isDate().withMessage("enter a valid date"),
  body("password").isStrongPassword().withMessage("enter a strong password"),
  patient.createPt,
  (req, res) => {
    res.status(200).send("Error: Cannot create account");
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
  body("patient_id").isInt().withMessage("enter your valid patient id"),
  body("doctor_id").isInt().withMessage("enter a valid doctor id"),
  body("appointment_date").isDate().withMessage("enter a valid date"),
  Middleware.authToken,
  appointment.createAp,
  (req, res) => {
    res.status(200).send("Error: Cannot create appointment");
  }
);

route.post(
  "/message/create",
  body("age").isInt().withMessage("enter a valid age"),
  Middleware.authToken,
  message.createMsg,
  (req, res) => {
    res.status(200).send("Error: Cannot create message");
  }
);

module.exports = route;
