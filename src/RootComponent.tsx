import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/TopNav'
import { Container } from 'react-bootstrap';
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAppSelector } from './store/reducers/store'
import ResetPasswordPage from './pages/ResetPasswordPage'
import RequestResetPage from './pages/RequestResetPage'

const RootComponent: React.FC = () => {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn)
    return (
        <div>
            <Router>
                <TopNav />
                <Container style={{marginTop: "1.5rem"}} >
                    <Routes>
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                        <Route path={ROUTES.SIGNUP_ROUTE} element={<SignupPage />} />
                        <Route path={ROUTES.LOGIN_ROUTE} element={<LoginPage />} />
                        <Route path={ROUTES.PASSWORD_RESET_ROUTE} element={<ResetPasswordPage />} />
                        <Route path={ROUTES.REQUEST_PASSWORD_RESET_ROUTE} element={<RequestResetPage />} />
                        <Route 
                            path={ROUTES.PROTECTED_ROUTE} 
                            element={
                                <ProtectedRoute loggedIn={loggedIn} >
                                    <ProtectedPage />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </Container>
            </Router>
        </div>
    )
}

export default RootComponent
