const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserProfile = require('../models/UserProfile');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { firstName, lastName, userEmail, userPassword } = req.body;
console.log("atempt to create a user!")
  try {
    let user = await UserProfile.findOne({ userEmail });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new UserProfile({
      firstName,
      lastName,
      userEmail,
      userPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log("atempt to login!")
  try {
    let user = await UserProfile.findOne({ userEmail });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// router.post('/login', async (req, res) => {
//   console.log("atempt to login!<<<<<<<<<<<<<<<<<<")
// });
module.exports = router;
