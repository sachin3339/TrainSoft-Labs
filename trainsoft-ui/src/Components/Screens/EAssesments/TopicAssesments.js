import CardHeader from "../../Common/CardHeader";
import { Router } from "../../Common/Router";
import { useState } from "react";
import QuestionsTab from "./TopicsAssesments/QuestionsTab";
import AssesmentInfoTab from "./TopicsAssesments/AssesmentsInfoTab";
import DashboardTab from "./TopicsAssesments/DashboardTab";
import TopicsTable from "./TopicsAssesments/TopicsTable";
import AssesmentsTable from "./TopicsAssesments/AssesmentTable";
import CreateAssessment from "./TopicsAssesments/CreateAssessment/CreateAssessment";
import { AssessmentProvider } from "../../../Store/AssessmentContext";

const AssesmentDetails = ({ location }) => {
  const [active, setActive] = useState("Dashboard");
  return (
    <>
      <CardHeader
        {...{location,hideSearch:true}}
      ></CardHeader>
      <div style={{ paddingTop: "30px" }}>
        <Tabs
          setActive={setActive}
          tabs={[
            {
              title: "Dashboard",
            },
            { title: "Assesment Details" },
            { title: "Questions" },
          ]}
          active={active}
        />
        {active === "Dashboard" && <DashboardTab />}
        {active === "Assesment Details" && <AssesmentInfoTab />}
        {active === "Questions" && <QuestionsTab />}
      </div>
    </>
  );
};

const TopicAssesment = () => {
  return (
    <Router>
      <TopicsTable path="/" />
      <CreateAssessment path="create-assessment"/>
      <AssesmentsTable path="topic-details" />
      <AssesmentDetails path="topic-details/assesment-details" />
    </Router>
  );
};

const Tabs = ({ tabs, active, setActive }) => {
  return (
    <div
      style={{
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.2)",
        display: "flex",
      }}
    >
      {tabs.map((_tab) => (
        <div
          onClick={() => setActive(_tab?.title)}
          style={{
            borderBottom: `3px solid ${
              active === _tab?.title ? "#FECD48" : "transparent"
            }`,
            padding: "5px 30px",
            color: "#111111",
            font:
              active === _tab?.title
                ? "normal normal 600 13px/16px Montserrat"
                : " normal normal normal 13px/16px Montserrat",
            cursor: "pointer",
          }}
        >
          {_tab?.title}
        </div>
      ))}
    </div>
  );
};

export default TopicAssesment;
