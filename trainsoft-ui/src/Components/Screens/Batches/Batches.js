import { useState, useEffect, useContext } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Form } from 'react-bootstrap'
import { Formik} from 'formik';
import {  ICN_EDIT,  ICN_DELETE } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, SelectInput } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import BatchesDetails from "./BatchDetails";
import { BsModal, Toggle } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import * as Yup from 'yup';
import moment from 'moment'
import useToast from "../../../Store/ToastHook";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import AppContext from "../../../Store/AppContext";
import { getAllBatches } from "../../../Services/service";
import './batches.css'




const initialVal = {}
const Batch = ({ location }) => {
    const { user, spinner, setBatches, ROLE } = useContext(AppContext)
    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [batchList, setBatchList] = useState([])
    const [initialValue, setInitialValue] = useState(initialVal)
    const [isEdit, setIsEdit] = useState(false)
    const [count, setCount] = useState(0)
    const [isBatch,setIsBatch] = useState(false)


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
                render: (data) => <Link to={'batches-details'} state={{ path: 'batches-details', sid: data.sid, row: data, title: 'Batches', subTitle: "Batch Details" }} className="dt-name">{data.name}</Link>

            },
            "noOfLearners": {
                "title": "learners",
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
                render: (data) => moment(data.createdOn).format('DD/MM/YYYY')
            },
            "status": {
                "title": "Status",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false,
                render: (data) => <Toggle id={data.sid} onChange={() => { getBatchBySid(data.sid, true); setIsEdit(false) }} checked={data.status === 'ENABLED' ? true : false} />
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
                "onClick": (data) => { getBatchBySid(data.sid); setIsEdit(true); }
            },
            {
                "title": "Delete",
                "icon": ICN_DELETE,
                "onClick": (data) => deleteBatches(data.sid)
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



    // upload attachment
    const UploadAttachmentsAPI = async (val) => {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            for (let i = 0, l = val.file.length; i < l; i++)
                data.append("file", val.file[i])
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                let response = null;
                try {
                    response = JSON.parse(this.responseText);
                } catch (err) {
                    response = this.responseText
                }
                if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
                    resolve([response, this.status, this.getAllResponseHeaders()]);
                } else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
                    reject([response, this.status, this.getAllResponseHeaders()]);
                }
            });
            xhr.open("POST", GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT);
            xhr.setRequestHeader("batchName", val.name);
            xhr.setRequestHeader("trainingType", val.trainingType);
            xhr.setRequestHeader("Authorization", user.jwtToken);
            val.file.length> 0 ? xhr.send(data) : xhr.send()
        })
    }

    /** upload attachments file
*   @param {Object} file = selected files
*   @param {string} token = user auth token 
*   @param {string} bucketName = bucket name 
*/
    const uploadAttachments = async (
        val
    ) => {
        try {
            spinner.show();
            let [res] = await UploadAttachmentsAPI(val);
            spinner.hide();
            getAllBatchByPage()
            getAllBatches(setBatches);
            setShow(false)
            Toast.success({ message: `Batch is Successfully Created` });
        } catch (err) {
            spinner.hide();
            Toast.error({ message: `Something Went Wrong` });
            setShow(false)

            console.error("Exception occurred in uploadAttachments -- ", err);
        }
    }

    // delete batch by batch id
    const deleteBatches = async (batchId) => {
        try {
            spinner.show();
            RestService.deleteBatches(batchId).then(
                response => {
                    Toast.success({ message: `Delete batches successfully` });
                    getAllBatchByPage()
                    getAllBatches(setBatches);

                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on deleteBatches()", err)
        }
    }



    // edit batches
    const editBatches = async (data, changeStatus = false) => {
        try {
            let payload = {
                "sid": data.sid,
                "status": changeStatus ? (data.status === "ENABLED" ? 'DISABLED' : 'ENABLED') : data.status,
                "name": data.name,
                "trainingType": data.trainingType ? data.trainingType : 'INSTRUCTOR_LED'
            }
            spinner.show();
            RestService.editBatches(payload).then(
                response => {
                    Toast.success({ message: `${changeStatus ? "Status" : 'Batch'} update successfully` });
                    spinner.hide();
                    getAllBatchByPage()
                    getAllBatches(setBatches);

                    setShow(false)
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
                setShow(false)
            });
        } catch (err) {
            spinner.hide();
            setShow(false)
            console.error("error occur on editBatches()", err)
        }
    }

    // get all batches by page no
    const getAllBatchByPage = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getAllBatchesByPage(pagination, pageSize).then(
                response => {
                    setBatchList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatchByPage()", err)
        }
    }

    // get batches by sid
    const getBatchBySid = async (sid, state = false) => {
        try {
            RestService.getBatchesBySid(sid).then(
                response => {
                    state ? editBatches(response.data, true) : setInitialValue(response.data);
                    !state && setShow(true)
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

      // validateEmailId
      const validateBatch = async (batchName) => {
        try {
            if(batchName.length > 0){
            RestService.validateBatches(batchName).then(
                response => {
                    setIsBatch(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        }else{
            setIsBatch(false);
        }
        } catch (err) {
            console.error("error occur on validateEmailId()", err)
        }
    }

    
    // get batch count
    const getBatchCount = async () => {
        try {
            RestService.getCount("vw_batch").then(
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


    // search batches
    const searchBatch = (name) => {
        try {
            spinner.show();
            RestService.searchBatches(name).then(res => {
                setBatchList(res.data)
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on searchBatch()', err)
            spinner.hide();
        }
    }

    //initialize component
    useEffect(() => {
        getBatchCount()
        getAllBatchByPage()
    }, [])


    return (<><div className="table-shadow">
        <div className="p-3">
            <CardHeader {...{
                location,
                onChange: (e) => e.length === 0 && getAllBatchByPage(),
                onEnter: (e) => searchBatch(e),
                actionClick: () => { setShow(true); setIsEdit(false);setIsBatch(false) },
                showAction: user.role === ROLE.SUPERVISOR ? true : false
            }} />
        </div>
        <div>
            <BsModal {...{ show, setShow, headerTitle: !isEdit ? "Add new Batch" : "Update Batch", size: "lg" }}>
                <div className="form-container">
                    <Formik
                        onSubmit={(value) => !isEdit ? uploadAttachments(value) : editBatches(value)}
                        initialValues={!isEdit ? {
                            name: '',
                            trainingType: '',
                            file: ''
                        } : initialValue}
                        validationSchema={schema}
                    >
                        {({ handleSubmit, isSubmitting, dirty, setFieldValue,values }) => <form onSubmit={handleSubmit} className="create-batch" >
                            <div>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <TextInput label="Batch Name" isNotValid={isBatch} onBlur={(e)=> validateBatch(e.target.value)} name="name" />
                                    </div>
                                    <div className="col-6">
                                        <SelectInput label="Training Type" value={values.trainingType} option={['INSTRUCTOR_LED', 'SELF_PACED', 'LAB_ONLY']} name="trainingType" />
                                    </div>
                                </Form.Group>
                                <div>
                                    {!isEdit && <div className="mb-4">
                                        <div><span className="title-sm">Upload participants</span></div> <div><input multiple placeholder="Browse File" onChange={(e) => { setFieldValue("file", e.target.files) }} type="file" /></div>
                                    </div>
                                    }
                                </div>
                            </div>
                            <footer className="jcb">
                            <div> <a href={GLOBELCONSTANT.SAMPLE_TEMPLATE}>Sample template</a> </div>
                                <div>
                                    <Button type="submit" > {isEdit ? 'Update Batch' : 'Create Batch'}</Button>
                                </div>
                            </footer>
                        </form>
                        }
                    </Formik>
                </div>
            </BsModal>
        </div>
        {batchList && <DynamicTable {...{ configuration, sourceData: batchList, onPageChange: (e) => getAllBatchByPage(e), count }} />}
    </div>

    </>)
}


const Batches = () => {
    return (
        <Router>
            <Batch path="/" />
            <BatchesDetails path="batches-details" />
        </Router>
    )
}
export default Batches