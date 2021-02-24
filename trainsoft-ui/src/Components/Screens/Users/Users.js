import { useState, useEffect } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Modal, Form } from 'react-bootstrap'
import { Field, Formik } from 'formik';
import { ICN_TRASH, ICN_EDIT, ICN_DOWNLOAD } from "../../Common/Icon";
import { BtnPrimary, Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput, SelectInput, TextArea } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import { BsModal } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import './style.css'
import './../Batches/batches.css'
import useFetch from "../../../Store/useFetch";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";

const User = ({ location }) => {
    const [show, setShow] = useState(false);
    const [participant,setParticipant] = useState([])
    const [file,setFile] = useState(null)
    const {response} = useFetch({
        method: "get",
        url: GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT,
        errorMsg: 'error occur on get participant'
     });

    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "empId": {
                "title": "Emp Id",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "emailId": {
                "title": "Email Id",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "phoneNumber": {
                "title": "Phone No",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "department": {
                "title": "Department",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "role": {
                "title": "Role",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            }
            ,
            "status": {
                "title": "Status",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
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

    // create new session
    const uploadParticipant = (data) => {
        try {
            RestService.UploadParticipant(data).then(resp => {
                setShow(false)
                console.log(resp)
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // initialize  component
    useEffect(() =>  response && setParticipant(response), [response])

    return (<><div className="table-shadow">
        <div className="p-3"><CardHeader {...{ location }} /></div>
        <div className="flx px-3 mb-2">
            <div className="mr-4">
                <Button>Bulk Action</Button>
                <BtnPrimary className="btn-primary ml-2">Apply</BtnPrimary>
            </div>
            <div>
                <Button>Change role to</Button>
                <BtnPrimary className="btn-primary ml-2">Apply</BtnPrimary>
            </div>

        </div>
        <DynamicTable {...{ configuration, sourceData: participant }} />
    </div>
        <div className="table-footer-action">
            <div>
                <Button className="mr-3" onClick={() => setShow(true)}><span className="mr-1">{ICN_DOWNLOAD}</span>  Report </Button>
                <Button onClick={() => setShow(true)}> + Add New </Button>

                <BsModal {...{ show, setShow, headerTitle: "Add new User", size: "lg" }}>
                    <div className="form-container">
                        <Formik
                            onSubmit={(value) => console.log('')}
                            initialValues={{
                                name: '',
                                empId: '',
                                emailId: '',
                                phoneNo: '',
                                department: '',
                                role: '',
                                password: '',
                                level: '',
                                upload:''
                            }}
                        >
                            {({ handleSubmit, isSubmitting, dirty }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Name" name="name" />
                                        </div>
                                        <div className="col-6">
                                            <TextInput label="Emp Id" name="empId" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Email Id" name="emailId" />
                                        </div>
                                        <div className="col-6">
                                            <TextInput label="Phone No" name="phoneNo" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <SelectInput label="Department" name="department" option={['Account', 'It', 'Human Resource']} />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Role" name="role" option={['Admin', 'Learner', 'Instructor']} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Password" name="password" />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Role" name="role" option={['Batch Mgmt', 'Course Mgmt', 'User Mgmt']} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <div className="title-sm">Require this user to change their password when they first sign in</div>
                                        </div>
                                        <div className="col-6">
                                            <div>Upload bulk users</div> <div><Field name="upload"  placeholder="Browse File" onChange={(e)=> {console.log(e.target.files[0]); uploadParticipant(e.target.files[0])}} type="file"/></div>
                                        </div>
                                    </Form.Group>
                                </div>
                                {/* modal footer which contains action button to save data or cancel current action */}
                                <footer className="jcb">
                                    <div>
                                    </div>
                                    <div>
                                        <Button type="submit" >Add</Button>
                                    </div>
                                </footer>
                            </form>
                            }
                        </Formik>
                    </div>
                </BsModal>
            </div>
        </div>
    </>)
}


const Users = () => {
    return (
        <Router>
            <User path="/" />
        </Router>
    )
}
export default Users