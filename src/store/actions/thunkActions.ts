import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../reducers/store'
import { setContents } from './data'
import { setToken, setAuth, noAuth } from './auth'
import { setLoginError, setSignupError } from './errors'
import { SignupData } from '../../types/auth'
import API from '../../resources/api'
import axios, { AxiosResponse , AxiosError } from 'axios'

const checkTokenValid = (lastLoginTime: number) => {
    const now = new Date(Date.now()).getTime();
    const thirtyDays = 1000 * 60 * 60 * 24 * 30; // ms * s * min * hr * d
    const timeSinceLastLogin = now - lastLoginTime
    return timeSinceLastLogin < thirtyDays
}

export const getData = createAsyncThunk<void, void, { dispatch: AppDispatch }>('data/getData', async (_, thunkApi) => {
    const dispatch = thunkApi.dispatch as AppDispatch
    const state = thunkApi.getState() as RootState


    if(!checkTokenValid(state.auth.lastLoginTime)) {
        dispatch(noAuth())
        return
    }

    const options = {
        params: {
            'user_id': state.auth.currentUser.id
        },
        headers: {
            "content-type": "application/json",
            "Authorization": state.auth.token
    }}

    try {
        const data: AxiosResponse = await API.get("/test", options).then((response) => {
            return response
        })
        thunkApi.dispatch(setContents(data.data))
    } catch (e) {
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error))  {
            if(error.response && error.response.status === 401){
                dispatch(noAuth())
        }} 
        console.error(error)
        throw error
    }
})

export const loginUser = createAsyncThunk<void, {[key: string]: string}, { dispatch: AppDispatch }>('auth/loginUser', async (data, thunkApi): Promise<void> => {
    const url = "/auth/login"
    const dispatch = thunkApi.dispatch as AppDispatch

    const userData = {user: {
        email: data.email,
        password: data.password,
    }}

    const options = {
        headers: {
            "content-type": "application/json",
    }}

    try {
        const response: AxiosResponse = await API.post(url, userData, options)
        const token = response.headers.authorization
        dispatch(setToken(token))
        dispatch(setAuth(response.data.data))
    } catch (e) {
        dispatch(noAuth())
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error))  {
            dispatch(setLoginError(error.response?.data.status.message))
            throw error
        } else {
            console.error(e)
            throw e
        }
    }
})

export const registerUser = createAsyncThunk<void, SignupData, { dispatch: AppDispatch }>('auth/registerUser', async (data, thunkApi): Promise<void> => {
    const url = "/auth/signup"
    const dispatch = thunkApi.dispatch as AppDispatch

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
        const response: AxiosResponse = await API.post(url, userData, options)
        const token = response.headers.authorization
        dispatch(setToken(token))
        dispatch(setAuth(response.data.data))
    } catch (e) {
        dispatch(noAuth())
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error))  {
            dispatch(setSignupError(error.response?.data.status.message))
            throw error
        } else {
            console.error(e)
            throw e
        }
    }
})

export const signOutUser = createAsyncThunk<void, void, { dispatch: AppDispatch }>('auth/signoutUser', async (_, thunkApi): Promise<void> => {
    const url = "/auth/logout"
    const state = thunkApi.getState() as RootState
    const dispatch = thunkApi.dispatch as AppDispatch

    if(!checkTokenValid(state.auth.lastLoginTime)) {
        dispatch(noAuth())
        return
    }

    const options = {
        headers: {
            "content-type": "application/json",
            "Authorization": state.auth.token
    }}

    try {
        await API.delete(url, options)
        dispatch(noAuth())
    } catch (e) {
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error))  {
            if(error.response && error.response.status === 401){
                dispatch(noAuth())
        }} 
        throw error
    }
})
