const Order = require("../models/Order");
const User = require("../models/User");
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("customer", "name email phone")
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
const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);

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
            message: "Order status updated successfully.",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getDashboardStats = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalOrders = await Order.countDocuments();

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

        const pickupScheduled = await Order.countDocuments({
            status: "Pickup Scheduled"
        });

        const pickedUp = await Order.countDocuments({
            status: "Picked Up"
        });

        const washing = await Order.countDocuments({
            status: "Washing"
        });

        const outForDelivery = await Order.countDocuments({
            status: "Out for Delivery"
        });

        const delivered = await Order.countDocuments({
            status: "Delivered"
        });

        const cancelled = await Order.countDocuments({
            status: "Cancelled"
        });

        const revenue = await Order.aggregate([
            {
                $match: {
                    status: "Delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalPrice"
                    }
                }
            }
        ]);

        const totalRevenue =
            revenue.length > 0 ? revenue[0].totalRevenue : 0;

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalOrders,
                pendingOrders,
                pickupScheduled,
                pickedUp,
                washing,
                outForDelivery,
                delivered,
                cancelled,
                totalRevenue
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const assignProvider = async (req, res) => {
    try {

        const { id } = req.params;
        const { providerId } = req.body;

        const provider = await User.findById(providerId);

        if (!provider || provider.role !== "provider") {
            return res.status(404).json({
                success: false,
                message: "Provider not found."
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        order.provider = providerId;
        order.status = "Pickup Scheduled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Provider assigned successfully.",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    getAllOrders,
    updateOrderStatus,
    getAllUsers,
    getDashboardStats,
    assignProvider
};