const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: "Authentication successful!", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ id: decoded.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Token verified successfully", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    const newUser = new User({ ...req.body, id: Date.now().toString() });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
