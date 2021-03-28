import React, { useState, useEffect,useContext } from 'react'
import { Formik } from "formik"
import { BsModal } from "../../Common/BsUtils"
import { Button } from "../../Common/Buttons/Buttons"
import { TextArea } from "../../Common/InputField/InputField"
import CardHeader from '../../Common/CardHeader'
import { TextInput } from '../../Common/InputField/InputField'
import SessionList from '../../Common/SessionList/SessionList'
import RestService from '../../../Services/api.service'
import useFetch from '../../../Store/useFetch'
import GLOBELCONSTANT from '../../../Constant/GlobleConstant'
import useToast from "../../../Store/ToastHook";
import * as Yup from 'yup';
import AppContext from '../../../Store/AppContext'


const CourseDetails = ({ location }) => {
    const { user, spinner } = useContext(AppContext)
    const [isEdit,setIsEdit] = useState(false)
    const [initialValues,setInitialValue] = useState()

    const Toast = useToast();
    const [show, setShow] = useState(false)
    const [sessionList, setSessionList] = useState([])

     const schema = Yup.object().shape({
        topicDescription: Yup.string()
        .min(2, 'Too Short!')
        .required("Required!"),
        topicName:Yup.string()
        .min(2, 'Too Short!')
        .required("Required!"),
      });
      
      // get All session
      const getSession = async (pagination = "1") => {
        try {
            spinner.show();
            RestService.getCourseSession(location.state.sid).then(
                response => {
                    setSessionList(response.data);
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

          // get All session
          const getSessionByPage = async (pagination = "1") => {
            try {
                let pageSize = 10;
                spinner.show();
                RestService.getCourseSessionByPage(location.state.sid,pageSize,pagination).then(
                    response => {
                        setSessionList(response.data);
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

    // create new session
    const createSession = (data) => {
        try {
            spinner.show();
            let payload = {
                "courseSid": location.state.sid,
                "topicDescription": data.topicDescription,
                "topicName": data.topicName
            }
         
            RestService.CreateSession(payload).then(res => {
                setShow(false)
                setSessionList([...sessionList,res.data])
                Toast.success({ message: `Topic is Successfully Created`});
                spinner.hide();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // create new session
    const editSession = (data) => {
        try {
            spinner.show();
            let payload = {
                "sid": data.sid,
                "courseSid": data.courseSid,
                "topicDescription": data.topicDescription,
                "topicName": data.topicName
            }
         
            RestService.updateSession(payload).then(res => {
                getSessionByPage()
                setShow(false)
                spinner.hide();
                Toast.success({ message: `Topic is Successfully Updated`});
            }, err =>  spinner.hide()
            );
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on createCourse', err)
        }
    }
    

    // search session
     const searchSession = (name)=> {
        try{
            spinner.show();
            RestService.searchSession(name).then(res => {
                     setSessionList(res.data)
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

        // search session
        const deleteSession = (sid)=> {
            try{
                spinner.show();
                RestService.deleteSession(sid).then(res => {
                    getSessionByPage()
                        spinner.hide();
                    }, err => {
                        spinner.hide();
                    }
                ); 
            }
            catch(err){
                console.error('error occur on deleteSession()',err)
                spinner.hide();
            }
        }



    return (<>
        <div className="table-shadow p-3">
        <CardHeader {...{ location, 
               onChange: (e) => e.length === 0 && getSessionByPage(),
               onEnter:(e)=> console.log(e)
         }} >
             <Button className="btn-block ml-2" onClick={() => {setShow(true); setIsEdit(false)}}>+ Add Session</Button>

             </CardHeader>
             
            <SessionList {...{ sessionList:sessionList.slice().reverse(),
                 onDelete:(e)=> deleteSession(e),
                 onEdit: (data)=> {setIsEdit(true);setShow(true);setInitialValue(data) }}} 
            />
            <div className="full-w mt-2"></div>
            <BsModal {...{ show, setShow, headerTitle: "Add Topic", size: "lg" }}>
                <div className="">
                    <div>
                        <Formik
                            initialValues={
                                !isEdit ?{"topicName": '',"topicDescription": '', }
                                : initialValues }
                            validationSchema={schema}
                            onSubmit={(values) => {!isEdit ? createSession(values): editSession(values)}}>
                            {({ handleSubmit }) => (<>
                                <form onSubmit={handleSubmit}>
                                    <TextInput name="topicName" label="Topic Name" />
                                    <TextArea name="topicDescription" label="Description" />
                                    <div className="text-right mt-2">
                                        <Button type="submit" className=" px-4">Add </Button>
                                    </div>
                                </form>
                            </>)}

                        </Formik>
                    </div>
                </div>
            </BsModal>
        </div>
    </>)
}
export default CourseDetails