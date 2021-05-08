import { useEffect, useState, useContext } from "react";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import useToast from "../../../../Store/ToastHook";
import { Formik } from "formik";
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
import "./question.css";

const CreateQuestion = ({ location }) => {
  const { isEdit = false, questionData } = location.state;
  const goBack = () => navigate("./");
  const Toast = useToast()
  const { spinner } = useContext(AppContext);
  const [questionType, setQuestionType] = useState([]);

  // Create question
  const createNewQuestion = async (values) => {
    spinner.hide("Loading... Please wait...");
    try {
      let payload = {...values}
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
        {true ? (
          <Formik
            onSubmit={(value) => createNewQuestion(value)}
            initialValues={isEdit ? questionData : GLOBELCONSTANT.DATA.CREATE_QUESTION}
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
                  <Form.Group>
                    <TextInput
                      label="Technology Name"
                      placeholder="Technology Name"
                      name="technologyName"
                    />
                  </Form.Group>
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
                      setFieldValue
                  }}/>

                  <Form.Group>
                    <TextArea
                      label="Answer Explanation"
                      name="answerExplanation"
                    />
                  </Form.Group>

                  <Form.Group>
                    <TextArea
                      label="Description"
                      name="description"
                    />
                  </Form.Group>
                  <Form.Group>
                    <TextArea label="Tags" name="tags" />
                  </Form.Group>
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
                  <Submit onClick={()=> createNewQuestion(values)} disabled={isSubmitting || !dirty || !touched}>{isEdit ? "Update" : "Create"}</Submit>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div>
            <div className="text-center title-ss text-success">
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateQuestion;
