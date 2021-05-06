import { useEffect, useState,useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Formik } from "formik";
import {
  TextInput,
  SelectInput,
  RadioBox,
  TextArea,
  DateInput,
  RadioBoxKey,
} from "../../../../Common/InputField/InputField";
import { Form } from "react-bootstrap";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import CardHeader from "../../../../Common/CardHeader";
import Submit from "../../../Assessment/common/SubmitButton";


import "../topic.css";
import AssessmentContext from "../../../../../Store/AssessmentContext";

const CreateStep2 = ({ location,handleNext,handleBack }) => {
  const {setAssessmentVal,assessmentVal,topicSid,initialAssessment} = useContext(AssessmentContext)

  const Toast = useToast()
  const {spinner} = useContext(AppContext)


// Create Topic
const createAssessment = async (val) => {
  spinner.hide("Loading... wait");
  try {
   let payload = assessmentVal
       payload.duration = 45
       payload.mandatory = val.mandatory 
       payload.multipleSitting = val.multipleSitting 
       payload.topicSid = topicSid
       payload.tagSid = assessmentVal.tagSid.sid ? assessmentVal.tagSid.sid : assessmentVal.tagSid 
       payload.category = assessmentVal.category.name ? assessmentVal.category.name : assessmentVal.category
       if(assessmentVal.sid !== undefined){
          let {data} = await RestService.updateAssessment(payload)
          Toast.success({ message: "Assessment updated successfully" })
          setAssessmentVal(data)
       }else{
        let {data} = await RestService.createAssessment(payload)
        Toast.success({ message: "Assessment created successfully" })
        setAssessmentVal(data)
       }
        handleNext()
        spinner.hide()
   } catch (err) {
    spinner.hide()
     console.error("error occur on createAssessment()", err)
   }
  }

  return (
    <>
          <Formik
            onSubmit={(value) => createAssessment(value)}
            initialValues={initialAssessment}  
            // validationSchema={schema}
          >
            {({ handleSubmit, isSubmitting, dirty, setFieldValue ,values}) => (
              <form onSubmit={handleSubmit} className="create-batch">
                <div>
            
                  <Form.Group className="flx">
                    <div >
                    <Form.Label className="label">
                    Time limit
                    </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBoxKey name="duration" options={[{label:"No Limit",value:true}, {label:"Set Limit",value:false}]} />
                    </div>
                    </div>
                    <div>
                        {/* <DateInput name="duration"/> */}
                    </div>
                  </Form.Group>
                  <Form.Group style={{ width: "60%" }}>
                   
                    <Form.Group>
                    <Form.Label className="label">
                       Assessment Sitting
                     </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBoxKey name="multipleSitting" options={[{label:"Single",value:true}, {label:"Multiple",value:false}]} />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="label">
                       All Questions mandatory
                     </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBoxKey name="mandatory" options={[{label:"Yes",value:true}, {label:"No",value:false}]} />
                    </div>
                  </Form.Group>
                  </Form.Group>
                </div>
                <div className="ass-foo-border">
                  <div>
                    <Submit onClick={handleBack} style={{background: "#0000003E", color: "black",marginRight: "10px", }}> Back</Submit>
                  </div>
                  
                  <div>
                  <Submit style={{background: "#0000003E", color: "black",marginRight: "10px", }}>
                    Cancel
                  </Submit>
                  <Submit onClick={()=>createAssessment(values) }>Next</Submit>
                  </div>
                </div>
              </form>
            )}
          </Formik> 
    </>
  );
};


export default CreateStep2;
