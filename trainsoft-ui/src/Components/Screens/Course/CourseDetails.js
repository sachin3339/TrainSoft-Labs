import React, { useState, useEffect } from 'react'
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


const CourseDetails = ({ location }) => {
    const [show, setShow] = useState(false)
    const [sessionList, setSessionList] = useState([])
    const {response} = useFetch({
        method: "get",
        url: GLOBELCONSTANT.COURSE.GET_COURSE_SESSION + location.state.sid,
        errorMsg: 'error occur on get session'
     });

    // create new session
    const createSession = (data) => {
        try {
            let payload = {
                "courseSid": location.state.sid,
                "topicDescription": data.topicDescription,
                "topicName": data.topicName
            }
         
            RestService.CreateSession(payload).then(res => {
                setShow(false)
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // initialize data when component load
    useEffect(() => {
        response && setSessionList(response)
    }, [response])

    return (<>
        <div className="table-shadow p-3">
            <CardHeader {...{ location }} />
            <SessionList {...{ sessionList }} />
            <div className="full-w mt-2"><Button className="btn-block" onClick={() => setShow(true)}>+ Add Session</Button></div>
            <BsModal {...{ show, setShow, headerTitle: "Add Topic", size: "lg" }}>
                <div className="">
                    <div>
                        <Formik
                            initialValues={{
                                "topicName": '',
                                "topicDescription": '',
                            }}
                            onSubmit={(values) => createSession(values)}>
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