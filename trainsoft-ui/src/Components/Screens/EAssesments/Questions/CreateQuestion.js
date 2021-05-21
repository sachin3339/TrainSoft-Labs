import { useEffect, useState, useContext } from "react";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import useToast from "../../../../Store/ToastHook";
import { ErrorMessage, Formik } from "formik";
import {
  TextInput,
  SelectInput,
  TextArea,
  RadioBoxKey,
} from "../../../Common/InputField/InputField";
import { Form } from "react-bootstrap";
import CardHeader from "../../../Common/CardHeader";
import Submit from "../../Assessment/common/SubmitButton";
import AnswerSelector from "./AnswerSelector";
import AppUtils from "../../../../Services/Utils";
import { navigate } from "../../../Common/Router";
import GLOBELCONSTANT from "../../../../Constant/GlobleConstant";
import AssessmentContext from "../../../../Store/AssessmentContext";
import Select from 'react-dropdown-select';
import { BtnInfo } from "../../../Common/Buttons/Buttons";
import * as Yup from 'yup';
import "./question.css"

const CreateQuestion = ({ location }) => {
  const { isEdit = false, questionData } = location.state;
  const { category } = useContext(AssessmentContext)
  const goBack = () => navigate("./");
  const Toast = useToast()
  const { spinner } = useContext(AppContext);
  const [questionType, setQuestionType] = useState([]);
  const [deletedAnswers, setDeletedAnswers] = useState([]);

  const SCHEMA = Yup.object().shape({
    questionType: Yup.string().required("Question type is required"),
    name: Yup.string().required("Question title is required"),
    category: Yup.object().nullable().required("Category is required"),
    technologyName: Yup.array().required("Tag is required")
  })

  // Create question
  const createNewQuestion = async (values) => {
    spinner.hide("Loading... Please wait...");
    try {
      let payload = {
        ...values,
        answer: [...values.answer, ...deletedAnswers],
        category: values.category.name,
        technologyName: AppUtils.isNotEmptyArray(values.technologyName) ? values.technologyName.map(r => r.name).join() : "",
        alphabet : values.answerOrderType === GLOBELCONSTANT.ANSWER_PATTERN.ALPHABETS ? true : false
      }
      delete payload.answerOrderType;
      let method = isEdit ? RestService.updateQuestion : RestService.createQuestion;
      method(payload).then(
        response => {
          spinner.hide();
          goBack();
          Toast.success({ message: `Question ${isEdit ? "updated" : "created"} successfully` })
        },
        err => {
          spinner.hide();
          Toast.error({ message: err.response.data.message })
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on createNewQuestion()", err)
    }
  }

   // Create Topic
   const getQuestionType = async () => {
    spinner.hide("Loading... Please wait...");
    try {
      RestService.GetQuestionType().then(
        response => {
          spinner.hide();
          setQuestionType(response.data);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getQuestionType()", err);
    }
  }

  // initialize component
  useEffect(() => {
    getQuestionType();
  }, [])
  return (
    <>
      <CardHeader
        hideSearch
        location={{
          ...location,
          state: {
            title: "Questions",
            subTitle: isEdit ? questionData.name : "New Question",
          },
        }}
      />
      <div className="table-shadow " style={{ padding: "40px" }}>
        <Formik
            onSubmit={createNewQuestion}
            validationSchema={SCHEMA}
            initialValues={isEdit ? {...questionData, "category": AppUtils.isNotEmptyArray(category) && questionData.category && category.find(r => r.name === questionData.category), "technologyName": questionData.technologyName && questionData.technologyName.split(",").map(r => ({"name": r})), "answerOrderType": questionData.alphabet ? GLOBELCONSTANT.ANSWER_PATTERN.ALPHABETS : GLOBELCONSTANT.ANSWER_PATTERN.NUMBER} : GLOBELCONSTANT.DATA.CREATE_QUESTION}
          >
            {({ handleSubmit, values, setFieldValue, resetForm, isSubmitting, dirty, touched }) => (
              <form onSubmit={handleSubmit} className="create-batch">
                <div>
                  <Form.Group style={{ width: "60%" }}>
                    <SelectInput
                      label="Question Type"
                      option={AppUtils.isNotEmptyArray(questionType) ? questionType : []}
                      name="questionType"
                      bindKey="name"
                      valueKey="value"
                      value="Multiple Choice"
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextInput
                      label="Question Title"
                      placeholder="Name"
                      name="name"
                    />
                  </Form.Group>
            
                  <SelectInput label="Category" option={category} bindKey="name" name="category" value={values.category ? values.category : ""} />
                  <Form.Group>
                    <Form.Label className="label">
                      Tag
                    </Form.Label>
                    <Select 
                      options={values.category?.tags} 
                      values={values.technologyName ? values.technologyName : []}
                      multi
                      // name="technologyName"
                      onChange={(data) => {console.log(data); setFieldValue("technologyName", data)}}
                      labelField="name"
                      valueField="name"
                      color="#B1FFFF"
                      className="input-field"
                    />
                    <ErrorMessage component="span" name="technologyName" className="text-danger mb-2 small-text" />
                  </Form.Group>
              
                  {/* <SelectInput label="Tag"  value={values.technologyName} option={values.category?.tags} bindKey="name" name="technologyName"/> */}
                  
                  <Form.Group>
                    <Form.Label className="label">
                       Difficulty
                     </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBoxKey name="difficulty" options={GLOBELCONSTANT.DIFFICULTY} />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">
                      Answer Choice Ordering
                    </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBoxKey name="answerOrderType" options={GLOBELCONSTANT.ANSWER_ORDER_TYPE} />
                    </div>
                  </Form.Group>

                  <AnswerSelector {...{
                      values, 
                      ordering: values.answerOrderType, 
                      setFieldValue,
                      deletedAnswers,
                      setDeletedAnswers
                  }}/>

                  <Form.Group>
                    <TextArea
                      label="Answer Explanation"
                      name="answerExplanation"
                    />
                  </Form.Group>
                      { /* 
                  <Form.Group>
                    <TextArea
                      label="Description"
                      name="description"
                    />
                  </Form.Group> */}
                 
                </div>
                <div
                  style={{
                    borderTop: "1px solid #0000003E",
                    paddingTop: "20px",
                    marginTop: "40px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Submit style={{
                      background: "#0000003E",
                      color: "black",
                      marginRight: "10px",
                    }}
                    onClick={() => {resetForm(); goBack()}}
                  >Cancel</Submit>
                   <BtnInfo type="submit" className={` px20 f14 `} disabled={!dirty || !touched}>{isEdit ? "UPDATE" : "CREATE"}</BtnInfo>
                </div>
              </form>
            )}
          </Formik>
      </div>
    </>
  );
};

export default CreateQuestion;
