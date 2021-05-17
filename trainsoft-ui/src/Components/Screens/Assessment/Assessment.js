import { useContext } from "react";
import { AssessmentContext, AssessmentProvider } from "./AssesementContext";
import { AssessmentDialog } from "./AssesmentDialog";
import AssessmentBody from "./AssessmentBody/AssesmentBody";
import Sidebar from "./Sidebar/Sidebar";

const Assessment = () => {
  return (
    <AssessmentProvider>
      <Content />
    </AssessmentProvider>
  );
};

const Content = ({location}) => {
  const { dialogOpen } = useContext(AssessmentContext);

  return <>
    {
      dialogOpen
        ? <AssessmentDialog {...{location}}/>
        : <div style={{ display: "flex" }}>
          <Sidebar />
          <AssessmentBody {...{location}}/>
        </div>
    }
  </>;
};

export default Assessment;
