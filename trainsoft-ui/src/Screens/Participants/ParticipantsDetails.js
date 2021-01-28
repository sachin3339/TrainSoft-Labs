import { useState } from "react";
import '../Batches/batches.css'

import './participants.css'
import DynamicTable from "../../Components/DynamicTable/DynamicTable";
import { ICN_TRASH, ICN_EDIT, ICN_BATCHES, ICN_ON_GOING, ICN_PROGRESS, ICN_COMPLETED, ICN_PASSED, ICN_EMAIL_W, ICN_TEXT_W } from "../../Constant/Icon";
import PaginationOne from "../../Components/Pagination/Pagination";
import Card from "../../Components/Card/Card";
import { Button } from "../../Components/Buttons/Buttons";




const dummyData = [
    { batchName: 'ITU_01', empId: '10290', emailId: 'benits@msn.com', phoneNo: '(659) 768-1869', status: 'passed' },
    { batchName: 'ITU_02', empId: '10290', emailId: 'drewf@optonline.net', phoneNo: '(659) 768-1869', status: 'passed' },
    { batchName: 'ITU_03', empId: '10290', emailId: 'devphil@sbcglobal.net', phoneNo: '(659) 768-1869', status: 'passed' },
    { batchName: 'ITU_04', empId: '10290', emailId: 'cliffski@me.com', phoneNo: '(659) 768-1869', status: 'passed' },
    { batchName: 'ITU_05', empId: '10290', emailId: '22 june 2020', phoneNo: '(659) 768-1869', status: 'passed' },

]

const createBatches = {
    batchName: '',
    trainingType: '',
    endDate: '',
    startDate: '',
    course: '',
    instructor: ''

}
const Participant = () => {
    const [configuration, setConfiguration] = useState({
        columns: {
            "batchName": {
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
            "status": {
                "title": "Status",
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

    const activityData = [
        { icon: ICN_ON_GOING, name: 'Assigned', data: '15' },
        { icon: ICN_PROGRESS, name: 'In Progress', data: '10' },
        { icon: ICN_COMPLETED, name: 'Completed', data: '8' },
        { icon: ICN_PASSED, name: 'Passed', data: '7' },
    ]
    return (<div className="table-shadow p-3">
        <div className="flx full-h">
            <div className="box-shadow flx1 p-2 mr-3">
                <div className="user-profile-container">
                    <div className="jcb">
                        <div className="user-pf">Us</div>
                    </div>

                    <div className="jcb mt-2">
                        <Button>{ICN_EMAIL_W} <span className="pl-3">Email</span></Button>
                        <Button>{ICN_TEXT_W} <span className="pl-3">Text</span></Button>

                    </div>
                </div>
            </div>
            <div className="flx3">
                <div className="jcb">
                    {activityData.map((p, i) => <div key={i} className="user-activity">
                        <div className="activities-btn">
                            {p.icon}
                        </div>
                        <div className="jcb-c text-right">
                            <div className="title-lg">{p.data}</div>
                            <div className="title-sm">{p.name}</div>
                        </div>
                    </div>)}

                </div>
                <div>
                    {/* ..........Analytic......... */}
                    <Card title="Activities" >
                        <DynamicTable {...{ configuration, sourceData: dummyData }} />
                        <div className="pagination-div">
                            <PaginationOne totalCount={30} onNavigate={(pageNumber) => console.log(pageNumber)} />

                        </div>
                    </Card>
                </div>
            </div>
        </div>

    </div>)
}
export default Participant