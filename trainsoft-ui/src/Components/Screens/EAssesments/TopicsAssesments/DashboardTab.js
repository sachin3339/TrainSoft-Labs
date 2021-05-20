import { useState, useContext, useEffect } from "react";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";
import AssessmentContext from "../../../../Store/AssessmentContext";
import RestService from "../../../../Services/api.service";
import moment from "moment";
import AppContext from "../../../../Store/AppContext";
import { ICN_ASSESS_ATTEND, ICN_TOTAL_AVG_SCORE, ICN_TOTAL_QUESTION,ICN_TOTAL_SUBMITTED } from "../../../Common/Icon";

const DashboardTab = () => {
  const { initialAssessment } = useContext(AssessmentContext)
  const { spinner } = useContext(AppContext)
  const [count, setCount] = useState(0);
  const [dashboardDate, setDashboardDate] = useState([])

  const [configuration, setConfiguration] = useState({
    columns: {
      name: {
        title: "ASSESSEE NAME",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ display: "flex", alginItems: "center" }}>
            <div className="dt-name">{data.name}</div>
          </div>
        ),
      },
      email: {
        title: "EMAIL",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      status: {
        title: "SUBMISSION STATUS",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ color: data.status === "SUBMITTED" ? "#1C9B60" : "" }}>
            {data.status}{" "}
          </div>
        ),
      },
      submittedOn: {
        title: "SUBMITTED ON",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (res) => res.submittedOn ? moment(res.submittedOn).format("DD/MM/YYYY") : '-'
      },
      score: {
        title: "SCORE",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (res) => <>{res.score ? `${res.score}%` : '-' }</>
      }
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
    actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
    actionVariant: "", // user can pass action button variant like primary, dark, light,
    actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
    // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
    // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
    searchQuery: "",
    tableCustomClass: "ng-table sort-enabled", // table custom class

    clearSelection: false,
  });

  // get All question
  const getDashBoard = async (pageNo = "1") => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getAssessmentDashboard(initialAssessment.sid)
      setDashboardDate(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getDashBoard()", err)
    }
  }


  useEffect(() => {
    getDashBoard()
  }, [])
  
  return (
    <>
      <div style={{ paddingTop: "30px" }}>
        <Headers {...{ initialAssessment, dashboardDate }} />
      </div>
      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: dashboardDate?.assessToList,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};



const Headers = ({ initialAssessment, dashboardDate }) => {
  return (
    <div
      style={{
        display: "flex",
        marginTOp: "70px",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      <HeaderElement
        stat={moment(dashboardDate?.assessmentStartedOn).format("DD/MM/YYYY")}
        icon={<FlagOutlinedIcon style={{ fontSize: "36px" }} />}
      >
        Assessment <br />
        Start On
      </HeaderElement>
      <HeaderElement
        stat={dashboardDate?.totalSubmitted}
        substat={`${dashboardDate?.totalUsers}`}
        icon={ICN_TOTAL_SUBMITTED}
      >
        Total <br />
        Submitted
      </HeaderElement>
      <HeaderElement
        stat={dashboardDate?.assessAttendance ? `${dashboardDate?.assessAttendance}%` : `${0}%` }
        icon={ICN_ASSESS_ATTEND}
      >
        Assessee <br />
        Attendance
      </HeaderElement>
      <HeaderElement
        stat={dashboardDate.totalQuestions ? dashboardDate.totalQuestions : 0}
        icon={ICN_TOTAL_QUESTION}
      >
        Total <br />
        Questions
      </HeaderElement>
      <HeaderElement
        stat={dashboardDate.batchAvgScore ? `${dashboardDate.batchAvgScore}%` : `${0}`}
        icon={ICN_TOTAL_AVG_SCORE}
      >
        Batch <br />
        Avg. Score
      </HeaderElement>
    </div>
  );
};

const HeaderElement = ({ children, icon, stat, substat }) => {
  return (
    <div
      style={{
        width: "190px",
        height: "120px",
        background: "white",
        boxShadow: "0px 0px 5px #0000003E",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>{children}</div>
        <div>{icon}</div>
      </div>
      <div
        style={{
          font: "normal normal 600 26px/16px Montserrat",
          color: "#49167E",
        }}
      >
        {stat}{" "}
        {substat && (
          <span
            style={{
              font: " normal normal 600 16px/16px Montserrat",
              color: "#333333",
            }}
          >
            {" "}
            / {substat}
          </span>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
