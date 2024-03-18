import { createReducer } from '@reduxjs/toolkit'
import { setLoginError, setSignupError, setResetError, setRequestResetError } from '../actions/errors'

interface DataReducer {
    loginError: string,
    signupError: string,
    resetError: string,
    requestResetError: string
}

const initialState: DataReducer = {
    loginError: "",
    signupError: "",
    resetError: "",
    requestResetError: ""
}

const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
    builder.addCase(setLoginError, (state, action) => {
        state.loginError = action.payload
    })
    builder.addCase(setSignupError, (state, action) => {
        state.signupError = action.payload
    })
    builder.addCase(setResetError, (state, action) => {
        state.resetError = action.payload
    })
    builder.addCase(setRequestResetError, (state, action) => {
        state.requestResetError = action.payload
    })
})

export default dataReducer
