import React, { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationsDropdown = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/support/messages', {
                    headers: {
                        'Authorization': localStorage.getItem('authToken'),
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleViewMessage = (id) => {
        navigate('/notifications', { state: { messageId: id } });  // Pass messageId as state
    };

    return (
        <NavDropdown title="Notifications" id="notification-dropdown">
            {loading ? (
                <NavDropdown.Item>Loading...</NavDropdown.Item>
            ) : messages.length > 0 ? (
                messages.map((msg) => (
                    <NavDropdown.Item key={msg._id} onClick={() => handleViewMessage(msg._id)}>
                        <strong>{msg.name}</strong>: {msg.subject}
                    </NavDropdown.Item>
                ))
            ) : (
                <NavDropdown.Item>No messages</NavDropdown.Item>
            )}
        </NavDropdown>
    );
};

export default NotificationsDropdown;
