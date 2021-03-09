import React, { useState } from 'react'
import { Button } from '../../../Common/Buttons/Buttons'
import SessionList from '../../../Common/SessionList/SessionList'
import AddSession from './AddSession'
import './session.css'
const Session = ()=>{
    const [show, setShow] = useState(false)
    const listValue = [
        { topicName:"OOAD Methodology",date:"07/06/2019",active:true },
        { topicName:"Charteristic and features of OOP",date:"07/06/2019",active:false },
        { topicName:"Development Processes",date:"07/06/2019",active:false },
    ]

    return(<>
        <div className="session-container">
            <SessionList {...{sessionList:listValue }}/>
        </div>
        <div className="full-w mt-2"><Button className="btn-block" onClick={()=> setShow(true)}>+ Add Session</Button></div>
        <AddSession {...{show, setShow}}/>
    </>)
}
export default Session