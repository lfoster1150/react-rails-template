import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../resources/routes-constants';
import { signOutUser } from '../store/actions/thunkActions';
import { useAppSelector, useAppDispatch } from '../store/reducers/store';

const TopNav: React.FC = () => {
    const authData = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        const message = await dispatch(signOutUser())
        console.log(message)
    }

    return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand className='ms-auto' as={NavLink} to={ROUTES.HOMEPAGE_ROUTE}>Photo-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to={ROUTES.PROTECTED_ROUTE}>Protected</Nav.Link>
            </Nav>
            { authData.loggedIn ? (
                <Nav className="ms-auto">
                    <NavDropdown title={authData.currentUser.email} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action">Account</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            ) : (
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to={ROUTES.LOGIN_ROUTE}>Login</Nav.Link>
                </Nav>
            )}
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default TopNav