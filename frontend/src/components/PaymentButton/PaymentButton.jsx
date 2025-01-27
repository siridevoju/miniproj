import React from 'react';

const PaymentButton = ({ amount }) => {
    const handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, receipt: `order_rcptid_${Date.now()}` }),
            });
            const order = await response.json();

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Your Shop",
                description: "Purchase Tools",
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await fetch('http://localhost:5000/api/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment successful!");
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                theme: { color: "#4bfd63" },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Payment Error:", error);
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
            Pay ₹{amount}
        </button>
    );
};

export default PaymentButton;
