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

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrder
};
