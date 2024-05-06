const jwt = require("jsonwebtoken");
const userValid = require("../model/admin");
const express = require("express");
const { validationResult } = require("express-validator");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send({ error: "Unauthorized" });
  jwt.verify(token, process.env.ADMIN_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: "Forbidden" });
    req.user = user; // Attach patient data to request object
    
    next();
  });
};
// Admin login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send(errors.array()[0].msg);
      return errors;
    }
    // Validate admin credentials
    const validAdmin = await userValid.searchAdmin(username, password);
    if (validAdmin.length === 0) {
      throw new Error("Invalid credentials");
    }
    // Generate JWT token for authentication
    const token = jwt.sign(
      { username: validAdmin[0].first_name },
      process.env.ADMIN_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).send({ message: "Valid Admin", token, username, password});
  } catch (err) {
    console.error("Error:", err.message);
    res.status(401).send({ error: err.message });
  }
};

module.exports = {
  authToken,
  adminLogin,
};
