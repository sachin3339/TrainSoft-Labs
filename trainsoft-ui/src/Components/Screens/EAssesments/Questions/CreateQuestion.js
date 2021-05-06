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
  const createNewQuestion = async (payload) => {
    spinner.hide("Loading... wait");
    try {
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
              "answer": [
                {
                  "answerOption": "A",
                  "answerOptionValue": "Yes",
                  "correct": true,
                  "status": "ENABLED"
                },
                {
                  "answerOption": "B",
                  "answerOptionValue": "No",
                  "correct": false,
                  "status": "ENABLED"
                },
                {
                  "answerOption": "C",
                  "answerOptionValue": "May be",
                  "correct": false,
                  "status": "ENABLED"
                },
                {
                  "answerOption": "D",
                  "answerOptionValue": "None",
                  "correct": false,
                  "status": "ENABLED"
                }
              ],
              "answerExplanation": "Yes C++ is Object Oriented Language",
              "description": "C++",
              "difficulty": "BEGINNER",
              "name": "C++ is Object Oriented Language jj ?",
              "negativeQuestionPoint": 1,
              "questionPoint": 1,
              "questionType": "MCQ",
              "status": "ENABLED",
              "technologyName": "C++"
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
                    <Form.Label className="label">
                      Answer Choice Ordering
                    </Form.Label>
                    <div style={{ marginBottom: "10px" }}>
                      <RadioBox name="answerOrderType" options={["Alphabets", "Number"]} />
                    </div>
                  </Form.Group>

                  <AnswerSelector {...{
                      answers: values.answer, 
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
                  <Submit>Create</Submit>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <div>
            <div className="text-center title-ss text-success">
              {/* Hi, {contact.name} Our sales team will get back to you ASAP */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateQuestion;
