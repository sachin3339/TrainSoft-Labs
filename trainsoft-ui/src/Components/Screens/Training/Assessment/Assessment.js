import React, { useState } from 'react'
import { Button } from '../../../Common/Buttons/Buttons'
import SessionList from '../../../Common/SessionList/SessionList'
import AddAssessment from './AddAssessment'

const Assessment = () =>{
    const [show, setShow] = useState(false)
    const listValue = [
        { topicName:"Assessment 1",date:"07/06/2019",active:true },
        { topicName:"Assessment 2",date:"07/06/2019",active:false },
        { topicName:"Assessment 3",date:"07/06/2019",active:false },
    ]
    return(<>
            <div className="session-container">
            <SessionList {...{sessionList:listValue }}/>
        </div>
        <div className="full-w mt-2"><Button className="btn-block" onClick={()=> setShow(true)}>+ Add Session</Button></div>
        <AddAssessment {...{show, setShow}}/>
    </>)
}

export default Assessment