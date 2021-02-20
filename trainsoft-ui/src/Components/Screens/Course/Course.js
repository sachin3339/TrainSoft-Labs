import { useState } from "react";
import './../Batches/batches.css'
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Modal, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import { ICN_TRASH, ICN_EDIT, ICN_CLOSE } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput, SelectInput } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import { BsModal } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import CourseDetails from "./CourseDetails";



const dummyData = [
    { course: 'Angular', batchName: 'ITU_01', createdData: '22 june 2020', learners: '333', status: 'Active', startDate: '123213', endDate: '323213' },
    { course: 'Angular', batchName: 'ITU_01', createdData: '22 june 2020', learners: '333', status: 'Active', startDate: '123213', endDate: '323213' },
    { course: 'Angular', batchName: 'ITU_01', createdData: '22 june 2020', learners: '333', status: 'Active', startDate: '123213', endDate: '323213' },
    { course: 'Angular', batchName: 'ITU_01', createdData: '22 june 2020', learners: '333', status: 'Active', startDate: '123213', endDate: '323213' },
    { course: 'Angular', batchName: 'ITU_01', createdData: '22 june 2020', learners: '333', status: 'Active', startDate: '123213', endDate: '323213' },

]

const createBatches = {
    batchName: '',
    trainingType: '',
    endDate: '',
    startDate: '',
    course: '',
    instructor: ''

}
const Courses = ({location}) => {
    const [show, setShow] = useState(false);
    const [configuration, setConfiguration] = useState({
        columns: {
            "course": {
                "title": "Course Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link to={'course-details'} state={{title: "COURSE",subTitle:'Course Details',}} className="dt-name">{data.course}</Link>

            },
            "batchName": {
                "title": "Batch Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            }
            ,
            "createdDate": {
                "title": "Created Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            }
            ,
            "learner": {
                "title": "learners",
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
            ,
            "startDate": {
                "title": "Start Date",
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
    return (<><div className="table-shadow">
        <div className="p-3"><CardHeader {...{location}}/></div> 
        <DynamicTable {...{ configuration, sourceData: dummyData }} />
    </div>
        <div className="table-footer-action">
            <div>
                <Button onClick={() => setShow(true)}> + Add New </Button>
                <BsModal {...{ show, setShow, headerTitle: "Add new Batches", size: "lg" }}>
                    <div className="form-container">
                        <Formik
                            onSubmit={() => console.log('a')}
                            initialValues={createBatches}
                        >
                            {({ handleSubmit, isSubmitting, dirty }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div className="edit-shipping">
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Batch Name" name="batchName" />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Training Type" option={['Online', 'Self', 'Offline']} name="trainingType" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <DateInput label="Start Date" name="startDate" />
                                        </div>
                                        <div className="col-6">
                                            <DateInput label="End date" name="endDate" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <SelectInput label="Course" name="course" option={['Online', 'Self', 'Offline']} />
                                        </div>
                                        <div className="col-6">
                                            <TextInput label="Instructor" name="instructor" />
                                        </div>
                                    </Form.Group>
                                </div>
                                {/* modal footer which contains action button to save data or cancel current action */}
                                <footer className="jcb">
                                    <div>
                                        <span className="title-sm">Upload participants</span>
                                    </div>
                                    <div>
                                        <Button type="submit" >Create Batches</Button>
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


const Course = () => {
    return (
        <Router>
            <Courses path="/" />
            <CourseDetails path="course-details"/>
        </Router>
    )
}
export default Course