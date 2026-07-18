const express = require("express");
const router = express.Router();

const {
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    getDashboardStats
} = require("../controllers/adminController");

const { authenticate } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// Get all orders
router.get(
    "/orders",
    authenticate,
    isAdmin,
    getAllOrders
);

// Update order status
router.patch(
    "/orders/:id/status",
    authenticate,
    isAdmin,
    updateOrderStatus
);
router.get(
    "/users",
    authenticate,
    isAdmin,
    getAllUsers
);
router.get(
    "/dashboard",
    authenticate,
    isAdmin,
    getDashboardStats
);

module.exports = router;