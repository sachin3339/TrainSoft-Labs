import { useState } from "react";
import './batches.css'
import DynamicTable from "../../Components/DynamicTable/DynamicTable";
const dummyData =[
    {batchName: 'ITU_01',technology: 'Angular',createdData:'22 june 2020',learners:'333',status:'Active',startDate:'123213',endDate:'323213'},
    {batchName: 'ITU_01',technology: 'Angular',createdData:'22 june 2020',learners:'333',status:'Active',startDate:'123213',endDate:'323213'},
    {batchName: 'ITU_01',technology: 'Angular',createdData:'22 june 2020',learners:'333',status:'Active',startDate:'123213',endDate:'323213'},
    {batchName: 'ITU_01',technology: 'Angular',createdData:'22 june 2020',learners:'333',status:'Active',startDate:'123213',endDate:'323213'},
    {batchName: 'ITU_01',technology: 'Angular',createdData:'22 june 2020',learners:'333',status:'Active',startDate:'123213',endDate:'323213'},

]
const Batches = () => {
    const [configuration, setConfiguration] = useState({
        columns: {
            "batchName": {
                "title": "Batch Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "technology": {
                "title": "Technology",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
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
        // actions: [
        //     {
        //         "title": "Edit",
        //         "icon": ICN_EDIT,
        //         "onClick": (data, i) => { initTextTemplate(JSON.parse(JSON.stringify(data)), i); setVisibility(true); }
        //     },
        //     {
        //         "title": "Delete",
        //         "icon": ICN_TRASH,
        //         "onClick": (data, i) => showConfirmModal(i)
        //     }
        // ],
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
    return (<div className="table-shadow">
        <div className="table-top-action ">
            <div>
                <div className="">Batches</div>
            </div>
            <div>
                <button className="btn btn-sm btn-primary">+ Add New </button>
            </div>
        </div>
        <DynamicTable {...{configuration,sourceData: dummyData}}/>
               
    </div>)
}
export default Batches