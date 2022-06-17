const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String },
    userEmail: { type: String },
    products: [
        {
            productId: {
                type: String,
            },
            title: {
                type: String,
            },
            img: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    name: { type: String, required: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    quantity: { type: String }
},
    { timestamps: true },
)

module.exports = mongoose.model("Order", OrderSchema)