const express = require("express");
const router = express.Router();

const { getAllOrders } = require("../controllers/adminController");
const {authenticate} = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get(
    "/orders",
    authenticate,
    isAdmin,
    getAllOrders
);
module.exports = router;