const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productsRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');

// Use Express.JS to create an app
const app = express();

// Assign default port
const port = process.env.PORT || 3000;

// Cross Origin error prevention and security
// Check: Port number same as your frontend port number?
const allowedOrigins = ["http://127.0.0.1:5500", "http://localhost:5500"];
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  methods: "GET, POST, DELETE",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});
