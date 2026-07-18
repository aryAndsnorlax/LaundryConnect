const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

const Order = require("../models/Order");

// Simulate Payment
const makePayment = async (req, res) => {

    try {

        const { orderId } = req.params;

        const { paymentMethod } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.paymentStatus === "Paid") {
            return res.status(400).json({
                success: false,
                message: "Payment already completed"
            });
        }

        order.paymentStatus = "Paid";
        order.paymentMethod = paymentMethod;
        order.paymentId = "PAY_" + Date.now();

        await order.save();
        const customer = await User.findById(order.customer);

await sendEmail(
    customer.email,
    "Payment Successful",
    `Hello ${customer.name},

Your payment has been received successfully.

Payment Details

Order ID: ${order._id}

Payment ID: ${order.paymentId}

Amount Paid: ₹${order.totalPrice}

Payment Method: ${order.paymentMethod}

Payment Status: ${order.paymentStatus}

Thank you for choosing LaundryConnect.

Regards,
LaundryConnect Team`
);

        res.status(200).json({
            success: true,
            message: "Payment Successful",
            payment: {
                paymentId: order.paymentId,
                amount: order.totalPrice,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Customer Payment History
const paymentHistory = async (req, res) => {

    try {

        const payments = await Order.find({
            customer: req.user.id
        }).select(
            "totalPrice paymentStatus paymentMethod paymentId createdAt"
        );

        res.status(200).json({
            success: true,
            payments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Admin Payment History
const allPayments = async (req, res) => {

    try {

        const payments = await Order.find()
            .populate("customer", "name email")
            .select(
                "customer totalPrice paymentStatus paymentMethod paymentId createdAt"
            );

        res.status(200).json({
            success: true,
            payments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    makePayment,
    paymentHistory,
    allPayments
};