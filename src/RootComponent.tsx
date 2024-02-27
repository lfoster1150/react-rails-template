import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/TopNav'

const RootComponent: React.FC = () => {
    return (
        <div>
            <Router>
                <TopNav />
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RootComponent
