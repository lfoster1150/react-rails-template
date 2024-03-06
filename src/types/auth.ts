export interface SignupData {
    email: string,
    password: string,
    confirmPassword: string
}

export interface CurrentUser {
    
}

export interface AuthData {
    authChecked: boolean,
    loggedIn: boolean,
    currentUser: object
}
