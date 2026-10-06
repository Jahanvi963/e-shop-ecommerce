const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                name: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],

        totalAmount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            default: "Placed"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;