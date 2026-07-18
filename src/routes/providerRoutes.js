const express = require("express");

const router = express.Router();

const {
    getAssignedOrders,
    updateAssignedOrderStatus,
    providerDashboard
} = require("../controllers/providerController");

const { authenticate } = require("../middleware/authMiddleware");

const isProvider = require("../middleware/providerMiddleware");

router.get(
    "/orders",
    authenticate,
    isProvider,
    getAssignedOrders
);

router.patch(
    "/orders/:id/status",
    authenticate,
    isProvider,
    updateAssignedOrderStatus
);

router.get(
    "/dashboard",
    authenticate,
    isProvider,
    providerDashboard
);

module.exports = router;