import { createAction } from '@reduxjs/toolkit'


export const setLoginError = createAction<string>('auth/setLoginError')
export const setSignupError = createAction<string>('auth/setSignupError')