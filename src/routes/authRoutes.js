const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

const { register,
    login,
    profile
 } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate,profile);

module.exports = router;