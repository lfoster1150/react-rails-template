import React from 'react'
import DateDisplay from '../components/DateDisplay'
import { Container } from 'react-bootstrap'

const ProtectedPage: React.FC = () => {
    return (
        <Container>
            <h1 style={{ fontSize: '4em', textAlign: 'center' }}>You are signed in!</h1>
            <DateDisplay />
        </Container>
    )
}

export default ProtectedPage
