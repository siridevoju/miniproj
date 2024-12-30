import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const AddTool = () => {
    const [toolData, setToolData] = useState({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        image: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setToolData({ ...toolData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Adding email field for authorization
        const dataToSubmit = {
            ...toolData,
            email: 'admin@gmail.com' // You can fetch from localStorage if needed
        };

        try {
            await axios.post('http://localhost:5000/api/tools', dataToSubmit, {
                headers: {
                    'Authorization': localStorage.getItem('authToken') // Include the token in the Authorization header
                }
            });
            navigate('/tools'); // Redirect to tools page after successful addition
        } catch (error) {
            console.error('Error adding tool:', error);
        }
    };

    return (
        <Container>
            <h2>Add Tool</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tool Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Discount Price</Form.Label>
                    <Form.Control type="number" name="discountPrice" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" name="image" onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Add Tool
                </Button>
            </Form>
        </Container>
    );
};

export default AddTool;
