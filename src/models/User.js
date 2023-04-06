const db = require('../utils/database');

class User {

	static insertNew(userData, callback) {
		const { first_name, last_name, dob, phone, address, city, state, password } = userData;
		db.query('INSERT INTO customers (first_name, last_name, birth_date, phone, address, city, state, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[first_name, last_name, dob, phone, address, city, state, password],
			(err, results) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, null);
				}
			});
	}

	static verify(userData, callback) {
		const { phone, password } = userData;
		// console.log([phone, password]);
		db.query('SELECT customer_id, password FROM customers WHERE phone = ?',
			phone,
			(err, results) => {
				if (err) {
					callback(err, null);
				} else if (results.length == 0) {
					const error = "User not found!"
					callback(error, null);
				}
				else {
					// Login successful
					if (results[0].password == password) {
						callback(null, results[0].customer_id);
					} else {
						// Password does not match
						const error = "Password does not match!"
						callback(error, null);
					}
				}
			});
	}

	static getOrdersById(customer_id, callback) {
		// console.log([customer_id, password]);
		db.query(`SELECT o.customer_id, o.order_id, p.product_id, p.name, o.order_date, oi.quantity, oi.unit_price
		FROM store.orders AS o
		INNER JOIN store.order_items AS oi
		ON o.order_id = oi.order_id 
		INNER JOIN store.products AS p
		ON oi.product_id = p.product_id
		WHERE o.customer_id = ?
		GROUP BY o.customer_id, o.order_id, p.product_id;`,
			customer_id,
			(err, results) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, results);
				}
			})
	}
}

// require('User.js') in any other file will load `User` class into that file.
module.exports = User;
