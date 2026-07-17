const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");

const { createOrder,
    getMyOrders,
    getOrderById
 } = require("../controllers/orderController");

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getMyOrders);
router.get("/:id", authenticate, getOrderById);


module.exports = router;