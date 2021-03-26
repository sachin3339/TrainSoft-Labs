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
    const [instructor,setInstructor] = useState([])

     // get all training
  const getAllInstructor = async () => {
    try {
        spinner.show();
        RestService.getAllUserByPage("INSTRUCTOR",1,200).then(
            response => {
                let val = response.data.map(res=> {
                    let data = res.appuser
                    data.role = res.departmentVA ? res.departmentVA.departmentRole : ''
                    data.department = res.departmentVA ? res.departmentVA.department.name : ''
                    data.vSid = res.sid
                    return data
                })
                setInstructor(val)
            },
            err => {
                spinner.hide();
            }
        ).finally(() => {
            spinner.hide();
        });
    } catch (err) {
        console.error("error occur on getAllInstructor()", err)
    }
}

        // editTraining
        const editTraining = (data) => {
            try {
                spinner.show()
                let batcheId = data.trainingBatchs.map(resp => {
                    return ({ batchSid: resp.sid })
                })
                let payload = data
                payload.courseSid = data.courseSid.sid
                payload.instructor = {"sid":data.instructor.vSid}
                payload.trainingBatchs = batcheId
                payload.instructorName = data.instructor.name
                payload.status = "ENABLED"
                RestService.editTraining(payload).then(res => {
                    getTrainings()
                    spinner.hide()
                    setShow(false)
                    Toast.success({ message: `Training update successfully` });
                }, err => {
                    spinner.hide()
                    console.error(err)
                }
                )}
            catch (err) {
                spinner.hide()
                console.error('error occur on changeStatus', err)
                Toast.error({ message: `Something wrong!!` });
            }
        }

        // get all course list
        const createTraining = (data) => {
            try {
                spinner.show()
                let batcheId = data.trainingBatchs.map(resp => {
                    return ({ batchSid: resp.sid })
                })
                let payload = data
                payload.courseSid = data.courseSid.sid
                payload.instructor = {"sid":data.instructor.vSid}
                payload.trainingBatchs = batcheId
                payload.instructorName = data.instructor.name
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

        useEffect(() => {
            getAllInstructor()
        }, [])
    return (<>
                    <Modal
                        size="lg"
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Body className="px-5 py-4">
                            <div className="jcb mb-3">
                                <div className="title-md ">{isEdit ? "Update" : 'Add'} Training</div>
                                <div><div className="circle-md" onClick={() => setShow(false)}>
                                    {ICN_CLOSE}
                                </div>
                                </div>
                            </div>
                            <div className="form-container">
                                <Formik
                                    onSubmit={(value)=>{!isEdit ? createTraining(value) : editTraining(value)}}
                                    initialValues={initialValues}
                                >
                                    {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => <form onSubmit={handleSubmit} className="create-batch" >
                                        <div className="edit-shipping">
                                            <Form.Group className="row">
                                                <div className="col-6">
                                                    <TextInput label="Training Name" name="name" />
                                                </div>
                                                <div className="col-6">
                                                    <MultiSelectInput  label="Select Batch(s)" footerAction={true}  bindKey="name" option={batches} name="trainingBatchs" />
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
                                                    <SelectInput label="Course" bindKey="name" value={course.find(res=>res.sid === values.courseSid)} payloadKey="sid" name="courseSid" option={course} />
                                                </div>
                                                <div className="col-6">
                                                <SelectInput label="Instructor" bindKey="name" payloadKey="sid" name="instructor" option={instructor} />
                                            </div>
                                            </Form.Group>
                                        </div>
                                        {/* modal footer which contains action button to save data or cancel current action */}
                                        <footer className="jcb">
                                            <div>
                                            </div>
                                            <div>
                                                <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
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