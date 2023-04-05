const db = require('../utils/database');

class User {
	static getAll(callback) {
		db.query('SELECT * FROM users', (err, results) => {
			if (err) {
				callback(err, null);
			} else {
				callback(null, results);
			}
		});
	}

	static getById(id, callback) {
		db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
			if (err) {
				callback(err, null);
			} else {
				callback(null, results[0]);
			}
		});
	}

	static insertNew(userData, callback) {
		const { first_name, last_name, dob, phone, address, city, state, password } = userData;
		// console.log([first_name, last_name, dob, phone, address, city, state, password]);
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

	static getOrdersByPhone(phone, callback) {
		// console.log([phone, password]);
		db.query(`SELECT o.customer_id, o.order_id, p.product_id
		FROM store.orders AS o
		INNER JOIN store.order_items AS oi
		ON o.order_id = oi.order_id 
		INNER JOIN store.products AS p
		ON oi.product_id = p.product_id
		WHERE o.order_id IN (
		  SELECT order_id FROM store.orders
		  WHERE customer_id = (
			SELECT customer_id FROM store.customers
			WHERE phone = ?
		  )
		)
		GROUP BY o.customer_id, o.order_id, p.product_id;`,
			phone,
			(err, results) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, results);
				}
			})
	}
}

module.exports = User;
