import { useState, useEffect, useContext } from "react";
import DynamicTable from "../../../../Common/DynamicTable/DynamicTable";
import { Dropdown, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import { ICN_EDIT, ICN_DELETE, ICN_TRASH } from "../../../../Common/Icon";
import { Button,Cancel } from "../../../../Common/Buttons/Buttons";
import { BsModal } from "../../../../Common/BsUtils";
import SearchBox from "../../../../Common/SearchBox/SearchBox";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import AssessmentContext from "../../../../../Store/AssessmentContext";

const QuestionModel = ({ show, setShow, sid, getParticipant,allQuestion }) => {
  const {assessmentVal,initialAssessment} = useContext(AssessmentContext)
    const { user, spinner, ROLE } = useContext(AppContext)
    const [count, setCount] = useState(0)
    const Toast = useToast()
    const [participant, setParticipant] = useState([])
    const [selectedSid, setSelectedSid] = useState([])
    const [searchValue, setSearchValue] = useState([])
    const [question,setQuestion] = useState([])

    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Question",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data)=> <div className="elps hidden" title={data.name}>{data.name}</div>
            },
            "questionType": {
                "title": "Type",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "technologyName": {
                "title": "Tag",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "difficulty": {
                "title": "Difficulty",
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




    // get All topic
  const getAllQuestion = async () => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getNotAssociateQuestion(initialAssessment.sid)
      setQuestion(data);
      setSearchValue(data)
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }


    // get user count
    const associateQuestion = async () => {
        try {
            let payload = {
                "questionSidList":selectedSid,
                "assessmentSid": assessmentVal.sid
              }
            RestService.associateQuestion(sid, payload).then(
                response => {
                    Toast.success({ message: "Question added successfully" })
                    allQuestion()
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
            console.error("error occur on associateQuestion()", err)
        }
    }

    const onSearch = (e) => {
        try {
            setSearchValue(question.filter(res => res.name.toUpperCase().indexOf(e.toUpperCase()) > -1))
        } catch (err) {
            console.error("error occur on onSearch()", err)
        }
    }

    useEffect(() => {
        getAllQuestion()
    }, [])

    return (<>
        <BsModal {...{
            show,
            setShow,
            headerTitle: "Upload Question",
            headerAction: <SearchBox {...{ onChange: (e) => onSearch(e), onEnter: () => { }, clearField: () => { } }} />,
            size: "xl"
        }}>
            <div className="partiContainer">
                <DynamicTable {...{ configuration, sourceData: searchValue, onSelected: (e) => {console.log(e); setSelectedSid(e.map(r => r.sid)); } }} />
            </div>
            <div className="jce mt-2">
               <Cancel className="mx-2" onClick={() => { setShow(false) }}>Cancel</Cancel>
                <Button className="mx-2" onClick={() => { setShow(true); associateQuestion() }}>Add Question({selectedSid.length})</Button>
            </div>
        </BsModal>
    </>)

}
export default QuestionModel