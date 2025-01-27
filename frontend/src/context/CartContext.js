import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from localStorage

    // Fetch the cart from the backend
    useEffect(() => {
        if (authToken) {
            axios.get(`http://localhost:5000/api/cart/${userId}`, {
                headers: {
                    'Authorization': authToken // Include the token in the Authorization header
                }
            })
                .then((response) => {
                    setCart(response.data);
                })
                .catch((error) => console.error('Error fetching cart:', error));
        }
    }, [authToken, userId]);

    const updateCartQuantity = (toolId, newQuantity) => {
        if (!toolId) {
            console.error('Invalid toolId:', toolId);
            return;
        }
        axios.put(`http://localhost:5000/api/cart/${userId}/${toolId}`,
            { quantity: newQuantity },
            {
                headers: {
                    'Authorization': authToken // Include the token in the Authorization header
                }
            })
            .then(() => {
                setCart(prevCart => prevCart.map(item =>
                    item.toolId._id === toolId ? { ...item, quantity: newQuantity } : item
                ));
            })
            .catch(error => console.error('Error updating cart quantity:', error));
    };

    // Add a tool to the cart
    const addToCart = (toolId, quantity = 1) => {
        axios.post(`http://localhost:5000/api/cart/${userId}`,
            { toolId, quantity },
            {
                headers: {
                    'Authorization': authToken // Include the token in the Authorization header
                }
            })
            .then(() => {
                setCart(prevCart => {
                    const existingItem = prevCart.find(item => item.toolId._id === toolId);
                    if (existingItem) {
                        return prevCart.map(item =>
                            item.toolId._id === toolId ? { ...item, quantity: item.quantity + quantity } : item
                        );
                    } else {
                        return [...prevCart, { toolId: { _id: toolId }, quantity }];
                    }
                });
            })
            .catch(error => console.error('Error adding to cart:', error));
    };

    // Remove a tool from the cart
    const removeFromCart = (toolId) => {
        axios.delete(`http://localhost:5000/api/cart/${userId}/${toolId}`, {
            headers: {
                'Authorization': authToken // Include the token in the Authorization header
            }
        })
            .then(() => {
                setCart(prevCart => prevCart.filter(item => item.toolId._id !== toolId));
            })
            .catch(error => console.error('Error removing from cart:', error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
