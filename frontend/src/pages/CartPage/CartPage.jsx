import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext.js';
import './CartPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const CartPage = () => {
    const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
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
                                {/* {item.quantity > 1 ? ( */}
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
                                {/* ) : (
                                    <span className="remove-text" onClick={() => removeFromCart(item.toolId._id)}>
                                        Remove
                                    </span>
                                )} */}
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
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default CartPage;
