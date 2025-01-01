import React, { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './NavbarComponent.css';
import { CartContext } from '../../context/CartContext.js';

const NavbarComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
        calculateCartCount();
    }, [cart]); // Recalculate count whenever cart changes

    const calculateCartCount = () => {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className='Navbar'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/home" className="farmone-brand">FarmOne</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isLoggedIn && (
                            <div className="mx-auto d-flex flex-grow-1 justify-content-center">
                                <Nav>
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <NavDropdown title="Schemes" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/central-schemes">Central Schemes</NavDropdown.Item>
                                        <NavDropdown.Item href="/state-schemes">State Schemes</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/tools">Tools</Nav.Link>
                                    <Nav.Link href="/support">Support</Nav.Link>
                                </Nav>
                            </div>
                        )}
                        <Nav className="ms-auto">
                            {isLoggedIn ? (
                                <Nav.Link onClick={handleLogout} className="login-button">Logout</Nav.Link>
                            ) : (
                                <Nav.Link href="/login" className="login-button">Login</Nav.Link>
                            )}
                            {localStorage.getItem('role') === 'admin' && (
                                <Nav.Link href="/notifications" className="ms-2 notification-icon">
                                    <FontAwesomeIcon icon={faBell} size="lg" />
                                </Nav.Link>
                            )}
                            {location.pathname.startsWith('/tools') && (
                                <Nav.Link href="/cart" className="ms-3 cart-icon">
                                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                                    <span className="cart-count">{cartCount}</span>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;
