const db = require('../utils/database');

class Product {
    static getAll(callback) {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM products WHERE product_id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }
}

module.exports = Product;
