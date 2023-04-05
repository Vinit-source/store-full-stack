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
		db.query('SELECT password FROM customers WHERE phone = ?',
			phone,
			(err, results) => {
				if (err) {
					callback(err, null);
				} else if (results.length == 0) {
					const error = "User not found!"
					callback(error, null);
				}
				else {
					// console.log(results[0].password, password);
					if (results[0].password == password) {
						callback(null, null);
					} else {
						const error = "Password does not match!"
						callback(error, null);
					}
				}
			});
	}
}

module.exports = User;
