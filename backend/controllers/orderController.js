
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { items } = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item"
            });
        }

        const quantities = new Map();

        for (const item of items) {
            if (
                !item.productId ||
                !mongoose.isValidObjectId(item.productId) ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product or quantity"
                });
            }

            const id = item.productId.toString();

            quantities.set(
                id,
                (quantities.get(id) || 0) + item.quantity
            );
        }

        let createdOrder;

        await session.withTransaction(async () => {
            const orderItems = [];
            let totalAmount = 0;

            for (const [productId, quantity] of quantities) {
                const product = await Product.findById(productId)
                    .session(session);

                if (!product) {
                    throw new Error("PRODUCT_NOT_FOUND");
                }

                if (product.stock < quantity) {
                    throw new Error("INSUFFICIENT_STOCK:" + product.name);
                }

                const result = await Product.updateOne(
                    {
                        _id: productId,
                        stock: { $gte: quantity }
                    },
                    {
                        $inc: { stock: -quantity }
                    },
                    { session }
                );

                if (result.modifiedCount !== 1) {
                    throw new Error("INSUFFICIENT_STOCK:" + product.name);
                }

                orderItems.push({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity
                });

                totalAmount += product.price * quantity;
            }

            const orders = await Order.create(
                [{
                    items: orderItems,
                    totalAmount
                }],
                { session }
            );

            createdOrder = orders[0];
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: createdOrder
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        if (error.message === "PRODUCT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "One or more products were not found"
            });
        }

        if (error.message.startsWith("INSUFFICIENT_STOCK:")) {
            return res.status(400).json({
                success: false,
                message: error.message.replace(
                    "INSUFFICIENT_STOCK:",
                    "Insufficient stock for "
                )
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create order. Please try again."
        });

    } finally {
        await session.endSession();
    }
};

module.exports = {
    createOrder
};