import { useEffect, useState, useContext } from "react";
import { Formik } from "formik";
import { TextInput, SelectInput, TextArea, RadioBoxKey, DateInput } from "../../../../Common/InputField/InputField";
import { Form } from "react-bootstrap";
import AssessmentContext from "../../../../../Store/AssessmentContext";
import Submit from "../../../Assessment/common/SubmitButton";
import { navigate } from "../../../../Common/Router";
import * as Yup from 'yup';
import "../topic.css";
import { Button } from "../../../../Common/Buttons/Buttons";

const CreateStep1 = ({  handleNext }) => {
  const { initialAssessment, setAssessmentVal, category,setInitialAssessment } = useContext(AssessmentContext)

      //validation
   const schema = Yup.object().shape({
        title: Yup.string().required('Required!'),
        description: Yup.string().required('Required!'),
        premium: Yup.string().required('Required!'),
        categorySid: Yup.object().required('Required!'),
        tagSid: Yup.object().required('Required!'),
      });

  return (
    <>
      <Formik
        onSubmit={(value) => {
          setAssessmentVal(value);
          handleNext();
        }}
        initialValues={{
          ...initialAssessment,
          data : initialAssessment.validUpto === 0 ? '': initialAssessment.validUpto
        }}
       validationSchema={schema}
      >
        {({ handleSubmit, isSubmitting, dirty, setFieldValue, values }) => (
          <form onSubmit={handleSubmit} className="create-batch">
            <div>
              <Form.Group>
                <TextInput
                  label="Assessment Title"
                  name="title"
                />
              </Form.Group>
              <Form.Group>
                <TextArea label="Description" name="description"/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="label">
                  Type
                    </Form.Label>
                <div style={{ marginBottom: "10px" }}>
                  <RadioBoxKey name="premium" options={[{ label: "Free", value: false }, { label: "Premium", value: true, disabled: true }]} />
                </div>
              </Form.Group>
              <Form.Group style={{ width: "60%" }}>
                <SelectInput label="Category" option={category}  bindKey="name" name="categorySid" value={values.categorySid} payloadKey="name" />
                <SelectInput label="Tag"  value={values.tagSid} option={values.categorySid?.tags} bindKey="name" name="tagSid"/>
                <Form.Group>
                  <Form.Label className="label">
                    Difficulty
                     </Form.Label>
                  <div style={{ marginBottom: "10px" }}>
                    <RadioBoxKey name="difficulty" options={[{ label: "Beginner", value: "BEGINNER" }, { label: "Intermediate", value: "INTERMEDIATE" }, { label: "Expert", value: "EXPERT" }]} />
                  </div>
                </Form.Group>

                <Form.Group className="flx">
                  <div>
                    <Form.Label className="label">
                      Assessment Validity
                     </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBoxKey name="validUpto" options={[{ label: "No Limit", value: true }, { label: "Till", value: false }]} />
                    </div>
                  </div>
                  <div>
                   {!values.validUpto &&  <DateInput name="date" setFieldValue={setFieldValue} values={values} label=""/> }
                  </div>
                </Form.Group>
              </Form.Group>
            </div>
            <div className="ass-foo-border">
              <div>
                {/* <Submit onClick={handleBack} style={{background: "#0000003E", color: "black",marginRight: "10px", }}> Back</Submit> */}
              </div>

              <div>
                <Submit onClick={()=>{navigate("topic-details",{state :{ title: "Topics",
                                subTitle: "Assessment",
                                 path: "topicAssesment",}})}} style={{ background: "#0000003E", color: "black", marginRight: "10px", }}>
                         Cancel
                  </Submit>
                <Button type="submit" className="px-5" onClick={() => {  setAssessmentVal(values);setInitialAssessment(values) }}>Next</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};


export default CreateStep1;
