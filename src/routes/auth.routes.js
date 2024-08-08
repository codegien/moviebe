const express = require("express");
const router = express.Router();

const {
	registerValidation,
	loginValidation,
} = require("../middleware/authvalidation.middleware");

const { register, login } = require("../controller/auth.controller");

// Register route with register validation
// router.post("/register", registerValidation, register);
router.post("/register", register);
// Login route with login validation
router.post("/login", login);

module.exports = router;
