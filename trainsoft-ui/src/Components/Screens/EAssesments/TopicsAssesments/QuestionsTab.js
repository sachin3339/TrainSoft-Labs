import { useState,useContext,useEffect } from "react";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import AssessmentContext from "../../../../Store/AssessmentContext";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { ICN_DELETE } from "../../../Common/Icon";

const QuestionsTab = () => {
  const {initialAssessment} = useContext(AssessmentContext)
  const {spinner} = useContext(AppContext)

  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);
  const [configuration, setConfiguration] = useState({
    columns: {
        "name": {
            "title": "Question",
            render: (data) => <div className="hidden elps" title={data.name}>{data.name}</div>,
            "sortDirection": null,
            "sortEnabled": true,
            isSearchEnabled: false,
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
    actions: [],
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

useEffect(() => {
  getAllQuestion()
}, [])

  return (
    <>
      <div className="table-shadow" style={{ marginTop: "20px" }}>
        <DynamicTable
          {...{
            configuration,
            sourceData: question,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};

export default QuestionsTab;
