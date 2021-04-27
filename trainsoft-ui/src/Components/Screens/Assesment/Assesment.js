import { useContext } from "react";
import { AssesmentContext, AssesmentProvider } from "./AssesementContext";
import AssesmentBody from "./AssesmentBody/AssesmentBody";
import { AssesmnetDialog } from "./AssesmentDialog";

import Sidebar from "./Sidebar/Sidebar";

const Assesment = () => {
  return (
    <AssesmentProvider>
      <Content />
    </AssesmentProvider>
  );
};

const Content = () => {
  const { dialogOpen } = useContext(AssesmentContext);
  return (
    <>
      {dialogOpen ? (
        <AssesmnetDialog />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <AssesmentBody />
        </div>
      )}
    </>
  );
};

export default Assesment;
