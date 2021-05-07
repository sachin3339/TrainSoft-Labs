import { useState } from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CreateStep1 from "./CreateStep1";
import CreateStep2 from "./CreateStep2";
import CreateStep3 from "./CreateStep3";
import CreateStep4 from "./CreateStep4";
import CreateStep5 from "./CreateStep5";
import "../topic.css";


const CreateAssessment = ({ location }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 
  function getSteps() {
    return ['Assessment Info', 'Assessment Rules', 'Questions',"Assessees","Complete"];
  }

  return (
    <>
      <div className="ass-step">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
        <div className="table-shadow " style={{ padding: "10px 40px 10px 40px" }}>
        {activeStep === 0 && <><CreateStep1 {...{handleNext,handleBack}}/></>}
        {activeStep === 1 && <><CreateStep2 {...{handleNext,handleBack}} /></>}
        {activeStep === 2 && <><CreateStep3 {...{handleNext,handleBack}} /></>}
        {activeStep === 3 && <><CreateStep4 {...{handleNext,handleBack}} /></>}
        {activeStep === 4 && <><CreateStep5 {...{handleNext,handleBack}} /></>}
      </div>
    </>
  );
};


export default CreateAssessment;
