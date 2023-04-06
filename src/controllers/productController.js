const Product = require('../models/productModel');

// Controller function to get all products
exports.getAllProducts = (req, res) => {
    Product.getAll((err, products) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            res.status(200).json(products);
        }
    });
};

// Not implemented
exports.getProductById = (req, res) => {
    const { id } = req.params;
    Product.getById(id, (err, product) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    });
};