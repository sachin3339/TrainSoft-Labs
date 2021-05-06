import { Category } from "@material-ui/icons";
import { useEffect, useState,useContext } from "react";
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import AssessmentContext from "../../../../Store/AssessmentContext";
import useToast from "../../../../Store/ToastHook";
import { Button } from "../../../Common/Buttons/Buttons";

import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { ICN_EDIT, ICN_TRASH } from "../../../Common/Icon";

import { Link, navigate } from "../../../Common/Router";
let val ={
  autoSubmitted: true,
  category: "",
  description: "",
  difficulty: "BEGINNER",
  duration: 0,
  mandatory: true,
  multipleSitting: true,
  negative: true,
  nextEnabled: true,
  pauseEnable: true,
  premium: false,
  previousEnabled: true,
  status: "ENABLED",
  tagSid: "",
  title: "",
  topicSid: "",
  validUpto: true,
  date:'',
}
const AssesmentsTable = ({ location }) => {
  const Toast = useToast()
  const {spinner,user} = useContext(AppContext)
  const {topicSid,setInitialAssessment,category} = useContext(AssessmentContext)
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
            <Link onClick={()=>setInitialAssessment(data)}
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
        onClick: (data, i) => { initialStateConfig(data);navigate("create-assessment",{state :{ title: "Topic",
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

  const initialStateConfig = (values)=>{
    let data = {
      ...values,
      category: getCategory(values.category),
      tagSid: getCategory(values.category)?.tags.find(res=> res.sid === values.tagSid),
      validUpto: values.validUpto === 0 ? true : false,
      date: values.validUpto === 0 ? '' : values.validUpto,
      duration: values.duration === 0 ? true : false,
      timeLimit: values.duration == 0 ? 0 : values.duration 
    }
    setInitialAssessment(data)
  }

  const getCategory =(vals)=>{
    return category.find(res=>res.name === vals)
  }

  // get All Assessment By Topic sid
  const getAssessmentByTopic = async (pageNo="1") => {
         spinner.hide("Loading... wait");
    try {
        RestService.getAssessmentByTopic(topicSid,GLOBELCONSTANT.PAGE_SIZE,pageNo-1).then(
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

      // search assesment 
      const searchAssessment = async (value) => {
        spinner.show("Loading... wait");
        try {
          let {data} = await RestService.searchAssessment(value,user.companySid,topicSid)
          setAssessment(data);
          spinner.hide();
        } catch (err) {
          spinner.hide();
          console.error("error occur on searchTopic()", err)
        }
      }

useEffect(()=>{
  getAssessmentByTopic()
},[])

  return (
    <>
      <CardHeader
        {...{location,
          onChange: (e) => e.length === 0 && getAssessmentByTopic(),
          onEnter: (e) => searchAssessment(e),
        }}
      >
        <Button className=" ml-2" 
           onClick={()=>{ setInitialAssessment(val); navigate("create-assessment",{state :{ title: "TOPIC",
           subTitle: "Topic",
           path: "topicAssesment",}})}}
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
