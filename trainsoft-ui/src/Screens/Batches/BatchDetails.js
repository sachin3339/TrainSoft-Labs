import { useState } from "react";
import './batches.css'
import DynamicTable from "../../Components/DynamicTable/DynamicTable";
import { ICN_TRASH,ICN_EDIT  } from "../../Constant/Icon";
import PaginationOne from "../../Components/Pagination/Pagination";



const dummyData =[
    {name: 'Jessie Buchanan',empId: '10290',emailId:'benits@msn.com',phoneNo:'(659) 768-1869',department:'Information Technology'},
    {name: 'Lisa Palmer',empId: '10290',emailId:'drewf@optonline.net',phoneNo:'(659) 768-1869',department:'Information Technology'},
    {name: 'Donna Higgins',empId: '10290',emailId:'devphil@sbcglobal.net',phoneNo:'(659) 768-1869',department:'Information Technology'},
    {name: 'Bob Norris',empId: '10290',emailId:'cliffski@me.com',phoneNo:'(659) 768-1869',department:'Information Technology'},
    {name: 'Tonya Walters',empId: '10290',emailId:'22 june 2020',phoneNo:'(659) 768-1869',department:'Information Technology'},

]

const createBatches = {
    batchName: '',
    trainingType: '',
    endDate:'',
    startDate: '',
    course:'',
    instructor:''

}
const BatchesDetails = () => {
    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Name",
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false,
            },
            "empId": {
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
            "phoneNo": {
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
    return (<div className="table-shadow">
        <div className="bDetail-action">
            <div className="full-w ">
            <div>
                <div className="">Batches Details</div>
            </div>
            <div className="batch-info">
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-6">Batch Name</div>
                        <div className="col-6 mb-4">ITU_01</div>
                        <div className="col-6">Status</div>
                        <div className="col-6">Active</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-6">Technology Name</div>
                        <div className="col-6  mb-4">Angular</div>
                        <div className="col-6">Start Date</div>
                        <div className="col-6">20 july 2020</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-6">Creation Date </div>
                        <div className="col-6  mb-4">20 july 2020</div>
                        <div className="col-6">End Date</div>
                        <div className="col-6">20 july 2020</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <DynamicTable {...{configuration,sourceData: dummyData}}/>
        <div className="pagination-div">
        <PaginationOne totalCount={30}  onNavigate={(pageNumber) => console.log(pageNumber)}/>

        </div>
    </div>)
}
export default BatchesDetails