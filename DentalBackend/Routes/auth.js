const express = require("express");
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});


//Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User already exists" });


    const hashedPass = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      password: hashedPass
    });

 
    const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


  res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 86400000
});


    res.json({ msg: "Signup successful", user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // user check
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // password compare
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    // JWT
   const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
sameSite: "lax",

      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ msg: "Login successful", user });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});




//logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,   // SAME as login/signup
    sameSite: "lax", // SAME as login/signup
  });
  res.json({ msg: "Logged out successfully" });
});



//admin
router.get("/create-admin", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPass,
      role: "admin"
    });

    res.json({ msg: "Admin created", admin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating admin" });
  }
});
module.exports=router;