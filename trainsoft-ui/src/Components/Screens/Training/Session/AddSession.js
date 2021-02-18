import { Formik } from "formik"
import { useState } from "react"
import { BsModal } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import { TextArea } from "../../../Common/InputField/InputField"

const AddSession = ({ show, setShow }) => {
    const [title, setTitle] = useState('')
    const [isConform, setIsConform] = useState(false)
    return (<>
        <BsModal {...{ show, setShow, headerTitle: title, size: "lg" }}>
            <div className="">
                {!isConform && <div>
                    <Formik
                        initialValues={{
                            agenda: '',
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <TextArea name="agenda" label="Agenda" />
                            </form>
                        )}
                    </Formik>
                    <div className="row my-3">
                        <div className="col-md-3">
                            <div><span className="title-sm">Session Date: </span><span>07/07/2021</span></div>
                        </div>
                        <div className="col-md-3">
                            <div><span className="title-sm">Start Time: </span><span>10:02 PM</span></div>

                        </div>
                        <div className="col-md-3">
                            <div><span className="title-sm">End Time: </span><span>12:02 AM</span></div>

                        </div>

                    </div>
                    <Button className="btn-block py-2" onClick={() => { setTitle("Session preview"); setIsConform(true) }}>Conform</Button>
                </div>}
                {isConform && <div className="jcc"><div className="session-modal-container">
                    <div className="row">
                        <div className="col-6 mb-2">
                            <div className="title-sm">Agenda</div>
                            <div>ML_B1_C12</div>
                        </div>
                        <div className="col-6  mb-2">
                            <div className="title-sm">Date</div>
                            <div>12/10/17</div>
                        </div>
                        <div className="col-6  mb-2">
                            <div className="title-sm">Start Time</div>
                            <div>14:13PM</div>
                        </div>
                        <div className="col-6">
                            <div className="title-sm">End TIme</div>
                            <div>12:30</div>
                        </div>
                        <div className="col-6  mb-2">
                            <div className="title-sm">Course</div>
                            <div>Angular</div>
                        </div>
                        <div className="col-6  mb-2">
                            <div className="title-sm">Instructor</div>
                            <div>Jack A</div>
                        </div>
                        <div className="col-6  mb-2  ">
                            <div className="title-sm">No. of participants</div>
                            <div>12</div>
                        </div>
                    </div>
                    <div className="jcb">
                        <div><Button onClick={() => setIsConform(false)}>Back</Button></div>
                        <div><Button>Conform</Button></div>
                    </div>
                </div>
                </div>}
            </div>
        </BsModal>
    </>)
}
export default AddSession