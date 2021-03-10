import React, { useState } from 'react';
import useSpinner from './SpinnerHook';
const AppContext = React.createContext({});
export default AppContext;
export const AppConsumer = AppContext.Consumer;


export const AppProvider = (props) => {
    const spinner = useSpinner() 
    const [user,setUser] = useState(null) 
    const [course,setCourse] = useState([])
    const [batches,setBatches] = useState([])


   
    const appData = {
        spinner,
        user,
        setUser,
        course,
        setCourse,
        batches,
        setBatches
    };

    return <AppContext.Provider value={{
        ...appData,
    }} > {props.children} </ AppContext.Provider>
}