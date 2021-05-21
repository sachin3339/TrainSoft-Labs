import { useEffect, useState, useContext } from "react";
import moment from "moment";
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import AssessmentContext from "../../../../Store/AssessmentContext";
import useToast from "../../../../Store/ToastHook";
import { Button, Cancel } from "../../../Common/Buttons/Buttons";
import CardHeader from "../../../Common/CardHeader";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import { ICN_EDIT, ICN_TRASH } from "../../../Common/Icon";
import { Link, navigate } from "../../../Common/Router";

const AssesmentsTable = ({ location }) => {
  const Toast = useToast()
  const { spinner, user } = useContext(AppContext)
  const { topicSid, setInitialAssessment, category } = useContext(AssessmentContext)
  const [assessment, setAssessment] = useState([])

  let val = {
    autoSubmitted: true,
    categorySid: category[0],
    description: "",
    difficulty: "BEGINNER",
    duration: false,
    mandatory: true,
    multipleSitting: true,
    negative: true,
    nextEnabled: true,
    pauseEnable: true,
    premium: false,
    previousEnabled: true,
    status: "ENABLED",
    tagSid: category[0]?.tags[0],
    title: "",
    topicSid: "",
    validUpto: true,
    date: '',
    timeLimit: 10
  }

  const [configuration, setConfiguration] = useState({
    columns: {
      title: {
        title: "Assessment Name",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <Link onClick={() => setInitialAssessment(data)}
              to={"assesment-details"}
              state={{
                title: "Topics",
                subTitle: "Assessment",
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
        render: (data) => data.type === true ? "Premium" : "Free"
      },
      categorySid: {
        title: "Category",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render : (data) => getCategory(data.categorySid)?.name
      },
      difficulty: {
        title: "Difficulty",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      validUpto: {
        title: "Validity",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => data.validUpto === 0 ? "No Limit" : moment(data.validUpto).format("DD/MM/YYYY")
      },
      validUpto: {
        title: "",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => <>
          <div className="copy-url-btn" onClick={() => copyUrl()}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg> Copy Url</div>
          <div className="copy-url-disp" id="copy_url2">
            {`https://www.trainsoft.io/assessment/${data.sid}/${user.companySid}/0`}
          </div>
        </>
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
        onClick: (data, i) => {
          initialStateConfig(data); navigate("create-assessment", {
            state: {
              title: "Topics",
              subTitle: "Assessment",
              data: data,
              path: "topicAssesment",
            }
          })
        }
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

  const initialStateConfig = (values) => {
    let data = {
      ...values,
      categorySid: getCategory(values.categorySid),
      tagSid:  getCategory(values.categorySid,values.tagSid),
      validUpto: values.validUpto === 0 ? true : false,
      date: values.validUpto === 0 ? '' : values.validUpto,
      duration: values.duration === 0 ? true : false,
      timeLimit: values.duration === 0 ? 5 : values.duration
    }
    setInitialAssessment(data)
  }

  const getCategory = (vals,tagSid=null) => {
    let value = '';
    let tags = '';
    try {
      value = category.find(res => res.sid === vals)
      tags = tagSid && value.tags.find(res => res.sid === tagSid)
    } catch (err) {
      console.error("error occur on getCategory()", err)
    }
    return tagSid ?  tags : value
  }

  // get All Assessment By Topic sid
  const getAssessmentByTopic = async (pageNo = "1") => {
    spinner.show("Loading... wait");
    try {
      RestService.getAssessmentByTopic(topicSid, GLOBELCONSTANT.PAGE_SIZE, pageNo - 1).then(
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
      spinner.hide();
      console.error("error occur on getAllTopic()", err)
    }
  }

  // delete assessment
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

  // search assessment 
  const searchAssessment = async (value) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.searchAssessment(value, user.companySid, topicSid)
      setAssessment(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on searchTopic()", err)
    }
  }

  const copyUrl = () => {
    let copyText = document.getElementById("copy_url2");
    let textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    Toast.success({ message: 'Url is copy successfully', time: 2000 });
  }

  useEffect(() => {
    getAssessmentByTopic()
  }, [])

  return (
    <>
      <CardHeader
        {...{
          location,
          onChange: (e) => e.length === 0 && getAssessmentByTopic(),
          onEnter: (e) => searchAssessment(e),
        }}
      >
        <Button className=" ml-2"
          onClick={() => {
            setInitialAssessment(val); navigate("create-assessment", {
              state: {
                title: "Topics",
                subTitle: "Topics",
                path: "topicAssesment",
              }
            })
          }}
        >+ New Assesment</Button>
      </CardHeader>

      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: assessment,
            onPageChange: (e) => getAssessmentByTopic(e),
            count: location?.state?.count === 0 ? 1 : location?.state?.count,
          }}
        />
      </div>
    </>
  );
};

export default AssesmentsTable;
