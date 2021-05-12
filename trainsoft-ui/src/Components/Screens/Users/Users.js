import { useState, useEffect, useContext } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import {  Form , Dropdown} from 'react-bootstrap'
import {  Formik, yupToFormErrors } from 'formik';
import { ICN_TRASH, ICN_EDIT } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons";
import { TextInput, SelectInput } from "../../Common/InputField/InputField";
import {  Router } from "../../Common/Router";
import { BsModal, Toggle } from "../../Common/BsUtils";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import useFetch from "../../../Store/useFetch";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import * as Yup from 'yup';
import AppContext from "../../../Store/AppContext";
import useToast from "../../../Store/ToastHook";
import './style.css'
import './../Batches/batches.css'


const User = ({ location }) => {
    const {  spinner, user ,ROLE} = useContext(AppContext)
    const [showBulkUpload, setShowBulkUpload] = useState(false)
    const Toast = useToast()
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false);
    const [participant, setParticipant] = useState([])
    const [isEmail, setIsEmail] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [initialValue, setInitialValue] = useState({})

    // get all batches
    const allDepartment = useFetch({
        method: "get",
        url: GLOBELCONSTANT.INSTRUCTOR.GET_INSTRUCTOR,
        errorMsg: 'error occur on get Batches'
    });
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    //validation
    const schema = Yup.object().shape({
       appuser: Yup.object().shape({
            name: Yup.string()
             .min(2, 'Too Short!')
             .required("Required!"),
            emailId: Yup.string()
              .email("Email is not valid")
              .required("Required!"),
            phoneNumber: Yup.string()
              .matches(phoneRegExp, 'Phone number is not valid')
              .max(10, "Phone number is not valid")
              .required("Required!"),
            accessType: Yup.object().required('Required!'),
            password: Yup.string().required('Required!')
            }),
            departmentVA: Yup.object().shape({
             department: Yup.object().required('Required!') ,
             departmentRole: Yup.object().required('Required!')
        })
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
           "vaRole": {
            "title": "Role",
            "sortDirection": null,
            "sortEnabled": true,
            isSearchEnabled: false,
            render: (data) =><>{user.vaRole === "ADMIN" ? <Dropdown>
            <Dropdown.Toggle id="set-project-role" as="div">
                {data.vaRole}
            </Dropdown.Toggle>
            <Dropdown.Menu size="sm">
                <Dropdown.Item href="#" onClick={() => {changeVARole('ADMIN',data.vSid) }}>
                   ADMIN
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => {changeDepartmentRole("USER",data.vSid) }}>
                   USER
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>: data.vaRole}
        </>
        },
            "role": {
                "title": "Department Role",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) =><>{user.vaRole === "ADMIN" ? <Dropdown>
                <Dropdown.Toggle id="set-project-role" as="div">
                    {data.role}
                </Dropdown.Toggle>
                <Dropdown.Menu size="sm">
                    {
                         GLOBELCONSTANT.DEPARTMENT_ROLE.map((r, idx) => <Dropdown.Item href="#" key={idx} onClick={() => {changeDepartmentRole(r.key,data.departmentVA.sid) }}>
                            {r.name}
                        </Dropdown.Item>)
                    }
                </Dropdown.Menu>
            </Dropdown>: data.role}
            </>
            },
            "status": {
                "title": "Status",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false,
                render: (data) => <Toggle id={data.sid} onChange={() => { deleteUser(data.status === 'ENABLED' ? 'DISABLED' : 'ENABLED', data.vSid) }} checked={data.status === 'ENABLED' ? true : false} />
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
                "onClick": (data, i) => {getUsersDetails(data.vSid, true);setIsEdit(true)}
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data, i) => deleteUser("DELETED", data.vSid)
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


    // generate pwd
    const generatePwd = (setFieldValue) => {
        try {
            RestService.generatePwd().then(resp => {
                setFieldValue("password", resp.data)
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
            spinner.show();
            let val = data
            val.appuser.accessType = data.appuser.accessType.key
            val.departmentVA.department.name = data.departmentVA.department.name
            val.departmentVA.departmentRole = data.departmentVA.departmentRole.key
            RestService.createParticipant(data).then(resp => {
                setShow(false)
                spinner.hide();
                getUsers()
                Toast.success({ message: `User is Successfully Created` });
            }, err => {console.log(err);spinner.hide();}
            );
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on createCourse', err)
        }
    }
    // get all training
    const getUsersDetails = async (sid, edit = false) => {
        try {
            spinner.show('Loading... please wait')
            RestService.getUserDetails(sid).then(
                response => {
                    if (edit) {
                        let inValue = response.data
                        inValue.appuser.accessType = GLOBELCONSTANT.ACCESS_LEVEL.find(res=> res.key === response.data.appuser.accessType)
                        inValue.departmentVA.departmentRole = response.data.departmentVA &&  GLOBELCONSTANT.DEPARTMENT_ROLE.find(res=> res.key ===  response.data.departmentVA.departmentRole)
                        setInitialValue(inValue)
                        setShow(true)
                    }
                    spinner.hide();
                },
                err => {
                    console.error("error occur on getUsers()", err)
                    spinner.hide();
                }
            )
        } catch (err) {
            console.error("error occur on getUsers()", err)
            spinner.hide();
        }
    }



    // update participant
    const updateParticipant = (data) => {
        try {
            spinner.show('Loading... please wait')
            let val = data
            val.appuser.accessType = data.appuser.accessType.key
            val.departmentVA.department.name = data.departmentVA?.department?.name
            val.departmentVA.departmentRole = data.departmentVA?.departmentRole?.key
            val.departmentVA.department = data.departmentVA?.department

            RestService.updateParticipant(val).then(resp => {
                setShow(false)
                getUsers()
                Toast.success({ message: `User is Successfully Created` });
            spinner.hide()
        }, err => {console.log(err);spinner.hide()}
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
            spinner.hide()
        }
    }

    // get all training
    const getUsers = async (pagination = 1) => {
        try {
            let pageSize = 10
            spinner.show('Loading... please wait')
            RestService.getAllUserByPage("ALL", pagination, pageSize).then(
                response => {
                    let val = response.data.map(res => {
                        let data = res.appuser
                        data.role = res.departmentVA ? res.departmentVA.departmentRole : ''
                        data.department = res.departmentVA ? res.departmentVA.department.name : ''
                        data.vSid = res.sid
                        data.vaRole = res.role
                        data.status = res.status
                        data.departmentVA = res.departmentVA
                        return data
                    })
                    setParticipant(val)
                    spinner.hide();
                },
                err => {
                    console.error("error occur on getUsers()", err)
                    spinner.hide();
                }
            )
        } catch (err) {
            console.error("error occur on getUsers()", err)
            spinner.hide();
        }
    }

    // search user by name/email
    const searchUser = (name) => {
        try {
            spinner.show('Loading... please wait')
            RestService.searchUser(name).then(resp => {
                let val = resp.data.map(res => {
                    let data = res.appuser
                    data.role = res.departmentVA ? res.departmentVA.departmentRole : ''
                    data.vSid = res.sid
                    data.vaRole = res.role
                    data.status = res.status
                    data.departmentVA = res.departmentVA
                    data.department = res.departmentVA ? res.departmentVA.department.name : ''
                    return data
                })
                setParticipant(val)
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
    const deleteUser = (status, vSid) => {
        try {
            spinner.show('Loading... please wait')
            RestService.changeAndDeleteStatus(status, vSid).then(res => {
                spinner.hide();
                getUsers()
                Toast.success({ message: ` ${status === 'DELETED' ? 'User is deleted' : 'Status update'} successfully ` });
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on deleteUser', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    // get user count
    const getUserCount = async () => {
        try {
            RestService.getUserCount("ALL").then(
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
            spinner.hide();
            console.error("error occur on getAllBatch()", err)
        }
    }

    // validateEmailId
    const validateEmailId = async (email) => {
        try {
            if (email.length > 0) {
                RestService.validateEmail(email).then(
                    response => {
                        setIsEmail(response.data);
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } else {
                setIsEmail(false);
            }
        } catch (err) {
            console.error("error occur on validateEmailId()", err)
        }
    }

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
            xhr.open("POST", GLOBELCONSTANT.PARTICIPANT.UPLOAD_USER_PARTICIPANT);
            xhr.setRequestHeader("Authorization", user.jwtToken);
            xhr.send(data);
        })
    }

    /** upload attachments file
    *   @param {Object} file = selected files
    *   @param {string} token = user auth token 
    */
    const uploadAttachments = async (
        val
    ) => {
        try {
            spinner.show();
            let [res] = await UploadAttachmentsAPI(val);
            spinner.hide();
            setShowBulkUpload(false)
            getUsers()
            Toast.success({ message: `Participant is successfully uploaded ` });
        } catch (err) {
            setShowBulkUpload(false)
            spinner.hide();
            Toast.error({ message: `Something Went Wrong` });
            setShow(false)
            console.error("Exception occurred in uploadAttachments -- ", err);
        }
    }

          // change department role
          const changeDepartmentRole = async (role,departmentVa) => {
            try {
                   spinner.hide();
                    RestService.changeDepartmentRole(role,departmentVa).then(
                        response => {
                         getUsers()
                         Toast.success({ message: `Department role change successfully ` });
                        },
                        err => {
                            spinner.hide();
                        }
                    ).finally(() => {
                        spinner.hide();
                    });
    
            } catch (err) {
                console.error("error occur on validateEmailId()", err)
            }
        }
    
          // change user role
          const changeVARole = async (role,vSid) => {
            try {
                   spinner.hide();
                    RestService.changeUserRole(role,vSid).then(
                        response => {
                         getUsers()
                         Toast.success({ message: `Role changed successfully` });
                        },
                        err => {
                            spinner.hide();
                        }
                    ).finally(() => {
                        spinner.hide();
                    });
    
            } catch (err) {
                console.error("error occur on validateEmailId()", err)
            }
        }

    // initialize  component
    useEffect(() => {
        getUserCount()
        getUsers()
    }, [])


    return (<>
        <div className="table-shadow">
            <div className="p-3">
                <CardHeader {...{
                    location,
                    onChange: (e) => e.length === 0 && getUsers(),
                    onEnter: (e) => searchUser(e),
                }}>
                    {user.role === ROLE.SUPERVISOR && <>
                        <Button className="ml-2" onClick={() => { setShowBulkUpload(true) }}> Bulk Upload</Button>
                        <Button className="ml-2" onClick={() => { setShow(true); setIsEmail(false); setIsEdit(false) }}>+ Add New</Button>
                    </>}

                </CardHeader>
            </div>
            <BsModal {...{ show, setShow, headerTitle: isEdit ? 'Update User' : "Add new User", size: "lg" }}>
                <div className="form-container">
                    <Formik
                        onSubmit={(value) => { isEdit ? updateParticipant(value) : createParticipant(value) }}
                        initialValues={!isEdit ? {
                            "appuser": {
                                "accessType": '',
                                "emailId": '',
                                "employeeId": '',
                                "name": '',
                                "phoneNumber": '',
                                "password": ''
                            },
                            "departmentVA": {
                                "department": '',
                                "departmentRole": ''
                            },
                            "role": "USER"
                        } : initialValue}
                    validationSchema={schema}
                    >
                        {({ handleSubmit, isSubmitting, dirty, setFieldValue,values }) => <form onSubmit={handleSubmit} className="create-batch" >
                            <div>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <TextInput label="Name" name="appuser.name" />
                                    </div>
                                    <div className="col-6">
                                        <TextInput label="Emp Id" name="appuser.employeeId" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <TextInput label="Email Id" name="appuser.emailId" isNotValid={isEmail} onBlur={(e) => validateEmailId(e.target.value)} />
                                    </div>
                                    <div className="col-6">
                                        <TextInput label="Phone No" name="appuser.phoneNumber" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <SelectInput label="Department" name="departmentVA.department" value={values.departmentVA.department} bindKey="name" option={allDepartment.response} />
                                    </div>
                                    <div className="col-6">
                                        <SelectInput label="Role" name="departmentVA.departmentRole" value={values.departmentVA.departmentRole} bindKey="name" option={GLOBELCONSTANT.DEPARTMENT_ROLE} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <TextInput label="Password" name="appuser.password" />
                                    </div>
                                    <div className="col-6">
                                        <SelectInput label="Privilege/Access Level" value={values.appuser.accessType} name="appuser.accessType" bindKey="name" option={GLOBELCONSTANT.ACCESS_LEVEL} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <div className="col-6">
                                        <button type="button" onClick={() => generatePwd(setFieldValue)} className="btn btn-secondary btn-sm">
                                            Generate Password
                                            </button>
                                    </div>
                                </Form.Group>
                            </div>
                            {/* modal footer which contains action button to save data or cancel current action */}
                            <footer className="jcb">
                                <div>
                                </div>
                                <div>
                                    <Button type="submit" className="px-4" >{isEdit ? "Update" : "Add"}</Button>
                                </div>
                            </footer>
                        </form>
                        }
                    </Formik>
                </div>
            </BsModal>

            <BsModal {...{ show: showBulkUpload, setShow: setShowBulkUpload, headerTitle: "Upload", size: "md" }}>
                <div className="form-container">
                    <Formik
                        onSubmit={(value) => uploadAttachments(value)}
                        initialValues={{
                            file: '',
                        }}
                    >
                        {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => <form onSubmit={handleSubmit} className="create-batch" >
                            <div>
                                {<div className="col-6 pl-0">
                                    <div><span className="title-sm">Upload participants</span></div> <div><input placeholder="Browse File" onChange={(e) => { setFieldValue("file", e.target.files) }} type="file" /></div>
                                </div>
                                }

                            </div>

                            <footer className="jcb mt-4">
                                <div> <a href={GLOBELCONSTANT.SAMPLE_TEMPLATE}>Sample template</a> </div>
                                <div>
                                    <Button type="submit" className="px-4">Upload</Button>
                                </div>
                            </footer>
                        </form>
                        }
                    </Formik>
                </div>
            </BsModal>
            <DynamicTable {...{ configuration, sourceData: participant, count, onPageChange: (e) => getUsers(e) }} />
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