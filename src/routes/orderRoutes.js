const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");

const { createOrder,
    getMyOrders,
    getOrderById,
    updateOrder,
    cancelOrder
 } = require("../controllers/orderController");

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getMyOrders);
router.get("/:id", authenticate, getOrderById);
router.put("/:id", authenticate, updateOrder);
router.patch("/:id/cancel", authenticate, cancelOrder);


module.exports = router;