// A Model is a key component of backend development responsible for representing the application's data and business logic. 
// For example, here the User model has three functions (also known as methods):
// insertNew: Executes SQL query to insert the data of new user sent by the createUser controller and returns the status of the query.
// verify: Gets the user login data from the verifyUser controller and performs the following tasks:
// 			1. Executes SQL query to get customer_id and password of the existing customer. It uses UNIQUE column `phone` to find the customer from the customers table. 
// 			2. Checks if the user is present in the customers table, and generates error if user not found.
//			3. If the user is present in the customers table, it matches password and verifies user authorization.
// getOrdersById: Executes SQL query to get the order details of the logged in customer. It takes userId as parameter sent by getUserOrders controller and returns the status of the query.. 

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

	// Template Model method
	static yourMethod(params_used_in_query, callback) {

		db.query(`<YOUR-MYSQL-QUERY>`,
			params_used_in_query,
			(err, results) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, results);
				}
			})
	}
}

// require('userModel.js') in any other file will load `User` class into that file.
module.exports = User;
