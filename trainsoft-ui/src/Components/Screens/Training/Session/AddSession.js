import { useState,useContext } from "react"
import { Formik } from "formik"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { DateInput, TextArea, TextInput } from "../../../Common/InputField/InputField"
import moment from 'moment'
import TrainingContext from "../../../../Store/TrainingContext";
import RestService from "../../../../Services/api.service"
import useToast from "../../../../Store/ToastHook"
import useFetch from "../../../../Store/useFetch"

const AddSession = ({ show, setShow }) => {
    const Toast = useToast()
    const trainingContext = useContext(TrainingContext)
    const [title, setTitle] = useState('')
    const [isConform, setIsConform] = useState(false)

        // create Training session
        const createTrainingSession = (data)=>{
            try{
                let payload = {
                "description": data.description,
                "name": data.name,
                "status": "ENABLED",
                }
                RestService.CreateSession(payload).then(res => {
                      Toast.success({ message: `Course is Successfully Created`});
                       setShow(false) 
                    }, err => console.log(err)
                ); 
            }
            catch(err){
                console.error('error occur on createCourse',err)
                Toast.error({ message: `Something wrong!!`});
            }
        }
    return (<>
        <BsModal {...{ show, setShow, headerTitle: title, size: "lg" }}>
            <div className="">
                {!isConform && <div>
                    <Formik
                        initialValues={{
                            agendaDescription: '',
                            agendaName: "",
                            assets: "",
                            endTime: '',
                            sessionDate: '',
                            startTime: '',
                        }}
                        onSubmit={createTrainingSession}
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                <div className="col-md-12">
                                         <TextInput name="agendaName" label="Agenda" />
                                    </div>
                                    <div className="col-md-12">
                                         <TextArea name="agendaDescription" label="Description" />
                                    </div>
                                   
                                    <div className="col-md-4 mt-2">
                                         <DateInput name="sessionDate"  label="Agenda" />
                                    </div>
                                    <div className="col-md-4">
                                         <DateInput name="startTime" placeholder="Select Time" label="Start Time" />
                                    </div>
                                    <div className="col-md-4">
                                         <DateInput name="endTime" placeholder="Select Time" label="End Time" />
                                    </div>
                                    <div className="col-md-12">
                                         <TextInput name="endTime" label="Assets" />
                                    </div>
                                </div>
                                <div>

                                </div>
                            </form>
                        )}
                    </Formik>
                    <Button className="btn-block py-2" onClick={() => { setTitle("Session preview"); setIsConform(true) }}>Conform</Button>
                </div>}
            </div>
        </BsModal>
    </>)
}
export default AddSession