const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json({
            success: true,
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product"
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct
};