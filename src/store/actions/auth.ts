import { createAction } from '@reduxjs/toolkit'
import { SignupData } from '../../types/auth'


export const setToken = createAction<string>('auth/setToken')
export const setAuth = createAction<object>('auth/setAuth')
export const noAuth = createAction<void>('auth/noAuth')