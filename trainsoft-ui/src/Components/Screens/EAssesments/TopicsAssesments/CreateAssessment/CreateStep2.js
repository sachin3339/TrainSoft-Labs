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

const CreateStep2 = ({ location, handleNext, handleBack }) => {
  const { setAssessmentVal, assessmentVal, topicSid, initialAssessment, setInitialAssessment } = useContext(AssessmentContext)

  const Toast = useToast()
  const { spinner } = useContext(AppContext)


  // Create Topic
  const createAssessment = async (val) => {
    spinner.show("Loading... wait");
    try {
      let payload = {
        autoSubmitted: true,
        categorySid: initialAssessment.categorySid.sid ? initialAssessment.categorySid.sid : initialAssessment.categorySid,
        description: val.description,
        difficulty: val.difficulty,
        duration: val.duration === true ? 0 : val.timeLimit,
        mandatory: val.mandatory,
        multipleSitting: val.multipleSitting,
        negative: true,
        nextEnabled: true,
        pauseEnable: true,
        premium: val.premium,
        previousEnabled: true,
        status: "ENABLED",
        tagSid: initialAssessment.tagSid.sid ? initialAssessment.tagSid.sid : initialAssessment.tagSid,
        title: val.title,
        topicSid: topicSid,
        validUpto: val.validUpto ? 0 : val.date,
      }
      if (initialAssessment.sid !== undefined) {
        let uploadPayload = {
          ...payload,
          sid: val.sid,
          url: val.url,
          multipleAttempts: false,
          questionRandomize: false,
          reduceMarks: false,
          paymentReceived: false,
        }
        let res = await RestService.updateAssessment(uploadPayload)
        Toast.success({ message: "Assessment updated successfully",time: 2000 })
        setAssessmentVal(res?.data)
        setInitialAssessment(initialAssessment)
      } else {
        let res = await RestService.createAssessment(payload)
        Toast.success({ message: "Assessment created successfully",time: 2000 })
        setAssessmentVal(res?.data)
        setInitialAssessment({
          ...initialAssessment,
          sid: res.data.sid,
          url:res.data.url
        })
      }
      handleNext()
      spinner.hide()
    } catch (err) {
      spinner.hide()
      Toast.error({ message: err.response?.data?.message,time: 2000})
      console.error("error occur on createAssessment()", err)
    }
  }

  return (
    <>
      <Formik
        onSubmit={(value) => createAssessment(value)}
        initialValues={{
          ...initialAssessment
        }}
      // validationSchema={schema}
      >
        {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => (
          <form onSubmit={handleSubmit} className="create-batch">
            <div>

              <Form.Group className="aic">
                <div >
                  <Form.Label className="label">
                    Time Limit
                    </Form.Label>
                  <div style={{ marginBottom: "10px" }}>
                    <RadioBoxKey name="duration" options={[{ label: "No Limit", value: true }, { label: "Set Limit", value: false }]} />
                  </div>
                </div>
                <div>
                  {!values.duration &&<div className="form-duration"> <TextInput className="" type="number" name="timeLimit" /> <div>Mins</div> </div>}
                </div>
              </Form.Group>
              <Form.Group style={{ width: "60%" }}>

                <Form.Group>
                  <Form.Label className="label">
                    Assessment Sitting
                     </Form.Label>
                  <div style={{ marginBottom: "10px" }}>
                    <RadioBoxKey name="multipleSitting" options={[{ label: "Single", value: true }, { label: "Multiple", value: false }]} />
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">
                    All Questions Mandatory
                     </Form.Label>
                  <div style={{ marginBottom: "10px" }}>
                    <RadioBoxKey name="mandatory" options={[{ label: "Yes", value: true }, { label: "No", value: false }]} />
                  </div>
                </Form.Group>
              </Form.Group>
            </div>
            <div className="ass-foo-border">
              <div>
                <Submit onClick={handleBack} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}> Back</Submit>
              </div>

              <div>
                <Submit  onClick={()=>{navigate("topic-details",{state :{ title: "Topics",
                                 subTitle: "Assessment",
                                 path: "topicAssesment",}})}} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
                          Cancel
                  </Submit>
                <Submit onClick={() => createAssessment(values)}>Next</Submit>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};


export default CreateStep2;
