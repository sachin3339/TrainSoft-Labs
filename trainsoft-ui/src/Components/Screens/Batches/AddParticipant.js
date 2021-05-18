import { useState, useEffect, useContext } from "react";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { Button } from "../../Common/Buttons/Buttons";
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
import SearchBox from "../../Common/SearchBox/SearchBox";

const AddParticipant = ({ show, setShow, sid, getParticipant }) => {
    const { user, spinner, ROLE } = useContext(AppContext)
    const [count, setCount] = useState(0)
    const Toast = useToast()
    const [participant, setParticipant] = useState([])
    const [selectedSid, setSelectedSid] = useState([])
    const [searchValue, setSearchValue] = useState([])
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
        actions: [],
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


    // get all getLearner
    const getLearner = async (pagination = 1) => {
        try {
            let pageSize = 500
            spinner.show();
            RestService.getBatchLearner(sid).then(
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
                    setSearchValue(val)
                    spinner.hide();
                },
                err => {
                    console.error("error occur on getLearner()", err)
                    spinner.hide();
                }
            )
        } catch (err) {
            console.error("error occur on getLearner()", err)
            spinner.hide();
        }
    }


    // get user count
    const associateParticipant = async () => {
        try {
            RestService.associateParticipant(sid, selectedSid).then(
                response => {
                    Toast.success({ message: "Participant added successfully" })
                    getParticipant()
                    setShow(false)
                },
                err => {
                    spinner.hide();
                    setShow(false)
                }
            ).finally(() => {
                spinner.hide();
                setShow(false)
            });
        } catch (err) {
            setShow(false)
            console.error("error occur on getAllBatch()", err)
        }
    }

    // on search
    const onSearch = (e) => {
        try {
            setSearchValue(participant.filter(res => res.emailId.toUpperCase().indexOf(e.toUpperCase()) > -1))
        } catch (err) {
            console.error("error occur on onSearch()", err)
        }
    }

    useEffect(() => {
        getLearner()
    }, [])

    return (<>
        <BsModal {...{
            show,
            setShow,
            headerTitle: "Add Participant",
            headerAction: <SearchBox {...{ onChange: (e) => onSearch(e), onEnter: () => { }, clearField: () => { } }} />,
            size: "xl"
        }}>
            <div className="partiContainer">
                <DynamicTable {...{ configuration, sourceData: searchValue, onSelected: (e) => { setSelectedSid(e.map(r => r.vSid)); } }} />

            </div>
            <div className="jce mt-2">
                <Button className="mx-2" onClick={() => { setShow(true); associateParticipant() }}>Add</Button>
            </div>
        </BsModal>
    </>)

}
export default AddParticipant