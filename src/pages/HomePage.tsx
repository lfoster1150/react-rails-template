import React, { useEffect } from 'react'
import DateDisplay from '../components/DateDisplay'
import { useAppSelector, useAppDispatch } from '../store/reducers/store'
import { getData } from '../store/actions/thunkActions'
import { Container } from 'react-bootstrap'

const HomePage: React.FC = () => {
    const authData = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(authData.loggedIn){
            dispatch(getData());
        }
    }, [dispatch, authData])

    return (
        <Container>
            <h1 style={{ fontSize: '4em', textAlign: 'center' }}>Home Page</h1>
            <DateDisplay />
        </Container>
    )
}

export default HomePage
