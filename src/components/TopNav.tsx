import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../resources/routes-constants';

const TopNav: React.FC = () => {
    return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand as={NavLink} to={ROUTES.HOMEPAGE_ROUTE}>Photo-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to={ROUTES.LOGIN_ROUTE}>Login</Nav.Link>
            </Nav>
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to={ROUTES.SIGNUP_ROUTE}>Signup</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={ROUTES.LOGOUT_ROUTE}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default TopNav