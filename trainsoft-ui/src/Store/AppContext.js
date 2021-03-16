import React, { useState,useReducer } from 'react';
import useSpinner from './SpinnerHook';
const AppContext = React.createContext({});
export default AppContext;
export const AppConsumer = AppContext.Consumer;

let user = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: '';



const initialState = {
    user: user
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('user', JSON.stringify(action.value));
            return {
                ...state,
                user: {...action.value}
            };
        case "LOGOUT":
            localStorage.removeItem('user');
            return {
                ...state,
                user: ''
            }
        default:
            return state

    }
}

export const AppProvider = (props) => {
    const [authState, dispatch] = useReducer(authReducer, initialState)
    const spinner = useSpinner()  
    const [course,setCourse] = useState([])
    const [batches,setBatches] = useState([])
    const [department,setDepartment] = useState([])


    const setValueBy = (type, value) => {
        dispatch({type, value});
    }
   
    const appData = {
        spinner,
        ...authState,
        setValueBy,
        course,
        setCourse,
        batches,
        setBatches,
        department,
        setDepartment
    };

    return <AppContext.Provider value={{
        ...appData,
    }} > {props.children} </ AppContext.Provider>
}