const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pickupAddress: {
        type: String,
        required: true
    },

    pickupDate: {
        type: Date,
        required: true
    },

    pickupTime: {
        type: String,
        required: true
    },

    laundryType: {
        type: String,
        enum: ["Wash", "Wash & Iron", "Dry Clean"],
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    specialInstructions: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Pickup Scheduled",
            "Picked Up",
            "Washing",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    },

    totalPrice: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);