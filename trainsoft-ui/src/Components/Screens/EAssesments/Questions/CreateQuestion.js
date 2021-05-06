import { useEffect, useState, useContext } from "react";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import useToast from "../../../../Store/ToastHook";
import { Formik } from "formik";
import {
  TextInput,
  SelectInput,
  RadioBox,
  TextArea,
} from "../../../Common/InputField/InputField";
import { Form } from "react-bootstrap";
import CardHeader from "../../../Common/CardHeader";
import Submit from "../../Assessment/common/SubmitButton";
import AnswerSelector from "./AnswerSelector";
import "./question.css";

const QUESTION_TYPE = [
  {
    name: "Single Choice",
    value: "SCQ"
  },
  {
    name: "Multiple Choice",
    value: "MCQ"
  },
]

const ANSWER_ORDER_TYPE = [
  {
    name: "Alphabet",
    value: "alphabet"
  },
  {
    name: "Number",
    value: "number"
  },
]

const CreateQuestion = ({ location }) => {
  const Toast = useToast()
  const { spinner } = useContext(AppContext);

  // Create Topic
  const createNewQuestion = async (values) => {
    spinner.hide("Loading... wait");
    try {
      let payload = {...values}
      delete payload.answerOrderType;
      RestService.createQuestion(payload).then(
        response => {
          Toast.success({ message: "Question created successfully" })
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

  return (
    <>
      <CardHeader
        hideSearch
        location={{
          ...location,
          state: {
            title: "Questions",
            subTitle: "New Question",
          },
        }}
      />
      <div className="table-shadow " style={{ padding: "40px" }}>
        {true ? (
          <Formik
            onSubmit={(value) => createNewQuestion(value)}
            initialValues={{
              "answer": [],
              "answerExplanation": "",
              "description": "",
              "difficulty": "BEGINNER",
              "name": "",
              "negativeQuestionPoint": 1,
              "questionPoint": 1,
              "questionType": "MCQ",
              "status": "ENABLED",
              "technologyName": "",
              "answerOrderType": "Alphabets"
            }
            }
          >
            {({ handleSubmit, values, setFieldValue, isSubmitting, dirty }) => (
              <form onSubmit={handleSubmit} className="create-batch">
                <div>
                  <Form.Group style={{ width: "60%" }}>
                    <SelectInput
                      label="Question Type"
                      option={QUESTION_TYPE}
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
                    <TextInput
                      label="Difficulty"
                      placeholder="Difficulty"
                      name="difficulty"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="label">
                      Answer Choice Ordering
                    </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBox name="answerOrderType" options={["Alphabets", "Number"]} />
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
                    }}>Cancel</Submit>
                  <Submit onClick={()=> createNewQuestion(values)}>Create</Submit>
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
