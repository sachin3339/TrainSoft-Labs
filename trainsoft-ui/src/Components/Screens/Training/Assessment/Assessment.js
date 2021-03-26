import React, { useState } from 'react'
import { Button } from '../../../Common/Buttons/Buttons'
import CardHeader from '../../../Common/CardHeader';
import NoDataFound from '../../../Common/NoDataFound/NoDataFound';
import SessionList from '../../../Common/SessionList/SessionList'
import TrainingRoute from '../TrainingRoute';
import AddAssessment from './AddAssessment'
import "./assessment.css";


const Assessment = ({location}) =>{
    const [show, setShow] = useState(false)
    const listValue = [
        { topicName:"Assessment 1",date:"07/06/2019",active:true },
        { topicName:"Assessment 2",date:"07/06/2019",active:false },
        { topicName:"Assessment 3",date:"07/06/2019",active:false },
    ]
    return(<>
    <CardHeader {...{location,onChange: (e) => {},
                    onEnter: (e) => {},}}/>
    <TrainingRoute {...{location}}/>
     <NoDataFound title="Coming Soon..."/>
            {/* <div className="session-container">
            <SessionList {...{sessionList:listValue }}/>
        </div>
        <div className="full-w mt-2"><Button className="btn-block" onClick={()=> setShow(true)}>+ Add Session</Button></div>
        <AddAssessment {...{show, setShow}}/> */}
    </>)
}

export default Assessment