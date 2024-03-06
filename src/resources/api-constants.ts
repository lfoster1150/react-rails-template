export const baseApiUrl = (): string => {
    return process.env.REACT_APP_API_URL || ""
}

export const getDataUrl = (): string => {
    return baseApiUrl() + '/test'
}

export const getSignupUrl = (): string => {
    return baseApiUrl() + '/auth/signup'
}