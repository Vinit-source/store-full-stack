const mysql = require('mysql');

// MySQL connection config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'store'
});

// Connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = connection;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '123456',
//   database: process.env.DB_NAME || 'store',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = pool.promise();
