const Order = require("../models/Order");

const getAssignedOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            provider: req.user.id
        })
        .populate("customer", "name phone email")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateAssignedOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findOne({
            _id: id,
            provider: req.user.id
        });

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found."
            });

        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated successfully.",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const providerDashboard = async (req, res) => {

    try {

        const assignedOrders = await Order.countDocuments({
            provider: req.user.id
        });

        const pendingDeliveries = await Order.countDocuments({
            provider: req.user.id,
            status: {
                $ne: "Delivered"
            }
        });

        const deliveredOrders = await Order.countDocuments({
            provider: req.user.id,
            status: "Delivered"
        });

        res.status(200).json({
            success: true,
            dashboard: {
                assignedOrders,
                pendingDeliveries,
                deliveredOrders
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getAssignedOrders,
    updateAssignedOrderStatus,
    providerDashboard
};