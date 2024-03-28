const jwt = require("jsonwebtoken");
const userValid = require("../model/doctor");
const express = require("express");
const { validationResult } = require("express-validator");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to verify JWT token
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ error: "Unauthorized" });
  jwt.verify(token, process.env.USER_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: "Forbidden" });
    req.user = user; // Attach user data to request object
    next();
  });
};
// Doctor login 
const doctorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(401).send(errors.array()[0].msg)
      
    }
    // Validate patient credentials
    const validUser = await userValid.searchDr("email", username, "password", password);

    if (validUser.length === 0) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token for authentication
    const token = jwt.sign({ username: validUser[0].username }, process.env.USER_KEY, { expiresIn: "25m" });
    res.status(200).send({ message: "Valid Patient", token });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).send({ error: err.message });
  }
};

module.exports = {
    doctorLogin,
    authToken
}