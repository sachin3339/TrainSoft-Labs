import { useState, useContext, useEffect } from "react";
import '../Batches/batches.css'
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Modal, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import { ICN_TRASH, ICN_EDIT, ICN_CLOSE } from '../../Common/Icon';
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput, SelectInput, MultiSelectInput } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import TrainingDetails from "./TrainingDetails";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import useFetch from "../../../Store/useFetch";
import useToast from "../../../Store/ToastHook";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import TrainingContext, { TrainingProvider } from "../../../Store/TrainingContext";
import { Toggle } from "../../Common/BsUtils";

const AddEditTraining = ({ show, setShow ,getTrainings,initialValues, isEdit}) => {
    const Toast = useToast()
    const { course, batches, spinner, user } = useContext(AppContext)
    
        // get all course list
        const createTraining = (data) => {
            try {
                spinner.show()
                let batcheId = data.trainingBatchs.map(resp => {
                    return ({ batchSid: resp.sid })
                })
                let payload = data
                payload.courseSid = data.courseSid.sid
                payload.trainingBatchs = batcheId
                payload.status = "ENABLED"
                RestService.createTraining(payload).then(res => {
                    Toast.success({ message: `Training is Successfully Created` });
                    getTrainings()
                    spinner.hide()
                    setShow(false)
                }, err => {
                    spinner.hide()
                    console.error(err)
                }
                );
            }
            catch (err) {
                spinner.hide()
                console.error('error occur on createTraining', err)
                Toast.error({ message: `Something wrong!!` });
            }
        }
    return (<>
    {
        console.log(initialValues)
    }
                    <Modal
                        size="lg"
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Body className="px-5 py-4">
                            <div className="jcb mb-3">
                                <div className="title-md ">Add Training</div>
                                <div><div className="circle-md" onClick={() => setShow(false)}>
                                    {ICN_CLOSE}
                                </div>
                                </div>
                            </div>
                            <div className="form-container">
                                <Formik
                                    onSubmit={createTraining}
                                    initialValues={initialValues}
                                >
                                    {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => <form onSubmit={handleSubmit} className="create-batch" >
                                        <div className="edit-shipping">
                                            <Form.Group className="row">
                                                <div className="col-6">
                                                    <TextInput label="Training Name" name="name" />
                                                </div>
                                                <div className="col-6">
                                                    <MultiSelectInput label="Select Batch(s)" footerAction={true}  bindKey="name" option={batches} name="trainingBatchs" />
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="row">
                                                <div className="col-6">
                                                    <DateInput label="Start Date" name="startDate" setFieldValue={setFieldValue} values={values} />
                                                </div>
                                                <div className="col-6">
                                                    <DateInput label="End date" name="endDate" setFieldValue={setFieldValue} values={values} />
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="row">
                                                <div className="col-6">
                                                    <SelectInput label="Course" bindKey="name" payloadKey="sid" name="courseSid" option={course} />
                                                </div>
                                                <div className="col-6">
                                                    <TextInput label="Instructor" name="instructorName" />
                                                </div>
                                            </Form.Group>
                                        </div>
                                        {/* modal footer which contains action button to save data or cancel current action */}
                                        <footer className="jcb">
                                            <div>
                                            </div>
                                            <div>
                                                <Button type="submit">Create</Button>
                                            </div>
                                        </footer>
                                    </form>
                                    }
                                </Formik>
                            </div>

                        </Modal.Body>
                    </Modal>
    </>)
}


export default AddEditTraining