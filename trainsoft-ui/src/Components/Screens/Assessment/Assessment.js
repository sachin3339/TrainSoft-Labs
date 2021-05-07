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

const Content = () => {
  const { dialogOpen } = useContext(AssessmentContext);

  return <>
    {
      dialogOpen
        ? <AssessmentDialog />
        : <div style={{ display: "flex" }}>
          <Sidebar />
          <AssessmentBody />
        </div>
    }
  </>;
};

export default Assessment;
