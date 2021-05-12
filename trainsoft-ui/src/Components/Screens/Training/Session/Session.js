import React, { useState, useContext, useEffect } from 'react'
import { Button } from '../../../Common/Buttons/Buttons'
import SessionList from '../../../Common/SessionList/SessionList'
import AddSession from './AddSession'
import TrainingContext from "../../../../Store/TrainingContext";
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import useToast from '../../../../Store/ToastHook';
import TrainingRoute from '../TrainingRoute';
import CardHeader from '../../../Common/CardHeader';
import './session.css'


const Session = ({ location }) => {
    const Toast = useToast();
    const [show, setShow] = useState(false)
    const { user, spinner, ROLE } = useContext(AppContext)
    const { training } = useContext(TrainingContext)
    const [trainingSession, setTrainingSession] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [initialValue, setInitialValue] = useState({})


    // search session
    const searchSession = (name) => {
        try {
            spinner.show();
            RestService.searchTrainingSession(training.sid, name).then(res => {
                let data = res.data.map(resp=> {
                    let a = resp
                    a.meetingInfo = JSON.parse(a.meetingInfo)
                    a.sessionDate = a.startTime
                    return a
                })
                setTrainingSession(data)
                spinner.hide();
            }, err => {
                spinner.hide();
            });
        }
        catch (err) {
            console.error('error occur on searchSession()', err)
            spinner.hide();
        }
    }

    // get All session
    const getSessionByPage = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getTrainingSession(training.sid, training.courseSid).then(
                response => {
                    let data = response.data.map(res=> {
                        let a = res
                        a.meetingInfo = JSON.parse(a.meetingInfo)
                        a.sessionDate = a.startTime

                        return a
                    })
                    
                    setTrainingSession(data);
                    spinner.hide();

                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            spinner.hide();
            console.error("error occur on getSession()", err)
        }
    }

    // delete course
    const deleteTraining = (e) => {
        try {
            spinner.show();
            RestService.deleteTrainingSession(e.sid).then(res => {
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

        // delete session
        const unSchedule = (e) => {
            console.log(e.meetingInfo)
            try {
                spinner.show();
                RestService.unScheduleSession(e.sid,"DISABLED",e.meetingInfo.meetingId).then(res => {
                    spinner.hide();
                    getSessionByPage()
                    Toast.success({ message: `Session unschedule successfully` });
                }, err => { spinner.hide(); }
                )
            }
            catch (err) {
                spinner.hide();
                console.error('error occur on unSchedule', err)
                Toast.error({ message: `Something wrong!!` });
            }
        }



    useEffect(() => {
        getSessionByPage()
    }, [])


    return (<>
        <CardHeader {...{
            location,
            onChange: (e) => e.length === 0 && getSessionByPage(),
            onEnter: (e) => searchSession(e),
        }}>
            {user.role === ROLE.SUPERVISOR && <>
                <Button className="ml-2" onClick={() => { setShow(true); setIsEdit(false) }}>+ Add Session</Button>
            </>}
        </CardHeader>
        <TrainingRoute {...{ location }} />
        <div className="session-container">
            <SessionList  {...{
                sessionList: trainingSession, sessionType: "training",
                onDelete: (e) => deleteTraining(e),
                onEdit: (e) => { setIsEdit(true); setShow(true); setInitialValue(e) },
                onSchedule:(e)=> unSchedule(e)
            }} />
        </div>
        <AddSession {...{ show, setShow, getSessionByPage, isEdit, initialValue, setInitialValue, title: isEdit ? "Update Session" : "Add Session" }} />
    </>)
}
export default Session