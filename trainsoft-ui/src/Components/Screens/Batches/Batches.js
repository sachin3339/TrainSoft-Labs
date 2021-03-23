import { useState, useEffect, useContext } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Form } from 'react-bootstrap'
import { Formik, Field } from 'formik';
import { ICN_TRASH, ICN_EDIT, ICN_CLOSE, ICN_DELETE } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput, SelectInput } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import BatchesDetails from "./BatchDetails";
import { BsModal, Toggle } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import * as Yup from 'yup';
import moment from 'moment'
import useToast from "../../../Store/ToastHook";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import useFetch from "../../../Store/useFetch";
import AppContext from "../../../Store/AppContext";
import { SearchInputBox } from "react-bs-search";
import './batches.css'



const initialVal = {

}

const Batch = ({ location }) => {
    const { user, spinner } = useContext(AppContext)
    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [batchList, setBatchList] = useState([])
    const [initialValue, setInitialValue] = useState(initialVal)
    const [isEdit, setIsEdit] = useState(false)
    const [count, setCount] = useState(0)


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
                render: (data) => <Link to={'batches-details'} state={{ path: 'batches-details', sid: data.sid, row: data, title: 'BATCHES', subTitle: "Batch Details" }} className="dt-name">{data.name}</Link>

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
                render: (data) => moment(data.createdOn).format('Do MMMM YYYY')
            },
            "status": {
                "title": "Status",
                "sortDirection": null,
                "sortEnabled": true,
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

    // create batches
    // const createBatch = (data)=> {
    //     try{
    //         let payload = {
    //             "name": data.name,
    //             "status": "ENABLED",
    //             "trainingType": "INSTRUCTOR_LED",
    //         }

    //         let val = {
    //             batchName: data.name,
    //             instructorName: data.trainingType
    //         }
    //         RestService.CreateBatch(payload).then(res => {
    //                setBatchList([...batchList,res.data])
    //                Toast.success({ message: `Batch is Successfully Created`});
    //                uploadParticipant(data.upload,val)
    //                setShow(false) 
    //             }, err => console.log(err)
    //         ); 
    //     }
    //     catch(err){
    //         console.error('error occur on getAllCourse',err)
    //     }
    // }


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
            xhr.open("POST", GLOBELCONSTANT.BASE_URL + GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT);
            xhr.setRequestHeader("batchName", val.name);
            xhr.setRequestHeader("instructorName", val.trainingType);

            xhr.setRequestHeader("Authorization", "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDNEMDhFQjY5MkE0RDg5OEQ1NEUwNkM0NTc1QTA5NUM1MUJBQUEwNjYyQTQ4N0NBQjU2RTNGMUNFOTdGRTg0IiwiaWF0IjoxNjE1Mjc2MDUzLCJzdWIiOiJ7XCJjb21wYW55U2lkXCI6XCI1RDY2RUFCMDBCNDQ0NkM5QTdBREI4OThDNDNDMkMxMTk0NTZDNUU2Q0E0RDQ0OTlBRTIzNzgyMkUzQTQxQ0I3XCIsXCJ2aXJ0dWFsQWNjb3VudFNpZFwiOlwiMDgzREM5NDExQUQ1NEI4OUFBOTRDNEEwQTdBODc0M0YzODNDRERCQTJBQ0M0QTE3QTg0QjJCRDAxMUY1MDEyQlwiLFwidXNlclNpZFwiOlwiMTAzRDA4RUI2OTJBNEQ4OThENTRFMDZDNDU3NUEwOTVDNTFCQUFBMDY2MkE0ODdDQUI1NkUzRjFDRTk3RkU4NFwiLFwiZGVwYXJ0bWVudFNpZFwiOlwiQzIzRkM0MDJGMjdBNEE2ODkwOTJGMUY0Q0E0NDE3QzcyNzc0ODNBRjZFQzc0NkM5QUNFNTFGQTgxOTZDMjA1RFwiLFwiZGVwYXJ0bWVudFJvbGVcIjpcIklOU1RSVUNUT1JcIixcImNvbXBhbnlSb2xlXCI6XCJVU0VSXCIsXCJlbWFpbElkXCI6XCJrdW1hcmthbmhpeWEyMUBnbWFpbC5jb21cIn0iLCJpc3MiOiJrdW1hcmthbmhpeWEyMUBnbWFpbC5jb20iLCJleHAiOjE2MTY3NzYwNTN9.KYfr2QmDcRa8kB8Dz8H5g1h-E3PFld6W6kz-SheEqlk");
            xhr.send(data);
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
            getAllBatch()
            setShow(false)
            Toast.success({ message: `Batch is Successfully Created` });
        } catch (err) {
            spinner.hide();
            Toast.error({ message: `Something Went Wrong` });
            setShow(false)

            console.error("Exception occurred in uploadAttachments -- ", err);
        }
    }

    // upload participant
    // const uploadParticipant = (file,header) => {
    //     try {
    //         let data = new FormData();
    //         for (let i = 0, l = file.length; i < l; i++)
    //             data.append("file", file[i])

    //         RestService.UploadParticipant(data,header).then(resp => {
    //             setShow(false)
    //             Toast.success({ message: `Participant is Successfully uploaded`});
    //         }, err => console.log(err)
    //         );
    //     }
    //     catch (err) {
    //         console.error('error occur on createCourse', err)
    //     }
    // }

    // get all batches
    const deleteBatches = async (batchId) => {
        try {
            spinner.show();
            RestService.deleteBatches(batchId).then(
                response => {
                    Toast.success({ message: `Delete batches successfully` });
                    getAllBatch()
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
                    getAllBatch()
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

    // get all batches
    const getAllBatch = async (pagination = "1") => {
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
            console.error("error occur on getAllBatch()", err)
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

    // get batches by sid
    const getBatchCount = async () => {
        try {
            RestService.getCount("batch").then(
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
        getBatchCount();
        getAllBatch()
    }, [])


    return (<><div className="table-shadow">
        <div className="p-3">
            <CardHeader {...{
                location,
                onChange: (e) => e.length === 0 && getAllBatch(),
                onEnter: (e) => searchBatch(e)
            }} />
        </div>
        <div className="table-footer-action">
            <div>
                {user.role === 'admin' && <Button onClick={() => setShow(true)}> + Add New </Button>}
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
                            {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Batch Name" name="name" />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Training Type" option={['INSTRUCTOR_LED', 'SELF', 'OFFLINE']} name="trainingType" />
                                        </div>
                                    </Form.Group>
                                </div>
                                <footer className="jcb">
                                    <div>
                                        {!isEdit && <div className="col-6">
                                            <div><span className="title-sm">Upload participants</span></div> <div><input placeholder="Browse File" onChange={(e) => { setFieldValue("file", e.target.files) }} type="file" /></div>
                                        </div>
                                        }

                                    </div>
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
        </div>
        {batchList && <DynamicTable {...{ configuration, sourceData: batchList.slice().reverse(), onPageChange: (e) => getAllBatch(e), count }} />}

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