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
import AddEditTraining from "./AddEditTraining";
const initialVal = {
    name: '',
    instructor: '',
    courseSid: '',
    startDate: '',
    endDate: '',
    trainingBatchs: '',
    instructorName:""
}

const Trainings = ({ location }) => {
    const { setCourse,setBatches,ROLE, spinner, user } = useContext(AppContext)
    const { setTraining } = useContext(TrainingContext)
    const Toast = useToast()
    const [show, setShow] = useState(false);
    const [trainingList, setTrainingList] = useState([])
    const [isEdit,setIsEdit] = useState(false);
    const [initialValues,setInitialValue] = useState(initialVal)
    const [count,setCount] =  useState(0)
  
    // get all batches
    const allBatches = useFetch({
        method: "get",
        url: GLOBELCONSTANT.BATCHES.GET_BATCH_LIST,
        errorMsg: 'error occur on get Batches'
     });


    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Training Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link onClick={() => setTraining(data)} to={`training-details`} state={{ title: 'Training', rowData: data,sid:data.sid, subTitle: "Training Info", subPath: '/' }} className="dt-name">{data.name}</Link>

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
            },
            "startDate": {
                "title": "Start Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.startDate).format('DD/MM/YYYY')
            }
            ,
            "endDate": {
                "title": "End Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.endDate).format('DD/MM/YYYY')

            }
            ,
            "status": {
                "title": "Status",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false,
                render: (data) => <Toggle onChange={()=> user.role === ROLE.SUPERVISOR && getTrainingsBySid(data.sid,"status")} id={data.sid} checked={data.status === 'ENABLED' ? true : false} />
            },

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
       actions: user.role === ROLE.SUPERVISOR ? [
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                "onClick": (data, i) => getTrainingsBySid(data.sid,"edit")
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data) => deleteTraining(data.sid)
            }
            
        ] :[],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: true,
        clearSelection: false,
    });

// get training details by sid
    const getTrainingsBySid = async (sid, type="get") => {
        try {
            RestService.getTrainingBySid(sid).then(
                response => {
                    response && response.data && setTraining(response.data);
                    type === "status" && changeStatus(response.data)
                    if(type==="edit"){
                        let intVal = response.data                        
                         setInitialValue(intVal)
                         setShow(true)
                         setIsEdit(true)
                    }
                },
                err => {
                   console.error("",err)
                }
            )
        } catch (err) {
            console.error("error occur on getTrainings()", err)
        }
    }

    // editTraining
    const changeStatus = (data) => {
        try {
            spinner.show()
            let payload = data
            payload.status = data.status === "ENABLED" ? "DISABLED": "ENABLED"
            RestService.editTraining(payload).then(res => {
                getTrainings()
                spinner.hide()
                setShow(false)
                Toast.success({ message: `Status change successfully` });
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


    // get all training
    const getTrainings = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getAllTrainingByPage(pagination, pageSize).then(
                response => {
                    setTrainingList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getTrainings()", err)
        }
    }

    // search batches
    const searchTraining = (name) => {
        try {
            spinner.show();
            RestService.searchTraining(name).then(res => {
                setTrainingList(res.data)
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on searchTraining()', err)
            spinner.hide();
        }
    }

    // delete course
    const deleteTraining = (trainingId) => {
        try {
            spinner.show();
            RestService.deleteTraining(trainingId).then(res => {
                spinner.hide();
                getTrainings()
                Toast.success({ message: `Training is Deleted Successfully ` });
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on deleteTraining()', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

       // get training count
       const getTrainingCount = async () => {
        try {
            RestService.getCount("vw_training").then(
                response => {
                 setCount(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatch()", err)
        }
    }

    // initialize component
    useEffect(() => {
        allBatches.response && setBatches(allBatches.response)
        getTrainingCount()
        getTrainings()
    }, [])

    return (<>
        <div className="table-shadow">
            <div className="p-3">
                <CardHeader {...{
                    location,
                    onChange: (e) => e.length === 0 && getTrainings(),
                    onEnter: (e) => searchTraining(e),
                    actionClick : () => {setShow(true);setInitialValue(initialVal);setIsEdit(false)},
                    showAction: user.role === ROLE.SUPERVISOR ? true: false
                }} />
            </div>

            <AddEditTraining {...{getTrainings, show, setShow,initialValues,isEdit }}/>
            <DynamicTable {...{count, configuration, sourceData: trainingList && trainingList.slice().reverse(), onPageChange: (e) => getTrainings(e) }} />
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




