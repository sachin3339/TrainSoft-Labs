import { useState, useEffect } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Form } from 'react-bootstrap'
import { Formik } from 'formik';
import { ICN_TRASH, ICN_EDIT, ICN_CLOSE } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput, SelectInput } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import BatchesDetails from "./BatchDetails";
import { BsModal } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import './batches.css'
import * as Yup from 'yup';
import moment from 'moment'
import useToast from "../../../Store/ToastHook";
import { set } from "lodash";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import useFetch from "../../../Store/useFetch";



const Batch = ({location}) => {
    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [batchList,setBatchList] = useState([])
    let {response} = useFetch({
        method: "get",
        url: GLOBELCONSTANT.BATCHES.GET_BATCH_LIST,
        errorMsg: 'error occur on get Batches'
     });

    const schema = Yup.object().shape({
        name: Yup.string()
        .min(2, 'Too Short!')
        .required("Required!"),
      });

    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Batch Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link to={'batches-details'} state={{path: 'batches-details',title: 'BATCHES',subTitle:"Batch Details"}} className="dt-name">{data.name}</Link>

            },
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
            "createdOn": {
                "title": "Created Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.createdOn).format('Do MMMM YYYY')
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
    // create batches
    const createBatch = (data)=>{
        try{
            let payload = {
                "name": data.name,
                "status": "ENABLED",
                "trainingType": "INSTRUCTOR_LED",
            }
            RestService.CreateBatch(payload).then(res => {
                   setBatchList([...batchList,res.data])
                   Toast.success({ message: `Batch is Successfully Created`});
                   setShow(false) 
                }, err => console.log(err)
            ); 
        }
        catch(err){
            console.error('error occur on getAllCourse',err)
        }
    }
    
    useEffect(() => {
         setBatchList(response)
    }, [response])



    return (<><div className="table-shadow">
           <div className="p-3"><CardHeader {...{location}}/></div> 
       {batchList && batchList.length > 0 &&  <DynamicTable {...{ configuration, sourceData: batchList.slice().reverse() }} />}
    </div>
    <div className="table-footer-action">
            <div>
                <Button onClick={() => setShow(true)}> + Add New </Button>
                <BsModal {...{ show, setShow, headerTitle: "Add new Batches", size: "lg" }}>
                    <div className="form-container">
                        <Formik
                            onSubmit={(value)=>createBatch(value)}
                            initialValues={{
                                name:'',
                                trainingType:''
                            }}
                            validationSchema={schema}
                        >
                            {({ handleSubmit, isSubmitting, dirty }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Batch Name" name="name" />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Training Type" option={['INSTRUCTOR_LED', 'Self', 'Offline']} name="trainingType" />
                                        </div>
                                    </Form.Group>
                                  
                                </div>
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


const Batches = () => {
    return (
        <Router>
            <Batch path="/"/>
            <BatchesDetails path="batches-details" />
        </Router>
    )
}
export default Batches