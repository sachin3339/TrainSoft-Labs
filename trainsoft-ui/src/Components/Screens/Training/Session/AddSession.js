import { useContext, useState } from "react"
import { Formik } from "formik"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { DateInput, TextArea, TextInput , TimeInput } from "../../../Common/InputField/InputField"
import RestService from "../../../../Services/api.service"
import useToast from "../../../../Store/ToastHook"
import useFetch from "../../../../Store/useFetch"
import TrainingContext from "../../../../Store/TrainingContext"

const AddSession = ({ show, setShow,getSessionByPage, isEdit,initialValue }) => {
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
                        {({ handleSubmit }) => (
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
                                        <TextInput name="assets" label="Assets" />
                                    </div>
                                </div>
                                <div>
                                    <Button className="btn-block py-2" type="submit">Confirm</Button>
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