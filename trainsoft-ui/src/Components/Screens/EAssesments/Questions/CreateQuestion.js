import { Formik } from "formik";
import {
  TextInput,
  SelectInput,
  RadioBox,
  TextArea,
} from "../../../Common/InputField/InputField";
import { Form } from "react-bootstrap";
import { useState } from "react";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import CardHeader from "../../../Common/CardHeader";
import Submit from "../../Assessment/common/SubmitButton";

const CreateQuestion = ({ location }) => {
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
            // onSubmit={(value) => onSubmit(value)}
            initialValues={{
              name: "",
              phoneNo: "",
              email: "",
            }}
            // validationSchema={schema}
          >
            {({ handleSubmit, isSubmitting, dirty, setFieldValue }) => (
              <form onSubmit={handleSubmit} className="create-batch">
                <div>
                  <Form.Group style={{ width: "60%" }}>
                    <SelectInput
                      label="Question Type"
                      option={["Multiple Choice"]}
                      name="trainingBatchs"
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
                      <RadioBox name="hi" options={["Alphabets", "Number"]} />
                    </div>
                  </Form.Group>

                  <AnswerSelector />

                  <Form.Group>
                    <TextArea
                      label="Answer Explaination"
                      // placeholder="Name"
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group>
                    <TextArea label="Tags" name="name" />
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
                  <Submit
                    style={{
                      background: "#0000003E",
                      color: "black",
                      marginRight: "10px",
                    }}
                  >
                    Cancel
                  </Submit>
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

const AnswerSelector = ({ ordering = "number" }) => {
  const [answers, setAnswers] = useState([{}, {}, {}]);
  const [correctAnswer, setCorrectAnswer] = useState();

  return (
    <div style={{ margin: "45px 0" }}>
      {answers && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "30px" }}>
            <Form.Label className="label">Answers</Form.Label>
            {answers.map((_answer, index) => (
              <div
                style={{
                  padding: "15px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    background: "#D4D6DB",
                    marginRight: "10px",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "20px" }}>{index + 1}.</div>
                  <input
                    style={{
                      width: "500px",
                      border: "none",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      outline: "none",
                    }}
                  />
                  <div
                    onClick={() =>
                      setAnswers(
                        answers.filter((_, _index) => _index !== index)
                      )
                    }
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "10px",
                      background: "#ED7A7A",
                      marginRight: "10px",
                      marginLeft: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RemoveOutlinedIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Form.Label className="label">Market Correct Answer </Form.Label>
            {answers.map((_, index) => (
              <div
                style={{
                  padding: "15px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => setCorrectAnswer(index)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    background: "#D4D6DB",
                    marginRight: "10px",
                    cursor: "pointer",
                    border:
                      correctAnswer === index
                        ? "4px solid blue"
                        : "4px solid #D4D6DB",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        onClick={() => setAnswers([...answers, {}])}
        style={{
          color: "#2D62ED",
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <AddCircleOutlinedIcon style={{ marginRight: "5px" }} />
        Add Option
      </div>
    </div>
  );
};

export default CreateQuestion;
