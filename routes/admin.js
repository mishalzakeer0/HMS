const express = require("express");
const app = express();
require("dotenv").config();
const Middleware = require("../Middleware/adminAuth");
const route = express.Router();
const patient = require("../controller/patients");
const admin = require("../controller/admin");
const appointment = require("../controller/appointment");
const doctor = require("../controller/doctor");
const message = require("../controller/message");
const { body, validationResult } = require("express-validator");

// login
route.post(
  "/Login",
  body("username").isEmail().withMessage("Enter a valid Email"),
  Middleware.adminLogin,
  (req, res) => {
    res.status(200).send("Login Successful");
  }
);

// patient route
route.get(
  "/patient/detail",
  body("id").isInt().withMessage("enter your valid patient id"),
  Middleware.authToken,
  patient.patient,
  (req, res) => {
    const id = req.body;
    res.status(200).send({message: req.msg});
  }
);

route.post(
  "/patient/create",
  body("age").isInt().withMessage("enter a valid age"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("phone"),//.isMobilePhone().withMessage("enter a valid phone number"),
  body("postal_code"),//.isPostalCode().withMessage("enter a valid postal code"),
  body("registration_date").isDate().withMessage("enter a valid date"),
  body("password").isStrongPassword().withMessage("enter a strong password"),
  Middleware.authToken,
  patient.createPt,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.delete(
  "/patient/delete",
  Middleware.authToken,
  patient.deletePt,
  (req, res) => {
    res.status(200).send("Error: Cannot delete patient");
  }
);

route.get(
  "/patient/all",
  Middleware.authToken,
  patient.getAllPt,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.get(
  "/patient/search",
  Middleware.authToken,
  patient.searchPt,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

// doctor route
route.post(
  "/doctor/create",
  body("experience_years")
    .isInt()
    .withMessage("enter a valid experience_years"),
  body("contact_number"),
    // .isMobilePhone()
    // .withMessage("enter a valid phone number"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("password").isStrongPassword().withMessage("enter a strong password"),
  Middleware.authToken,
  doctor.createDoctor,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);
route.delete(
  "/doctor/delete",
  Middleware.authToken,
  doctor.deleteDoctor,
  (req, res) => {
    res.status(200).send({message: "doctor deleted"});
  }
);

route.get(
  "/doctor/DrById",
  body("doctor_id").isInt().withMessage("enter your valid doctor id"),
  Middleware.authToken,
  doctor.doctor,
  (req, res) => {
    res.status(200).send({message:req.msg});
  }
);

route.get("/doctor/all", doctor.getAlldr, (req, res) => {
  res.status(200).send({message: req.msg});
});



// appointment route
route.post(
  "/appointment/create",
  body("patient_id").isInt().withMessage("enter your valid patient id"),
  body("doctor_id").isInt().withMessage("enter a valid doctor id"),
  body("appointment_date").isDate().withMessage("enter a valid date"),
  Middleware.authToken,
  appointment.createAp,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.delete(
  "/appointment/delete",
  Middleware.authToken,
  appointment.deleteAp,
  (req, res) => {
    res.status(200).send({message: "successfully deleted"});
  }
);

route.get(
  "/appointment/all",
  Middleware.authToken,
  appointment.getAllAp,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.get(
  "/appointment/id",
  body("appointment_id").isInt().withMessage("enter your valid appointment id"),
  Middleware.authToken,
  appointment.appointment,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

// admin route
route.post(
  "/create",
  body("email").isEmail().withMessage("Enter a valid Email"),
  body("password").isStrongPassword().withMessage("enter a strong password"),
  Middleware.authToken,
  admin.createAd,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.delete("/delete", Middleware.authToken, admin.deleteAd, (req, res) => {
  res.status(200).send({message: req.msg});
});

route.get(
  "/Id",
  body("id").isInt().withMessage("enter your valid id"),
  Middleware.authToken,
  admin.admin,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

// message route
route.post(
  "/message/create",
  body("age").isInt().withMessage("enter a valid age"),
  Middleware.authToken,
  message.createMsg,
  (req, res) => {
    res.status(200).send({message: `message created`});
  }
);

route.delete(
  "/message/delete",
  Middleware.authToken,
  message.deleteMsg,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.get(
  "/message/Id",
  body("id").isInt().withMessage("enter your valid id"),
  Middleware.authToken,
  message.msg,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

route.get(
  "/message/all",
  Middleware.authToken,
  message.getAllMsg,
  (req, res) => {
    res.status(200).send({message: req.msg});
  }
);

module.exports = route;
