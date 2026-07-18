const express = require("express");
const router = express.Router();

const {
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    getDashboardStats,
    assignProvider
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

// Assign provider to an order
router.patch(
    "/orders/:id/assign",
    authenticate,
    isAdmin,
    assignProvider
);

// Get all users
router.get(
    "/users",
    authenticate,
    isAdmin,
    getAllUsers
);

// Dashboard statistics
router.get(
    "/dashboard",
    authenticate,
    isAdmin,
    getDashboardStats
);

module.exports = router;