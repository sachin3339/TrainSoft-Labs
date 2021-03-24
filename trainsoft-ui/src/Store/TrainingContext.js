import React, { useState } from 'react';
const TrainingContext = React.createContext({});
export default TrainingContext;


export const TrainingProvider = (props) => {
    const [training,setTraining] = useState(null) 


   
    const appData = {
        training,
        setTraining
    };

    return <TrainingContext.Provider value={{
        ...appData,
    }} > {props.children} </ TrainingContext.Provider>
}