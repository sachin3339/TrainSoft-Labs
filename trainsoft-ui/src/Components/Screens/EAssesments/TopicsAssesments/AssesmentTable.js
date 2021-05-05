import { useEffect, useState,useContext } from "react";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import AssessmentContext from "../../../../Store/AssessmentContext";
import useToast from "../../../../Store/ToastHook";
import { Button } from "../../../Common/Buttons/Buttons";

import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { ICN_EDIT, ICN_TRASH } from "../../../Common/Icon";

import { Link, navigate } from "../../../Common/Router";

const AssesmentsTable = ({ location }) => {
  const Toast = useToast()
  const {spinner} = useContext(AppContext)
  const {topicSid,setInitialAssessment} = useContext(AssessmentContext)
  const [count, setCount] = useState(0);
  const [assessment,setAssessment] = useState([])

  const [configuration, setConfiguration] = useState({
    columns: {
      title: {
        title: "Assesment Name",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <Link
              to={"assesment-details"}
              state={{
                title: "Topic",
                subTitle: "Assesment",
                path: "topicAssesment",
                rowData: data,
                sid: data.sid,
              }}
              className="dt-name"
              style={{ marginLeft: "10px" }}
            >
              {data.title}
            </Link>
          </div>
        ),
      },
      noOfQuestions: {
        title: "Questions",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      type: {
        title: "Type",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render:(data)=> data.type === true ? "Premium": "Free" 
      },
      category: {
        title: "Category",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      difficulty: {
        title: "Difficulty",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      validity: {
        title: "Validity",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
    },
    headerTextColor: "#454E50", // user can change table header text color
    sortBy: null, // by default sort table by name key
    sortDirection: false, // sort direction by default true
    updateSortBy: (sortKey) => {
      configuration.sortBy = sortKey;
      Object.keys(configuration.columns).map(
        (key) =>
          (configuration.columns[key].sortDirection =
            key === sortKey ? !configuration.columns[key].sortDirection : false)
      );
      configuration.sortDirection =
        configuration.columns[sortKey].sortDirection;
      setConfiguration({ ...configuration });
    },
    actions: [
      {
        title: "Edit",
        icon: ICN_EDIT,
        onClick: (data, i) => { setInitialAssessment(data);navigate("create-assessment",{state :{ title: "Topic",
        subTitle: "Assessment",
        data: data,
        path: "topicAssesment",}}) }
      },
      {
        title: "Delete",
        icon: ICN_TRASH,
        onClick: (data) => deleteAssessment(data.sid),
      },
    ],
    actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
    actionVariant: "", // user can pass action button variant like primary, dark, light,
    actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
    // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
    // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
    searchQuery: "",
    tableCustomClass: "ng-table sort-enabled", // table custom class
    // showCheckbox: true,
    clearSelection: false,
  });

  // get All Assessment By Topic sid
  const getAssessmentByTopic = async (pageNo) => {
         spinner.hide("Loading... wait");
    try {
        RestService.getAssessmentByTopic(topicSid).then(
            response => {
              setAssessment(response.data);
            },
            err => {
                spinner.hide();
            }
        ).finally(() => {
            spinner.hide();
        });
    } catch (err) {
        console.error("error occur on getAllTopic()", err)
    }
}

  // delete assessmsnt
  const deleteAssessment = async (sid) => {
    spinner.show("Loading... wait");
    try {
      let response = await RestService.deleteAssessment(sid)
      getAssessmentByTopic()
      Toast.success({ message: "Assessment deleted successfully" })
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }

useEffect(()=>{
  getAssessmentByTopic()
},[])

  return (
    <>
      <CardHeader
        location={{
          ...location,
        }}
      >
        <Button className=" ml-2" 
           onClick={()=> navigate("create-assessment",{state :{ title: "TOPIC",
           subTitle: "Topic",
           path: "topicAssesment",}})}
        >+ New Assesment</Button>
      </CardHeader>

      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: assessment,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};

export default AssesmentsTable;
