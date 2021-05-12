import { useContext, useState } from "react"
import { Formik } from "formik"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { DateInput, TextArea, TextInput, TimeInput } from "../../../Common/InputField/InputField"
import RestService from "../../../../Services/api.service"
import useToast from "../../../../Store/ToastHook"
import TrainingContext from "../../../../Store/TrainingContext"
// import { UploadAttachments } from "../../../../Services/MethodFactory"
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant"
import AppContext from "../../../../Store/AppContext"
import * as Yup from 'yup';


const AddSession = ({ show, setShow, getSessionByPage, isEdit, initialValue }) => {
    const { user, spinner } = useContext(AppContext)
    const { training } = useContext(TrainingContext)
    const Toast = useToast()
    const [title, setTitle] = useState('')

    //validation
    const schema = Yup.object().shape({
        topic: Yup.string()
            .required("Required!"),
        endTime: Yup.string()
            .required("Required!"),
        startTime: Yup.string()
            .required("Required!"),
        sessionDate: Yup.string()
            .required("Required!"),
    });


    // create Training session
    const createTrainingSession = (data) => {
        try {
            spinner.show();
            let endTime = setTimes(data.sessionDate, data.endTime)
            let startTime = setTimes(data.sessionDate, data.startTime)
            let payload = {
                "agenda": data.agenda,
                "topic": data.topic,
                "assets": data.assets,
                "courseSid": training.courseSid,
                "endTime": endTime,
                "duration": (endTime - startTime) / (1000 * 60),
                "recording": "",
                "sessionDate": data.sessionDate,
                "startTime": startTime,
                "trainingSid": training.sid,
            }
            payload.status = "ENABLED"
            RestService.CreateTrainingSession(payload).then(res => {
                Toast.success({ message: `Agenda is Successfully Created` });
                getSessionByPage()
                setShow(false)
                spinner.hide();
             }, err => { console.log(err); spinner.hide(); }
            );
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on createTrainingSession', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    // edit Training session
    const editTrainingSession = (data) => {
        try {
            spinner.show();
            let meetingId = data.meetingInfo ? data.meetingInfo.meetingId : null
            let endTime = setTimes(data.sessionDate, data.endTime)
            let startTime = setTimes(data.sessionDate, data.startTime)
            let val = data
            val.agenda = data.agenda
            val.topic = data.topic
            val.assets = data.assets
            val.courseSid = training.courseSid
            val.duration = (endTime - startTime) / (1000 * 60)
            val.trainingSid = training.sid
            val.endTime = endTime
            val.startTime = startTime
            val.meetingInfo = data.meetingInfo ? JSON.stringify(data.meetingInfo) : null
            RestService.editTrainingSession(val,meetingId).then(res => {
                Toast.success({ message: `Session updated successfully ` });
                getSessionByPage()
                setShow(false)
                spinner.hide();
            }, err => { console.log(err); spinner.hide(); }
            );
        }
        catch (err) {
            spinner.show();
            console.hide('error occur on editTrainingSession', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    const setTimes = (date, timeDate) => {
        let val = new Date(date)
        let times = new Date(timeDate)
        val.setHours(times.getHours(), times.getMinutes(), times.getSeconds())
        return val.getTime()
    }

    // upload attachment
    const UploadAttachmentsAPI = async (val) => {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            for (let i = 0, l = val.length; i < l; i++)
                data.append("files", val[i])
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                let response = null;
                try {
                    response = JSON.parse(this.responseText);
                } catch (err) {
                    response = this.responseText
                }
                if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
                    resolve([response, this.status, this.getAllResponseHeaders()]);
                } else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
                    reject([response, this.status, this.getAllResponseHeaders()]);
                }
            });
            xhr.open("POST", GLOBELCONSTANT.TRAINING.UPLOAD_ASSETS);
            xhr.send(data);
        })
    }
    /** upload attachments file
    *   @param {Object} file = selected files
    *   @param {string} token = user auth token 
    *   @param {string} bucketName = bucket name 
    */
    const uploadAttachments = async (
        file,
        setFieldValue
    ) => {
        try {
            spinner.show();
            let data = await UploadAttachmentsAPI(file);
            setFieldValue("assets", JSON.stringify(data[0]))
            spinner.hide();
            Toast.success({ message: `Assets is successfully uploaded ` });
        } catch (err) {
            spinner.hide();
            Toast.error({ message: `Something Went Wrong` });
            console.error("Exception occurred in uploadAttachments -- ", err);
        }
    }

    return (<>
        <BsModal {...{ show, setShow, headerTitle: title, size: "lg" }}>
            <div className="">
                <div>
                    <Formik
                        initialValues={!isEdit ? {
                            agenda: '',
                            topic: "",
                            assets: "",
                            endTime: '',
                            sessionDate: '',
                            startTime: '',
                        } : initialValue}
                        onSubmit={(value) => { !isEdit ? createTrainingSession(value) : editTrainingSession(value); }}
                        validationSchema={schema}
                    >
                        {({ handleSubmit, setFieldValue, isValid }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        {!isEdit && <TextInput name="topic" label="Agenda" />}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <TextArea name="agenda" label="Description" />
                                    </div>

                                    <div className="col-md-4 ">
                                        <DateInput name="sessionDate" label="Start date" />
                                    </div>
                                    <div className="col-md-4">
                                        <TimeInput name="startTime" placeholder="Select Time" label="Start Time" />
                                    </div>
                                    <div className="col-md-4">
                                        <TimeInput name="endTime" placeholder="Select Time" label="End Time" />
                                    </div>
                                    <div className="col-md-12">
                                      {/* <TextInput name="assets" label="Assets" /> */}
                                    {<div className="col-6 pl-0">
                                        <div><span className="title-sm ">Assets</span></div> <div><input multiple placeholder="Browse File" onChange={(e) => { uploadAttachments(e.target.files, setFieldValue) }} type="file" /></div>
                                    </div>
                                    }
                                    </div>
                                </div>
                                <div>
                                    <Button className="btn-block py-2 mt-3" disabled={!isValid} type="submit">Confirm</Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </BsModal>
    </>)
}
export default AddSession