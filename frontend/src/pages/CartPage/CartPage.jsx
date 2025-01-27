import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext.js';
import './CartPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent.jsx';
import axios from 'axios';

const CartPage = () => {
    const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);
    const [responseId, setResponseId] = useState("");
    const [responseState, setResponseState] = useState([]);

    if (cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const createRazorpayOrder = (amount) => {
        let data = JSON.stringify({
            amount: amount * 100,
            currency: "INR"
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:5000/api/orders",
            headers: { 'Content-Type': 'application/json' },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                handleRazorpayScreen(response.data.amount);
            })
            .catch((error) => {
                console.log("error at", error);
            });
    };

    const handleRazorpayScreen = async (amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Some error at razorpay screen loading");
            return;
        }

        const options = {
            key: 'rzp_test_g3c4J5H2HK919i',
            amount: amount,
            currency: 'INR',
            name: "Papaya Coders",
            description: "Payment to Papaya Coders",
            image: "https://papayacoders.com/demo.png",
            handler: function (response) {
                setResponseId(response.razorpay_payment_id);
            },
            prefill: {
                name: "Papaya Coders",
                email: "papayacoders@gmail.com"
            },
            theme: { color: "#F4C430" }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const paymentFetch = (e) => {
        e.preventDefault();
        const paymentId = e.target.paymentId.value;

        axios.get(`http://localhost:5000/payment/${paymentId}`)
            .then((response) => {
                console.log(response.data);
                setResponseState(response.data);
            })
            .catch((error) => {
                console.log("error occurs", error);
            });
    };

    const handleCheckout = () => {
        const totalAmount = cart.reduce((sum, item) => sum + item.toolId.discountPrice * item.quantity, 0);
        createRazorpayOrder(totalAmount);
    };

    return (
        <div>
            <NavbarComponent />
            <div className="cart-page">
                <h2>Your Cart</h2>
                <div className="cart-items">
                    {cart.map(item => (
                        <div className="cart-item-card" key={item.toolId._id}>
                            <img src={item.toolId.image} alt={item.toolId.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.toolId.name}</h3>
                                <p>{item.toolId.description}</p>
                                <div className="quantity-control">
                                    <div className="quantity-container">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateCartQuantity(item.toolId._id, item.quantity - 1)}
                                        >
                                            {item.quantity === 1 ? <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => removeFromCart(item.toolId._id)} /> : '-'}
                                        </button>
                                        <span className="quantity-number">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateCartQuantity(item.toolId._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="remove-button" onClick={() => removeFromCart(item.toolId._id)}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <p>Total Amount: ₹{
                        cart.reduce((sum, item) => sum + item.toolId.discountPrice * item.quantity, 0)
                    }</p>
                    <button className="checkout-button" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {/* {responseId && <p>Payment ID: {responseId}</p>}

            <h1>This is payment verification form</h1>
            <form onSubmit={paymentFetch}>
                <input type="text" name="paymentId" />
                <button type="submit">Fetch Payment</button>
                {responseState.length !== 0 && (
                    <ul>
                        <li>Amount: {responseState.amount / 100} Rs.</li>
                        <li>Currency: {responseState.currency}</li>
                        <li>Status: {responseState.status}</li>
                        <li>Method: {responseState.method}</li>
                    </ul>
                )}
            </form> */}
        </div>
    );
};

export default CartPage;
