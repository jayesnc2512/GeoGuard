import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { userData: action.payload }
        case 'LOGOUT':
            return { userData: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    // keeps us logged in based on the jwt present in localstorage
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user@GeoGuard'))

        if (userData) {
            dispatch({ type: 'LOGIN', payload: userData })
        }
    }, [])

    const [state, dispatch] = useReducer(authReducer, {
        userData: null
    })

    console.log('AuthContext State:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}