import { Formik } from "formik";
import {
  TextInput,
  SelectInput,
  RadioBox,
  TextArea,
} from "../../Common/InputField/InputField";
import { Form, Col } from "react-bootstrap";
import { useState } from "react";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import CardHeader from "../../Common/CardHeader";

const QuestionDetails = ({ location }) => {
  return (
    <>
      <CardHeader
        hideSearch
        location={{
          ...location,
        }}
      />

      <div className="table-shadow " style={{ padding: "40px" }}>
        <Form.Group>
          <Form.Label>Question Type</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>Multiple Choice</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Question Title</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>
            Which of the following option leads to the portability and security
            of Java?
          </Form.Label>
        </Form.Group>
        <AnswerSelector />
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <br />
          <div
            style={{
              background: "#B1FFFF",
              width: "79px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "25px",
            }}
          >
            Java
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Answer Explaination</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </Form.Label>
        </Form.Group>
      </div>
    </>
  );
};

const AnswerSelector = ({ ordering = "number" }) => {
  const [answers, setAnswers] = useState([{}, {}, {}]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  return (
    <div style={{ margin: "45px 0" }}>
      {answers && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Answers</Form.Label>
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
                  <div
                    style={{
                      width: "500px",
                      border: "none",
                      // borderBottom: "1px solid rgba(0,0,0,0.2)",
                      outline: "none",
                    }}
                  >
                    Bytecode is executed by JVM
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Form.Label>Market Correct Answer </Form.Label>
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
                        ? "10px solid blue"
                        : "10px solid #D4D6DB",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
