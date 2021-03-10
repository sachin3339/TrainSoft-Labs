import React, { useState, useContext } from 'react'
import { Button } from '../../../Common/Buttons/Buttons'
import SessionList from '../../../Common/SessionList/SessionList'
import AddSession from './AddSession'
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import useFetch from "../../../../Store/useFetch";
import TrainingContext from "../../../../Store/TrainingContext";
import AppContext from '../../../../Store/AppContext';
import './session.css'

const Session = ()=>{
    const [show, setShow] = useState(false)
    const {user} =  useContext(AppContext)
    const {training} = useContext(TrainingContext)
    console.log(training)
    const { response } = useFetch({
        method: "get",
        url: GLOBELCONSTANT.TRAINING.GET_TRAINING_SESSION + training.sid + "/course/" + training.courseSid,
        errorMsg: 'error occur on get training'
    });


    return(<>
        <div className="session-container">
            <SessionList  {...{sessionList:response ,sessionType:"training"}}/>
        </div>
        {user.role === 'admin' &&<div className="full-w mt-2"><Button className="btn-block" onClick={()=> setShow(true)}>+ Add Session</Button></div>}
        <AddSession {...{show, setShow}}/>
    </>)
}
export default Session