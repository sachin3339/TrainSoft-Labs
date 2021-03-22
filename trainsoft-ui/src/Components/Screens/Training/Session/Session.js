import React, { useState, useContext, useEffect } from 'react'
import { Button } from '../../../Common/Buttons/Buttons'
import SessionList from '../../../Common/SessionList/SessionList'
import AddSession from './AddSession'
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import useFetch from "../../../../Store/useFetch";
import TrainingContext from "../../../../Store/TrainingContext";
import AppContext from '../../../../Store/AppContext';
import './session.css'
import RestService from '../../../../Services/api.service';
import useToast from '../../../../Store/ToastHook';

const Session = ()=>{
    const Toast = useToast();
    const [show, setShow] = useState(false)
    const {user,spinner} =  useContext(AppContext)
    const {training} = useContext(TrainingContext)
    const [trainingSession,setTrainingSession] = useState('')
   

       // search session
       const searchSession = (name)=> {
        try{
            spinner.show();
            RestService.searchTrainingSession(name).then(res => {
                   setTrainingSession(res.data)
                    spinner.hide();
                }, err => {
                    spinner.hide();
                }
            ); 
        }
        catch(err){
            console.error('error occur on searchSession()',err)
            spinner.hide();
        }
    }
    
        // get All session
        const getSessionByPage = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getTrainingSession(training.sid,training.courseSid).then(
                response => {
                    setTrainingSession(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }

       // delete course
       const deleteTraining = (trainingId) => {
        try {
            spinner.show();
            RestService.deleteTrainingSession(trainingId).then(res => {
                spinner.hide();
                getSessionByPage()
                Toast.success({ message: `Training is Deleted Successfully ` });
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on deleteTraining', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    useEffect(()=>{
        getSessionByPage()
    },[])


    return(<>
        <div className="session-container">
            <SessionList  {...{sessionList:trainingSession , sessionType:"training",
             onDelete:(e)=> deleteTraining(e),
             onEdit:()=> console.log("")
             }}/>
        </div>
        {user.role === 'admin' &&<div className="full-w mt-2"><Button className="btn-block" onClick={()=> setShow(true)}>+ Add Session</Button></div>}
        <AddSession {...{show, setShow,getSessionByPage}}/>
    </>)
}
export default Session