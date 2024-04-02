const express = require("express");
const app = express();
require("dotenv").config();
const Middleware = require("../Middleware/doctorAuth");
const route = express.Router();
const patient = require("../controller/patients");
const appointment = require("../controller/appointment");
const doctor = require("../controller/doctor");
const message = require("../controller/message");
const { body } = require("express-validator");

// Dr. Login

route.post(
  "/Login",
  body("username").isEmail().withMessage("Enter a valid Email"),
  Middleware.doctorLogin,
  (req, res) => {
    res.status(200).send({ message: "Login Successful" });
  }
);
route.post(
  "/signup",
  body("experience_years")
    .isInt()
    .withMessage("enter a valid experience_years"),
  body("contact_number"),
    // .isMobilePhone()
    // .withMessage("enter a valid phone number"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("password").isStrongPassword().withMessage("enter a strong password"),
  doctor.createDoctor,
  (req, res) => {
    res.status(200).send("Error: Cannot create account");
  }
);

// Patient routes
route.get(
  "/patient/detail",
  body("id").isInt().withMessage("enter your valid patient id"),
  Middleware.authToken,
  patient.patient,
  (req, res) => {
    const id = req.body;
    res.status(200).send({
      message: "Patient details retrieved successfully",
      result: result,
    });
  }
);


route.delete(
  "/patient/delete",
  Middleware.authToken,
  patient.deletePt,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Patient deleted successfully"});
  }
);

route.get(
  "/patient/all",
  Middleware.authToken,
  patient.getAllPt,
  (req, res) => {
    res
      .status(200)
      .send({ message: "All patients retrieved successfully"});
  }
);

route.post(
  "/patient/search",
  Middleware.authToken,
  patient.searchPt,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Patient search successful"});
  }
);

// Doctor routes
route.get("/all", Middleware.authToken, doctor.getAlldr, (req, res) => {
  res
    .status(200)
    .send({ message: "All doctors retrieved successfully"});
});


// Appointment routes
route.post(
  "/appointment/create",
  Middleware.authToken,
  body("patient_id").isInt().withMessage("enter your valid patient id"),
  body("doctor_id").isInt().withMessage("enter a valid doctor id"),
  body("appointment_date").isDate().withMessage("enter a valid date"),
  appointment.createAp,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Appointment created successfully"});
  }
);

route.delete(
  "/appointment/delete",
  Middleware.authToken,
  appointment.deleteAp,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Appointment deleted successfully"});
  }
);

route.get(
  "/appointment/all",
  Middleware.authToken,
  appointment.getAllAp,
  (req, res) => {
    res
      .status(200)
      .send({
        message: "All appointments retrieved successfully",
        result: result,
      });
  }
);

route.get(
  "/appointment/id",
  Middleware.authToken,
  body("appointment_id").isInt().withMessage("enter a valid id"),
  appointment.appointment,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Appointment retrieved successfully"});
  }
);

// Message routes
route.post(
  "/message/create",
  body("age").isInt().withMessage("enter a valid age"),
  Middleware.authToken,
  message.createMsg,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Message created successfully"});
  }
);

route.delete(
  "/message/delete",
  Middleware.authToken,
  message.deleteMsg,
  (req, res) => {
    res
      .status(200)
      .send({ message: "Message deleted successfully"});
  }
);

route.get(
  "/message/Id",
  body("id").isInt().withMessage("enter your valid id"),
  Middleware.authToken,
  message.msg,
  (req, res) => {
    res
      .status(200)
      .send({ message: req.msg });
  }
);

route.get(
  "/message/all",
  Middleware.authToken,
  message.getAllMsg,
  (req, res) => {
    res
      .status(200)
      .send({ message: req.msg});
  }
);

module.exports = route;
