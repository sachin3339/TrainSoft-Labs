import { useState } from "react";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import DynamicTable from "../../../Common/DynamicTable/DynamicTable";

const DashboardTab = () => {
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([
    {
      name: "JRaymond",
      type: "Submitted",
      sid: "1",
    },
  ]);
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
      questions: {
        title: "EMAIL",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      type: {
        title: "SUBMISSION STATUS",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
        render: (data) => (
          <div style={{ color: data.type === "submitted" ? "#1C9B60" : "" }}>
            {data.type}{" "}
          </div>
        ),
      },
      category: {
        title: "SUBMITTED ON",
        sortDirection: null,
        sortEnabled: true,
        isSearchEnabled: false,
      },
      difficulty: {
        title: "SUBMITTED ON",
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
    actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
    actionVariant: "", // user can pass action button variant like primary, dark, light,
    actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
    // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
    // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
    searchQuery: "",
    tableCustomClass: "ng-table sort-enabled", // table custom class

    clearSelection: false,
  });
  return (
    <>
      <div style={{ paddingTop: "30px" }}>
        <Headers />
      </div>
      <div className="table-shadow">
        <DynamicTable
          {...{
            configuration,
            sourceData: questions,
            // onPageChange: (e) => getCourse(e),
            count,
          }}
        />
      </div>
    </>
  );
};

const Headers = () => {
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
        stat={"5 Apr 2021"}
        icon={<FlagOutlinedIcon style={{ fontSize: "36px" }} />}
      >
        Assesment <br />
        Start On
      </HeaderElement>
      <HeaderElement
        stat={"13"}
        substat={"13"}
        icon={<FlagOutlinedIcon style={{ fontSize: "36px" }} />}
      >
        Total <br />
        Submitted
      </HeaderElement>
      <HeaderElement
        stat={"100%"}
        icon={<FlagOutlinedIcon style={{ fontSize: "36px" }} />}
      >
        Assensee <br />
        Attendance
      </HeaderElement>
      <HeaderElement
        stat={"20"}
        icon={<FlagOutlinedIcon style={{ fontSize: "36px" }} />}
      >
        Total <br />
        Questions
      </HeaderElement>
      <HeaderElement
        stat={"98%"}
        icon={<FlagOutlinedIcon style={{ fontSize: "36px" }} />}
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
