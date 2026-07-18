const express = require("express");
const router = express.Router();

const {
    makePayment,
    paymentHistory,
    allPayments
} = require("../controllers/paymentController");

const { authenticate } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

// Customer Payment
router.post(
    "/pay/:orderId",
    authenticate,
    makePayment
);

// Customer Payment History
router.get(
    "/history",
    authenticate,
    paymentHistory
);

// Admin Payment History
router.get(
    "/all",
    authenticate,
    isAdmin,
    allPayments
);

module.exports = router;