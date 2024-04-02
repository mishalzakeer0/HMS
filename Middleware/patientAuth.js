const jwt = require("jsonwebtoken");
const userValid = require("../model/patients");
const express = require("express");
const app = express();
const { body, validationResult } = require('express-validator');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to verify JWT token
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ error: "Unauthorized" });
  jwt.verify(token, process.env.USER_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: "Forbidden" });
    req.user = user; // Attach patient data to request object
    console.log('user',req.user);
    next();
  });
};
// Patient login
const patientLogin = async (req, res, next) => {
  try {
    // console.log("req body", req.body);
    const { username, password } = req.body;
    // Validate patient credentials
    const validUser = await userValid.searchPt(
      "email",
      username,
      "password",
      password
    );
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).send(errors.array()[0].msg)   
    }
    console.log(validUser)
    if (validUser.length === 0) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token for authentication
    const token = jwt.sign(
      { username: validUser[0].first_name },
      process.env.USER_KEY,
      { expiresIn: "1d" }
    );
    const [{id}] = validUser 
      

    next();
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).send({ error: err.message });
  }
};

module.exports = {
  authToken,
  patientLogin,
};
