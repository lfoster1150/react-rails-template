import React, { useEffect } from 'react'
import DateDisplay from '../components/DateDisplay'
import { useAppSelector, useAppDispatch } from '../store/reducers/store'
import { getData } from '../store/actions/thunkActions'

const HomePage: React.FC = () => {
    const data = useAppSelector((state) => state)
    console.log(data)
    
    // const dispatch = useAppDispatch()
    // const loadData = async () => {
    //     dispatch(getData());
    // };

    // useEffect(() => {
    //     loadData()
    // }, [dispatch])

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Home Page</h1>
            <DateDisplay />
        </div>
    )
}

export default HomePage
