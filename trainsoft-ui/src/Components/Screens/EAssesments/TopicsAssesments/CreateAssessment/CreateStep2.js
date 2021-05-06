import { useContext } from "react";
import RestService from "../../../../../Services/api.service";
import AppContext from "../../../../../Store/AppContext";
import useToast from "../../../../../Store/ToastHook";
import { Formik } from "formik";
import {
  TextInput,
  RadioBoxKey,
} from "../../../../Common/InputField/InputField";
import { Form } from "react-bootstrap";
import Submit from "../../../Assessment/common/SubmitButton";
import { navigate } from "../../../../Common/Router";



import "../topic.css";
import AssessmentContext from "../../../../../Store/AssessmentContext";

const CreateStep2 = ({ location,handleNext,handleBack }) => {
  const {setAssessmentVal,assessmentVal,topicSid,initialAssessment,setInitialAssessment} = useContext(AssessmentContext)

  const Toast = useToast()
  const {spinner} = useContext(AppContext)


// Create Topic
const createAssessment = async (val) => {
  spinner.hide("Loading... wait");
  try {
    let payload = {
      autoSubmitted: true,
      category: initialAssessment.category.name ? initialAssessment.category.name : initialAssessment.category,
      description:val.description,
      difficulty: val.difficulty,
      duration: val.duration === true ? 0 : val.timeLimit,
      mandatory: val.mandatory,
      multipleSitting: val.multipleSitting ,
      negative: true,
      nextEnabled: true,
      pauseEnable: true,
      premium: val.premium,
      previousEnabled: true,
      status: "ENABLED",
      tagSid: initialAssessment.tagSid.sid ? initialAssessment.tagSid.sid : initialAssessment.tagSid ,
      title: val.title,
      topicSid: topicSid,
      validUpto: val.validUpto ? 0 : val.date,
    }
       if(initialAssessment.sid !== undefined){
          let {data} = await RestService.updateAssessment({...payload,"sid":val.sid,"url":val.url})
          Toast.success({ message: "Assessment updated successfully" })
          setAssessmentVal(data)
          setInitialAssessment(data)
       }else{
        let {data} = await RestService.createAssessment(payload)
        Toast.success({ message: "Assessment created successfully" })
        setAssessmentVal(data)
        setInitialAssessment(data)
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
            initialValues={{
              ...initialAssessment,
              timeLimit: 10
            }}  
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
                      <RadioBoxKey name="duration" options={[{label:"No Limit", value: 0}, {label:"Set Limit",value:false}]} />
                    </div>
                    </div>
                    <div>
                        <TextInput type="number" name="timeLimit"/>
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
                  <Submit onClick={()=>{navigate("topic-details",{state :{ title: "Topic",
                                 subTitle: "Topic",
                                 path: "topicAssesment",}})}} style={{background: "#0000003E", color: "black",marginRight: "10px", }}>
                    Cancel
                  </Submit>
                  <Submit onClick={()=> createAssessment(values) }>Next</Submit>
                  </div>
                </div>
              </form>
            )}
          </Formik> 
    </>
  );
};


export default CreateStep2;
