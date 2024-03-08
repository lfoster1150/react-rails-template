import { createReducer } from '@reduxjs/toolkit'
import { setLoginError, setSignupError } from '../actions/errors'

interface DataReducer {
    loginError: string,
    signupError: string
}

const initialState: DataReducer = {
    loginError: "",
    signupError: ""
}

const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
    builder.addCase(setLoginError, (state, action) => {
        state.loginError = action.payload
    })
    builder.addCase(setSignupError, (state, action) => {
        state.signupError = action.payload
    })
})

export default dataReducer
