import { createReducer } from '@reduxjs/toolkit'
import { setAuth, noAuth, setToken } from '../actions/auth'

interface DataReducer {
    token: string,
    authChecked: boolean,
    loggedIn: boolean,
    currentUser: {
        id: number,
        email: string,
        createdAt: Date
    }
}

const initialState: DataReducer = {
    token: "",
    authChecked: false,
    loggedIn: false,
    currentUser: {
        id: 0,
        email: '',
        createdAt: new Date(2000, 1, 1),
    }
}

const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
    builder.addCase(setAuth, (state, action) => {
        const userData: Record<string, any> = action.payload
        state.authChecked = true
        state.loggedIn = true
        state.currentUser = {
            id: userData["id"],
            email: userData["email"],
            createdAt: userData["created_at"]
        }
    })
    builder.addCase(noAuth, (state, action) => {
        state.token = "",
        state.authChecked = false
        state.loggedIn = false
        state.currentUser = initialState.currentUser
    })
    builder.addCase(setToken, (state, action) => {
        state.token = action.payload
    })
})

export default dataReducer
