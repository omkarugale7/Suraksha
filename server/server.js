const express = require('express');
const app = express();
const connectDB = require("./utils/db");
require("dotenv").config();
const port = process.env.PORT || 8080;
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');
const cors = require('cors');
const { runAt9AM } = require('./utils/reminder');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
runAt9AM();

app.use(cors());
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to Suraksha - Your Campus Safety Friend !!!");
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})