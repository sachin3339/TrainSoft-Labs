import React, { useState,useReducer } from 'react';
const AuthContext = React.createContext({});
export default AuthContext;
export const AuthConsumer = AuthContext.Consumer;

let user = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: '';

const initialState = {
    user: user,
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return {
                ...state,
                user: {...action.value}
            };
        case "LOGOUT":
            localStorage.removeItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                user: ''
            }
        default:
            return state

    }
}

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)


    const setValueBy = (type, value) => {
        dispatch({type, value});
    }
   
    const appData = {
        ...state,
        setValueBy,

    };

    return <AuthContext.Provider value={{
        ...appData,
    }} > {props.children} </ AuthContext.Provider>
}