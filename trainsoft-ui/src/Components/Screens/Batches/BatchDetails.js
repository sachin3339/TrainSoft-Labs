import { useState,useEffect } from "react";
import './batches.css'
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { ICN_TRASH,ICN_EDIT  } from "../../Common/Icon";
import PaginationOne from "../../Common/Pagination";
import CardHeader from "../../Common/CardHeader";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import useFetch from "../../../Store/useFetch";
import moment from 'moment'



const BatchesDetails = ({location}) => {
    const [participant, setParticipant]= useState([])

       // initialize  component
    // useEffect(() => { 
    //     try{
    //     if(response){
    //        let val = response.map(res=> {
    //             let data = res.appuser
    //             data.role= res.role
    //             data.department = res.departmentVA ? res.departmentVA.department.name : ''
    //             return data
    //         })
    //         setParticipant(val)
    //      }
    //     }catch(err){
    //         console.error(err)
    //     }
    // }
    // , [response])


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
        tableCustomClass: "ng-table sort-enabled table-borderless", // table custom class
        showCheckbox: false,
        clearSelection: false
    });

       // get all batches
    //    const getAllBatch = async (pagination="1") => {
    //     try {
    //         let pageSize = 10;
    //         spinner.show();
    //         RestService.getAllBatchesByPage(pagination,pageSize).then(
    //             response => {
    //                 let val = response.map(res=> {
    //                     let data = res.appuser
    //                     data.role= res.role
    //                     data.department = res.departmentVA ? res.departmentVA.department.name : ''
    //                     return data
    //                 })
    //                 setParticipant(val)
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         ).finally(() => {
    //             spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on getAllBatch()", err)
    //     }
    // }
     // search batches
    //  const searchParticipate = (name)=> {
    //     try{
    //         spinner.show();
    //         RestService.searchParticipatees(name).then(res => {
    //                 setBatchList(res.data)
    //                 spinner.hide();
    //             }, err => {
    //                 spinner.hide();
    //             }
    //         ); 
    //     }
    //     catch(err){
    //         console.error('error occur on searchParticipate()',err)
    //         spinner.hide();
    //     }
    // }

    return (<div className="table-shadow p-3">
              {/* <CardHeader {...{ location, 
               onChange: (e) => e.length === 0 && getAllBatch(),
               onEnter:(e)=> searchParticipate(e)
            }} /> */}
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
    </div>)
}
export default BatchesDetails