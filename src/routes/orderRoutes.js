const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");

const { createOrder,
    getMyOrders
 } = require("../controllers/orderController");

router.post("/", authenticate, createOrder);
router.post("/", authenticate, getMyOrders);


module.exports = router;