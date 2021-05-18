import React, { useState } from 'react';
const AssessmentContext = React.createContext({});
export default AssessmentContext;


export const AssessmentProvider = (props) => {
    const [topicSid,setTopicSid] = useState(null) 
    const [assessmentCon,setAssessmentCon] = useState(null) 
    const [initialAssessment,setInitialAssessment] = useState(null)
    const [assessmentVal,setAssessmentVal] = useState()
    const [category,setCategory] = useState([])
    const [bookmark,setBookmark] = useState([])
    const [myAssessment,setMyAssessment] = useState([])


   
    const appData = {
        category,
        bookmark,
        setBookmark,
        setCategory,
        assessmentCon,
        setAssessmentCon,
        topicSid,
        setTopicSid,
        initialAssessment,
        setInitialAssessment,
        assessmentVal,
        setAssessmentVal,
        myAssessment,
        setMyAssessment
    };

    return <AssessmentContext.Provider value={{
        ...appData,
    }} > {props.children} </ AssessmentContext.Provider>
}