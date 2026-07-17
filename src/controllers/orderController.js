const Order = require("../models/Order");

const createOrder = async (req, res) => {
    try {

        const {
            pickupAddress,
            pickupDate,
            pickupTime,
            laundryType,
            weight,
            specialInstructions
        } = req.body;

        const order = await Order.create({
            customer: req.user.id,
            pickupAddress,
            pickupDate,
            pickupTime,
            laundryType,
            weight,
            specialInstructions
        });

        res.status(201).json({
            success: true,
            message: "Pickup Request Created Successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            customer: req.user.id
        }).sort({
            createdAt: -1
        });

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
    createOrder,
    getMyOrders
};
