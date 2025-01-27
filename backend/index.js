const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('node:http');
const Razorpay = require("razorpay");
const connectToSocket = require('./controllers/socketManager');
require('dotenv').config();

const app = express();
app.use(cors());

const server = createServer(app); // Create the server correctly
const io = connectToSocket(server);

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mini_proj1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const toolRoutes = require('./routes/toolRoutes');
const cartRoutes = require('./routes/cartRoutes');
const supportRoutes = require('./routes/supportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


app.use('/api', authRoutes);
app.use('/api', toolRoutes);
app.use('/api', cartRoutes);
app.use('/api', supportRoutes);
app.use('/api', paymentRoutes);

// Razorpay routes for payment creation and verification
app.post('/api/orders', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: "rzp_test_u9Mtfwm5NxX0Yo",
        key_secret: "2LbJnQ1o71BFGPr8DuccJBXK"
    });

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture: 1
    };

    console.log('Options:', options);

    try {
        const response = await razorpay.orders.create(options);
        console.log('Response:', response);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error.response ? error.response.data : error);
        res.status(500).send("Internal server error");
    }
});


app.get("/api/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;

    const razorpay = new Razorpay({
        key_id: "rzp_test_GcZZFDPP0jHtC4",
        key_secret: "6JdtQv2u7oUw7EWziYeyoewJ"
    });

    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            return res.status(500).json("Error at Razorpay loading");
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        });
    } catch (error) {
        res.status(500).json("Failed to fetch payment");
    }
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
