const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require("../db/conn");
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const Authenticate = require("../middleware/Authenticate");

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all required fields." });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ error: "password and confirm password combination mismatch" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "user registered successfully..." });
    }
  } catch (err) {
    console.log(err);
  }
});

//  Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill input fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials..." });
      } else {
        res.json({ message: "User Signin Successfully..." });
      }
    } else {
      res.status(400).json({ message: "Invalid credentials..." });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

//get contact page data
router.get("/getData", Authenticate, (req, res) => {
  res.send(req.rootUser);
});
router.post("/contact", Authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log(`Error in Contact form`);
      return res.json({ error: "Plzz fill the contact form " });
    }
    const userContact = await User.findOne({ _id: req.userId });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User contact successfully..." });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/logout", (req, res) => {
  console.log("User Logout Successfully...");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(`User Logout`);
});
module.exports = router;
