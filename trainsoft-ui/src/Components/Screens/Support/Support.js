import React, { useState } from 'react'
import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_TRASH, ICN_EDIT } from "../../Common/Icon";
import { navigate, Router,Link } from "../../Common/Router";
import { Formik } from "formik"
import { Button } from "../../Common/Buttons/Buttons"
import { TextArea } from "../../Common/InputField/InputField"
import CardHeader from '../../Common/CardHeader'
import { TextInput, SelectInput } from '../../Common/InputField/InputField'
import "./style.css";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import moment from 'moment'
import {Helmet} from "react-helmet";
import { BsCheckbox } from '../../Common/BsUtils';


const Support = ({location})=>{
    return(<>
             <Helmet>
                <title>Support</title>
                 <script type='text/javascript' id='myscript_58'>var d=document,c='createElement',ac='appendChild',b=d.body;const eschatInitiatedBy = 'ES_EMBEDDED';const vcSid='DA8DCE0753D14EABAC4E60121C808D906E5E8D472A8249AF9DAA6C415155B2A4';var glcp = (('https:' == document.location.protocol) ? 'https://' : 'http://');const esHst ='https://www.eservecloud.com';var v1 = Math.random();var s = d[c]('script');s.type = 'text/javascript';s.async = true;var scriptId = 'myscript_58';s.src = esHst + '/clientchat/apps/js/visualconnect.loader.min.js?' + 'v=' + v1;var script = d.getElementsByTagName('script')[0];script.parentNode.insertBefore(s, script);</script>
            </Helmet>
        <div className="table-shadow p-3">
        <CardHeader {...{location}}/>
          <div className="flx storeTab-shadow mb-3">
              <TabBtn active={location.state.subPath === "support"} onClick={()=>navigate("/support",{state: { title: 'SUPPORT',subTitle:"", subPath:"support" }})}>Raise a ticket</TabBtn>
              <TabBtn  active={location.state.subPath === "history"} onClick={()=>navigate("/support/history",{state: { title: 'SUPPORT',subTitle:"History", subPath:"history"  }})}>History</TabBtn> 
          </div>
          <Router>
                <SupportContainer path="/"/>
                <SupportHistory path="history"/>
          </Router>

          
    </div></>)
}
export default Support

const SupportContainer = ({location})=>{
    return (<div className="">

            <div className="row">
                <div className="col-md-6">
                <Formik
                            initialValues={{
                                "ticketType": '',
                                "subject": '',
                                "description":''
                            }}
                            // validationSchema={schema}
                            onSubmit={(values) => console.log(values)}>
                            {({ handleSubmit }) => (<>
                                <form onSubmit={handleSubmit}>
                                    <SelectInput name="ticketType" label="Ticket Type" option={['Course',"Calender",'Reports','Lab Store','VS Code','Compiler']}/>
                                    <TextInput name="subject" label="subject"/>
                                    <TextArea name="description" label="Problem description" />
                                    <div className="text-right mt-4">
                                        <Button type="submit" className="px-4">Submit</Button>
                                    </div>
                                </form>
                            </>)}

                        </Formik>
                </div>
                <div className="col-md-6">
                    <div className="box-shadow bg-light">
                            <div className="title-md text-center">Common FAQs</div>
                    </div>
                </div>
            </div>
</div>)
}

const SupportHistory = ({location})=>{
    const value = [
        {tid:'1232',ticketType:'Course',raisedDate:'15/03/2021',creationDate:'15/03/2021',status:'Completed'},
        {tid:'1232',ticketType:'Report',raisedDate:'15/03/2021',creationDate:'15/03/2021',status:'Closed'},
        {tid:'1232',ticketType:'Batches',raisedDate:'15/03/2021',creationDate:'15/03/2021',status:'In Progress'},
        {tid:'1232',ticketType:'Lab Store',raisedDate:'15/03/2021',creationDate:'15/03/2021',status:'Open'},
        {tid:'1232',ticketType:'Course',raisedDate:'15/03/2021',creationDate:'15/03/2021',status:'Completed'}

    ]
    const [configuration, setConfiguration] = useState({
        columns: {
            "tid": {
                "title": "Ticket ID",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "ticketType": {
                "title": "Ticket Type",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "raisedDate": {
                "title": "Raised Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            }
            ,
            "creationDate": {
                "title": "Creation Date",
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
                render: (data) => moment(data.createdOn).format('Do MMMM YYYY')
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
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: true,
        clearSelection: false
    });
    return (<div className="">
            <div className="flx mb-3 ml-3">
                    <BsCheckbox label="Closed" id="Closed"/>
                    <BsCheckbox className="mx-4"  label="Open" id="open"/>
                    <BsCheckbox label="In Progress" id="inProgress"/>
            </div>
           <DynamicTable {...{ configuration, sourceData: value }} />
</div>)
}


