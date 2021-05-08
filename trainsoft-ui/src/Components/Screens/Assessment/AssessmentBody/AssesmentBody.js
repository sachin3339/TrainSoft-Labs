import React, { useContext, useState } from "react";
import { AssessmentContext } from "../AssesementContext";
import { IntroDialog } from "../IntroDialog";
import styles from "./AssessmentBody.module.css";
import Header from "./Header";
import Main from "./Main";

const AssessmentBody = () => {
  const {
    instruction,
    questions
  } = useContext(AssessmentContext);
  const [introDialog, setIntroDialog] = useState(true);

  return (
    <div className={styles.container}>
      <IntroDialog {...{open: introDialog, setOpen: setIntroDialog}} />
      <Header {...{introDialog, instruction}} />
      <Main {...{questions: questions}}/>
    </div>
  );
};

export default AssessmentBody;
