import { useState, useEffect, useContext } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Modal, Form } from 'react-bootstrap'
import { Field, Formik } from 'formik';
import { ICN_TRASH, ICN_EDIT, ICN_DOWNLOAD } from "../../Common/Icon";
import { BtnPrimary, Button } from "../../Common/Buttons/Buttons";
import { TextInput, DateInput,CheckboxGroup, SelectInput, TextArea, RadioBox, Checkbox } from "../../Common/InputField/InputField";
import { Link, Router } from "../../Common/Router";
import { BsModal, Toggle } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import './style.css'
import './../Batches/batches.css'
import useFetch from "../../../Store/useFetch";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import * as Yup from 'yup';
import AppContext from "../../../Store/AppContext";
import useToast from "../../../Store/ToastHook";
import NoDataFound from "../../Common/NoDataFound/NoDataFound";


const User = ({ location }) => {
    const {department,spinner,user} = useContext(AppContext)
    const Toast = useToast()
    const [show, setShow] = useState(false);
    const [participant,setParticipant] = useState([])
    const [genPwd,setGenPwd] = useState('')
    const [file,setFile] = useState(null)
     // get all batches
 const  allDepartment= useFetch({
    method: "get",
    url: GLOBELCONSTANT.INSTRUCTOR.GET_INSTRUCTOR,
    errorMsg: 'error occur on get Batches'
 });
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    // const {response} = useFetch({
    //     method: "get",
    //     url: GLOBELCONSTANT.PARTICIPANT.ALL_USERS + "5D66EAB00B4446C9A7ADB898C43C2C119456C5E6CA4D4499AE237822E3A41CB7",
    //     errorMsg: 'error occur on get participant'
    //  });

     //validation
     const schema = Yup.object().shape({
        name: Yup.string()
        .min(2, 'Too Short!')
        .required("Required!"),
        emailId: Yup.string()
        .email("Email is not valid")
        .required("Required!"),
        phoneNumber:Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(10,"Phone number is not valid")
        .required("Required!"),
      });

    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "employeeId": {
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
                isSearchEnabled: false,
                render: (data) => <Toggle id={data.sid} onChange={() => { deleteUser(data.status === 'ENABLED' ? 'DISABLED' : 'ENABLED', data.vSid)}} checked={data.status === 'ENABLED' ? true : false}/>
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
        actions: [
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                "onClick": (data, i) => console.log(data)
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data, i) => deleteUser("DELETED",data.vSid)
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
    // const uploadParticipant = (data) => {
    //     try {
    //         RestService.UploadParticipant(data).then(resp => {
    //             setShow(false)
    //             console.log(resp)
    //         }, err => console.log(err)
    //         );
    //     }
    //     catch (err) {
    //         console.error('error occur on createCourse', err)
    //     }
    // }

        // generate pwd
      const generatePwd = (setFieldValue) => {
        try {
            RestService.generatePwd().then(resp => {
                setFieldValue("password",resp.data)
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // create participant
     const createParticipant = (data) => {
        try {
            let payload = {
                "appuser": {
                  "accessType": data.accessType.key,
                  "emailId": data.emailId,
                  "employeeId": data.employeeId,
                  "name": data.name,
                  "phoneNumber": data.phoneNumber,
                  "password": data.password
                },
                "departmentVA": {
                  "department": {
                      "name":data.department.name
                  },
                  "departmentRole": data.departmentRole.key
                },    
              }
            RestService.createParticipant(payload).then(resp => {
                setShow(false)
                Toast.success({ message: `User is Successfully Created`});
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // get all training
    const getUsers = async () => {
        try {
            spinner.show();
            RestService.getAllUser("ALL").then(
                response => {
                    let val = response.data.map(res=> {
                        let data = res.appuser
                        data.role = res.departmentVA ? res.departmentVA.departmentRole : ''
                        data.department = res.departmentVA ? res.departmentVA.department.name : ''
                        data.vSid = res.sid
                        data.status = res.status
                        return data
                    })
                    setParticipant(val)
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getUsers()", err)
        }
    }
 
    // search batches by name 
    const searchUser = (name) => {
        try {
            spinner.show();
            RestService.searchUser(name).then(resp => {
                // let val = resp.map(res=> {
                //     let data = res.appuser
                //     data.role = res.departmentVA ? res.departmentVA.departmentRole : ''
                //     data.department = res.departmentVA ? res.departmentVA.department.name : ''
                //     return data
                // })
                setParticipant(resp.data)
                spinner.hide();
              }, err => {
                spinner.hide();
              }
            );
        }
        catch (err) {
            console.error('error occur on searchUser()', err)
            spinner.hide();
        }
    }    

      // delete course
      const deleteUser = (status,vSid) => {
        try {
            spinner.show();
            RestService.changeAndDeleteStatus(status,vSid).then(res => {
                spinner.hide();
                getUsers()
                Toast.success({ message: ` ${status === 'DELETED'? 'User is deleted': 'Status update'} successfully ` });
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on deleteUser', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    // initialize  component
    useEffect(() => {
        getUsers()
    }, [])




    return (<>
    <div className="table-shadow">
        <div className="p-3">
            <CardHeader {...{
                location,
                onChange: (e) => e.length === 0 && getUsers(),
                onEnter: (e) => searchUser(e),
                actionClick : () => {setShow(true);},
                showAction: user.role === 'ADMIN' ? true: false
            }} />
        </div>
        <BsModal {...{ show, setShow, headerTitle: "Add new User", size: "lg" }}>
                    <div className="form-container">
                        <Formik
                            onSubmit={(value)=> createParticipant(value)}
                            initialValues={{
                                name: '',
                                employeeId: '',
                                emailId: '',
                                phoneNumber: '',
                                department: '',
                                departmentRole: '',
                                password: '',
                                accessType: '',

                          
                            }}
                            validationSchema={schema}
                        >
                            {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => <form onSubmit={handleSubmit} className="create-batch" >
                                <div>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Name" name="name" />
                                        </div>
                                        <div className="col-6">
                                            <TextInput label="Emp Id" name="employeeId" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Email Id" name="emailId" />
                                        </div>
                                        <div className="col-6">
                                            <TextInput label="Phone No" name="phoneNumber" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <SelectInput label="Department" name="department" bindKey="name" option={allDepartment.response} />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Role" name="departmentRole"  bindKey="name" option={GLOBELCONSTANT.DEPARTMENT_ROLE} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-6">
                                            <TextInput label="Password" name="password" />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput label="Privilege/Access Level" name="accessType" bindKey="name" option={GLOBELCONSTANT.ACCESS_LEVEL} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={()=>generatePwd(setFieldValue)} className="btn btn-secondary btn-sm">
                                            Generate Password
                                            </button>
                                     </div>
                                        {/* <div className="col-6">
                                            <Checkbox name="check" id="check" label="Require this user to change their password when they first sign in" />
                                        </div> */}
                                        {/* <div className="col-6">
                                            <div>Upload bulk users</div> <div><Field name="upload"  placeholder="Browse File" onChange={(e)=> {console.log(e.target.files[0]); uploadParticipant(e.target.files[0])}} type="file"/></div>
                                        </div> */}
                                    </Form.Group>
                                </div>
                                {/* modal footer which contains action button to save data or cancel current action */}
                                <footer className="jcb">
                                    <div>
                                    </div>
                                    <div>
                                        <Button type="submit" className="px-4" >Add</Button>
                                    </div>
                                </footer>
                            </form>
                            }
                        </Formik>
                    </div>
                </BsModal>
        <DynamicTable {...{ configuration, sourceData: participant }} />    
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