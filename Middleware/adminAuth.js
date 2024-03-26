const jwt = require("jsonwebtoken");
const userValid = require("../model/patients");
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).send({ error: "Unauthorized" });
    jwt.verify(token, process.env.USER_KEY, (err, user) => {
      if (err) return res.status(403).send({ error: "Forbidden" });
      req.user = user; // Attach patient data to request object
      next();
    });
  };
// Admin login
const adminLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Validate admin credentials
      const validAdmin = await userValid.searchPt("username", username, "password", password);
      if (validAdmin.length === 0) {
        throw new Error("Invalid credentials");
      }
      // Generate JWT token for authentication
      const token = jwt.sign({ username: validAdmin[0].first_name }, process.env.ADMIN_KEY, { expiresIn: "5m" });
      res.status(200).send({ message: "Valid Admin", token });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(401).send({ error: err.message });
    }
  };

  module.exports = {
    authToken,
    adminLogin
  }