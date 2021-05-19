import { useState,useEffect, useContext } from "react";
import './batches.css'
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { ICN_TRASH,ICN_EDIT  } from "../../Common/Icon";
import PaginationOne from "../../Common/Pagination";
import CardHeader from "../../Common/CardHeader";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import useFetch from "../../../Store/useFetch";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import RestService from "../../../Services/api.service";
import useToast from "../../../Store/ToastHook";
import { Button } from "../../Common/Buttons/Buttons";
import AddParticipant from "./AddParticipant";


const BatchesDetails = ({location}) => {
    const {spinner} = useContext(AppContext)
    const [show, setShow] = useState(false);
    const Toast = useToast()
    const [participant, setParticipant]= useState([])

    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Name",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false,
            },
            "employeeId": {
                "title": "Emp Id",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false
            }
            ,
            "emailId": {
                "title": "Email Id",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false
            }
            ,
            "phoneNumber": {
                "title": "Phone Number",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false
            }
            ,
            "department": {
                "title": "Department",
                "sortDirection": null,
                "sortEnabled": false,
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
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data, i) => deleteBatchesParticipant(data.vASid)
            }
        ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: false,
        clearSelection: false
    });

       // get all participant
       const getParticipant = async (pagination="1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getBatchParticipant(location.state.sid).then(
                response => {
                    let val = response.data.map(res=> {
                        let data = res.appuser
                        data.role= res.role
                        data.department = res.departmentVA ? res.departmentVA.department.name : ''
                        data.vASid = res.sid
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
            console.error("error occur on getAllBatch()", err)
        }
    }

        // delete batch by batch id
        const deleteBatchesParticipant = async (vASid) => {
            try {
                spinner.show();
                RestService.deleteBatchesParticipant(location.state.sid,vASid).then(
                    response => {
                        Toast.success({ message: `Delete participant successfully` });
                        getParticipant()
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

     // search batches
     const searchParticipate = (name)=> {
        try{
            spinner.show();
            RestService.searchUser(name).then(response => {
                // let val = response.data.map(res=> {
                //             let data = res.appuser
                //             data.role= res.role
                //             data.department = res.departmentVA ? res.departmentVA.department.name : ''
                //             return data
                //           })
                         setParticipant(response.data)
                       spinner.hide();
                }, err => {
                    spinner.hide();
                }
            ); 
        }
        catch(err){
            console.error('error occur on searchParticipate()',err)
            spinner.hide();
        }
    }

    useEffect(()=>{
        location.state?.sid && getParticipant()
    },[])

    return (<div className="table-shadow p-3">
              <CardHeader {...{ location, 
               onChange: (e) => e.length === 0 && console.log(''),
               onEnter:(e)=> console.log(e)
            }}>
                    <Button className="mx-2" onClick={()=>setShow(true)}>Add Participant</Button>
         </CardHeader>
        <div className="bDetail-action">
            <div className="full-w ">
            <div className="batch-info">
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-6">Batch Name</div>
                        <div className="col-6 mb-4">{location.state.row.name}</div>
                   
                    </div>
                </div>
              
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-6">Creation Date </div>
                        <div className="col-6  mb-4">{moment(location.state.row.createdOn).format('Do MMMM YYYY') }</div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="row">
                       <div className="col-6">Status</div>
                        <div className="col-6">{location.state.row.status}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <DynamicTable {...{configuration,sourceData: participant}}/>
        {show && <AddParticipant {...{show, setShow,sid:location.state.sid,getParticipant,participant}}/>}
    </div>)
}
export default BatchesDetails