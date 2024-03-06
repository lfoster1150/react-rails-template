import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../reducers/store'
import { setContents } from './data'
import { setToken, setAuth, noAuth } from './auth'
import { SignupData } from '../../types/auth'
import API from '../../resources/api'

export const getData = createAsyncThunk<void, void, { dispatch: AppDispatch }>('data/getData', async (_, thunkApi) => {
    try {
        const data: any[] = await API.get("/").then((response) => {
            return response.data.results
        })
        console.log(data)
        thunkApi.dispatch(setContents(data))
    } catch (e) {
        console.error(e)
        throw e
    }
})

export const registerUser = createAsyncThunk<void, SignupData, { dispatch: AppDispatch }>('auth/registerUser', async (data, thunkApi): Promise<void> => {
    const dispatch = thunkApi.dispatch as AppDispatch

    const url = "/auth/signup"
    const userData = {user: {
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword
    }}

    const options = {
        headers: {
            "content-type": "application/json",
    }}

    try {
        const response: any = await API.post(url, userData, options)
        const token = response.headers.get("Authorization")
        dispatch(setToken(token))
        dispatch(setAuth(response.data.data))
        return
    } catch (e) {
        dispatch(noAuth())
        console.error(e)
        throw e
    }
})

export const signOutUser = createAsyncThunk<void, void, { dispatch: AppDispatch }>('auth/signoutUser', async (_, thunkApi): Promise<void> => {
    const state = thunkApi.getState() as RootState
    const dispatch = thunkApi.dispatch as AppDispatch

    const url = "/auth/logout"
    const options = {
        headers: {
            "content-type": "application/json",
            "authorization": state.auth.token
    }}

    try {
        await API.delete(url, options)
        dispatch(noAuth())
        return
    } catch (e) {
        dispatch(noAuth())
        console.error(e)
        throw e
    }
})
