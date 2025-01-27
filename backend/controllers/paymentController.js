const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Create order with dynamic values from frontend
const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", receipt } = req.body;

        const options = {
            amount: amount * 100, // Convert to paisa
            currency,
            receipt,
            payment_capture: 1, // Auto-capture payment
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
};

// Verify payment signature dynamically
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Generate the expected signature to validate
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        // Compare the generated and the received signature
        if (generatedSignature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid payment signature" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error verifying payment' });
    }
};

module.exports = { createOrder, verifyPayment };
