const Order = require("../models/Order");

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
module.exports = {
    getAllOrders
};