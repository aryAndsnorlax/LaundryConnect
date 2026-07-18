const Order = require("../models/Order");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS ? "Password Loaded" : "Password Missing");
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

        // Price calculation
        let pricePerKg = 0;

        switch (laundryType) {
            case "Wash":
                pricePerKg = 50;
                break;

            case "Wash & Iron":
                pricePerKg = 80;
                break;

            case "Dry Clean":
                pricePerKg = 120;
                break;

            default:
                return res.status(400).json({
                    success: false,
                    message: "Invalid laundry type"
                });
        }

        const totalPrice = weight * pricePerKg;

        const order = await Order.create({
            customer: req.user.id,
            pickupAddress,
            pickupDate,
            pickupTime,
            laundryType,
            weight,
            specialInstructions,
            totalPrice
        });
        const customer = await User.findById(req.user.id);

await sendEmail(
    customer.email,
    "Laundry Order Confirmation",
    `Hello ${customer.name},

Your laundry order has been placed successfully.

Order ID: ${order._id}

Pickup Address: ${pickupAddress}

Laundry Type: ${laundryType}

Weight: ${weight} kg

Pickup Date: ${pickupDate}

Pickup Time: ${pickupTime}

Total Amount: ₹${totalPrice}

Current Status: Pending

Thank you for choosing LaundryConnect!

Regards,
LaundryConnect Team`
);

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
const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        if (order.customer.toString() !== req.user.id) {
    return res.status(403).json({
        success: false,
        message: "Access denied"
    });
}

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateOrder = async (req, res) => {
    try {

    const order = await Order.findById(req.params.id);
    if (!order) {
    return res.status(404).json({
        success: false,
        message: "Order not found"
    });
}
if (order.customer.toString() !== req.user.id) {
    return res.status(403).json({
        success: false,
        message: "Access denied"
    });
}
if (order.status !== "Pending") {
    return res.status(400).json({
        success: false,
        message: "Only pending orders can be updated"
    });
}
const {
    pickupAddress,
    pickupDate,
    pickupTime,
    specialInstructions
} = req.body;

order.pickupAddress = pickupAddress;
order.pickupDate = pickupDate;
order.pickupTime = pickupTime;
order.specialInstructions = specialInstructions;

await order.save();

res.status(200).json({
    success: true,
    message: "Order updated successfully",
    order
});

} catch (error) {

    res.status(500).json({
        success: false,
        message: error.message
    });

}

};

const cancelOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.customer.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        if (order.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "Only pending orders can be cancelled"
            });
        }

        order.status = "Cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
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
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrder,
    cancelOrder
};
