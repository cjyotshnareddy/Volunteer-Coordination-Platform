const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    console.log("👉 Received password from frontend:", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed password:", hashedPassword);
    console.log("🔐 Hashed password:", hashedPassword);

    const newUser=await User.create({
      name,
      email,
      password,
      role,
    });
    // await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (err) {
    console.error(' Signup error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// Login
// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email);

    const user = await User.findOne({ email });
   
    if (!user){
       console.log("❌ User not found for email:", email);
       return res.status(400).json({ msg: 'Invalid credentials' });

  }
    const isMatch = await bcrypt.compare(password, user.password);
   console.log("🔐 Password match:", isMatch);
   console.log("original password",password)
  console.log("pass",user.password)

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    console.log("Login error", err)
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
