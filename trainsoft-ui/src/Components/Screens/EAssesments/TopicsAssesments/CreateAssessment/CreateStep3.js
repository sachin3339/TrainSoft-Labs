import { useEffect, useState, useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import Submit from "../../../Assessment/common/SubmitButton";
import DynamicTable from "../../../../Common/DynamicTable/DynamicTable";
import { ICN_DELETE, ICN_EDIT } from "../../../../Common/Icon";
import QuestionModel from "./QuestionModel";
import AssessmentContext from "../../../../../Store/AssessmentContext";
import { navigate } from "../../../../Common/Router";
import "../topic.css";


const CreateStep3 = ({ location, handleNext, handleBack }) => {
    const Toast = useToast()
    const { initialAssessment } = useContext(AssessmentContext)
    const { spinner } = useContext(AppContext)
    const [questions, setQuestion] = useState([])
    const [showQuestion, setShowQuestion] = useState(false)

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
            "difficulty": {
                "title": "Difficulty",
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
        actions: [
            {
                "title": "Delete",
                "icon": ICN_DELETE,
                "onClick": (data) => {deleteQuestion(data.sid) }
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

    // get All question
    const getAllQuestion = async (pageNo = "1") => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getAssociateQuestion(initialAssessment.sid, 200, 0)
            setQuestion(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAllTopic()", err)
        }
    }

    // delete associate question
    const deleteQuestion = async (sid) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.deleteAssociateQuestion(sid,initialAssessment.sid)
            Toast.success({ message: 'Question deleted successfully', time: 2000 });
            getAllQuestion()
            spinner.hide();
        } catch (err) {
            Toast.error({ message: err.response?.data?.message, time: 2000 });
            spinner.hide();
            console.error("error occur on getAllTopic()", err)
        }
    }

    useEffect(() => {
        getAllQuestion()
    }, [])

    return (
        <>
            <div className="jcb">
                <div></div><div className="mb-2">
                    <Submit onClick={() => { setShowQuestion(true) }}>Add Question</Submit>
                </div>
            </div>
            {questions && <DynamicTable {...{ configuration, sourceData: questions }} />}
            <div className="ass-foo-border">
                <div>
                    <Submit onClick={handleBack} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}> Back</Submit>
                </div>

                <div>
                    <Submit  onClick={()=>{navigate("topic-details",{state :{ title: "Topics",
                                 subTitle: "Assessment",
                                 path: "topicAssesment",}})}} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
                        Cancel
                  </Submit>
                    <Submit onClick={handleNext}>Next</Submit>
                </div>
            </div>
            { showQuestion && <QuestionModel {...{ show: showQuestion, setShow: setShowQuestion, allQuestion: getAllQuestion }} /> }
        </>


    );
};


export default CreateStep3;
