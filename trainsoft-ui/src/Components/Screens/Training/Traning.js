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

const Trainings = ({ location }) => {
    const { setTraining } = useContext(TrainingContext)
    const Toast = useToast()
    const { course, batches,spinner, user } = useContext(AppContext)
    const [show, setShow] = useState(false);
    const [trainingList, setTrainingList] = useState([])

    const { response } = useFetch({
        method: "get",
        url: GLOBELCONSTANT.TRAINING.GET_TRAINING,
        errorMsg: 'error occur on get training'
    });

    const queueDropdownProps = {
        selectItems: batches,
        label: 'name',
        placeholder: "Batches Select",
        selectAllLabel: "Select All",
        filterPlaceholder: "",
        className: "",
        dataNotFound: "No result Found",
    }

    // set training list
    useEffect(() => {
        setTrainingList(response)
    }, [response])
    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Training Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link onClick={()=>setTraining(data)} to={`training-details`} state={{ title: 'TRAINING', rowData:data, subTitle: "Training Info", subPath: '/' }} className="dt-name">{data.name}</Link>

            },
            "noOfBatches": {
                "title": "No of Batches",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "course": {
                "title": "Course",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "instructor": {
                "title": "Instructor",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            }
            ,
            "startDate": {
                "title": "Start Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.startDate).format('Do MMMM YYYY')

            }
            ,
            "endDate": {
                "title": "End Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.endDate).format('Do MMMM YYYY')

            }
            ,
            "status": {
                "title": "Status",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => data.status === "ENABLED" ? 'Active' : 'Not Activate'
            }

        },
        headerTextColor: '#454E50', // user can change table header text color
        sortBy: null,  // by default sort table by name key
        sortDirection: false, // sort direction by default true
        updateSortBy: (sortKey) => {
            configuration.sortBy = sortKey;
            Object.keys(configuration.columns).map(key => configuration.columns[key].sortDirection = (key === sortKey) ? !configuration.columns[key].sortDirection : false);
            configuration.sortDirection = configuration.columns[sortKey].sortDirection;
            setConfiguration({ ...configuration });
        },
        actions: [
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                "onClick": (data, i) => console.log(data)
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data, i) => console.log(data)
            }
        ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: true,
        clearSelection: false
    });

    // get all course list
    const createTraining = (data) => {
        try {
            spinner.show()
            let batcheId= data.trainingBatchs.map(resp=> {
                return ( { batchSid: resp.sid })
            })
            let payload = data
                payload.courseSid = data.courseSid.sid
                payload.trainingBatchs = batcheId
                payload.status = "ENABLED"

            RestService.createTraining(payload).then(res => {
                setTrainingList([...trainingList, res.data])
                spinner.hide()
                Toast.success({ message: `Course is Successfully Created` });
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

        <div className="table-shadow">
            <div className="p-3"><CardHeader {...{ location }} /></div>
            <DynamicTable {...{ configuration, sourceData: trainingList && trainingList.slice().reverse() }} />
        </div>
        <div className="table-footer-action ">
            <div>
                {user.role === 'admin' &&<>
                <Button> Report </Button>
                <Button onClick={() => setShow(true)} className="ml-4" > + Add New </Button>
                </>}
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
                                initialValues={{
                                    name: '',
                                    instructorName: '',
                                    courseSid: '',
                                    startDate: '',
                                    endDate: '',
                                    trainingBatchs:''
                                }}
                            >
                                {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => <form onSubmit={handleSubmit} className="create-batch" >
                                    <div className="edit-shipping">
                                        <Form.Group className="row">
                                            <div className="col-6">
                                                <TextInput label="Training Name" name="name" />
                                            </div>
                                            <div className="col-6">
                                            {/* <Form.Label className="label">{}</Form.Label>
                                                <div className="input-wrapper">
                                                    <div className="input-field">
                                                        <MultiSelect
                                                        dataSet={queueDropdownProps}
                                                        onSelect={(data) => setFieldValue(data)}
                                                            checked={false}
                                                            selectAllMsg="All Queue"
                                                            initialData = {[]}
                                                        />
                                                    </div>
                                                    <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
                                                </div> */}

                                                <MultiSelectInput label="Select Batch(s)" bindKey="name" option={batches} name="trainingBatchs" />
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
                                                <SelectInput label="Course" bindKey="name" payloadKey="sid"   name="courseSid" option={course} />
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
                                            <Button type="submit" >Create</Button>
                                        </div>
                                    </footer>
                                </form>
                                }
                            </Formik>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        </div>
    </>)
}

const Training = () => {
    return (
       <TrainingProvider>
        <Router>
            <Trainings path="/" />
            <TrainingDetails path="training-details/*" />
        </Router>
     </TrainingProvider>
    )

}
export default Training