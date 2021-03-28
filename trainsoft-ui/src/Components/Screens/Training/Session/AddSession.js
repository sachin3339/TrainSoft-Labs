import { useContext, useState } from "react"
import { Formik } from "formik"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { DateInput, TextArea, TextInput , TimeInput } from "../../../Common/InputField/InputField"
import RestService from "../../../../Services/api.service"
import useToast from "../../../../Store/ToastHook"
import TrainingContext from "../../../../Store/TrainingContext"
// import { UploadAttachments } from "../../../../Services/MethodFactory"
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant"
import AppContext from "../../../../Store/AppContext"

const AddSession = ({ show, setShow,getSessionByPage, isEdit,initialValue }) => {
    const {user,spinner} = useContext(AppContext)
    const { training } = useContext(TrainingContext)
    const Toast = useToast()
    const [title, setTitle] = useState('')

    // create Training session
    const createTrainingSession = (data) => {
        try {
            let payload = {
                "agendaDescription": data.agendaDescription,
                "agendaName": data.agendaName,
                "assets": data.assets,
                "courseSid": training.courseSid,
                "endTime": data.endTime,
                "recording": "",
                "sessionDate": data.sessionDate,
                "startTime": data.startTime,
                "trainingSid": training.sid,
            }
            payload.status = "ENABLED"
            RestService.CreateTrainingSession(payload).then(res => {
                Toast.success({ message: `Agenda is Successfully Created` });
                getSessionByPage()
                setShow(false)
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createTrainingSession', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

        // edit Training session
        const editTrainingSession = (data) => {
            try {
                let payload = {
                    "sid":data.sid,
                    "agendaDescription": data.agendaDescription,
                    "agendaName": data.agendaName,
                    "assets": data.assets,
                    "courseSid": training.courseSid,
                    "endTime": data.endTime,
                    "recording": "",
                    "sessionDate": data.sessionDate,
                    "startTime": data.startTime,
                    "trainingSid": training.sid,
                }
                RestService.editTrainingSession(payload).then(res => {
                    Toast.success({ message: `Session updated successfully ` });
                    getSessionByPage()
                    setShow(false)
                }, err => console.log(err)
                );
            }
            catch (err) {
                console.error('error occur on editTrainingSession', err)
                Toast.error({ message: `Something wrong!!` });
            }
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
                        setFieldValue("assets",JSON.stringify(data[0]))
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
                        initialValues={!isEdit ?{
                            agendaDescription: '',
                            agendaName: "",
                            assets: "",
                            endTime: '',
                            sessionDate: '',
                            startTime: '',
                        } : initialValue}
                        onSubmit={(value)=> {!isEdit ? createTrainingSession(value) : editTrainingSession(value);}}
                      >
                        {({ handleSubmit,setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                       {!isEdit  && <TextInput name="agendaName" label="Agenda" />}
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <TextArea name="agendaDescription" label="Description" />
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
                                    {/* <TextInput name="assets"  label="Assets" /> */}

                                    {<div className="col-6 pl-0">
                                    <div><span className="title-sm ">Assets</span></div> <div><input multiple placeholder="Browse File" onChange={(e) => { uploadAttachments(e.target.files,setFieldValue) }} type="file" /></div>
                                </div>
                                }
                                    </div>
                                </div>
                                <div>
                                    <Button className="btn-block py-2 mt-3" type="submit">Confirm</Button>
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