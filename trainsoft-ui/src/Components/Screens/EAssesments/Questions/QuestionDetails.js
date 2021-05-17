import { useState ,useEffect,useContext } from "react";
import { Form } from "react-bootstrap";
import CardHeader from "../../../Common/CardHeader";
import Submit from "../../Assessment/common/SubmitButton";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import { navigate } from "../../../Common/Router";

const QuestionDetails = ({ location }) => {
      const {spinner} = useContext(AppContext)
      const [question,setQuestion] = useState([])

  // get All question 
  const getQuestionById = async (page = 1) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getQuestionById(location.state.sid)
      setQuestion(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getQuestionById()", err)
    }
  }

  useEffect(() => {
    getQuestionById()
  }, [])

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
          <Form.Label style={{ fontWeight: 600 }}>{question.questionType}</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Question Title</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>
          {question.name}
          </Form.Label>
        </Form.Group>
        <AnswerSelector {...{question}} />
        <Form.Group>
          {/* <Form.Label>Tags</Form.Label>
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
          </div> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Answer Explaination</Form.Label>
          <br />
          <Form.Label style={{ fontWeight: 600 }}>
           {question?.answerExplanation}
          </Form.Label>
        </Form.Group>
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
          onClick={() => {
            navigate("../questions", { state: { title: "Question", path: "questions", } })
            }}
            style={{
              background: "#0000003E",
              color: "black",
            }}
          >
            Close
          </Submit>
        </div>
      </div>
    </>
  );
};

const AnswerSelector = ({ ordering = "number",question }) => {
  const [correctAnswer, setCorrectAnswer] = useState(0);

  return (
    <div style={{ margin: "45px 0" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "30px" }}>
            <Form.Label>Answers</Form.Label>
            {question?.answer?.map((_answer, index) => (
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
                    {_answer?.answerOptionValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Form.Label>Market Correct Answer </Form.Label>
            {question?.answer?.map((_, index) => (
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
                        _.correct
                        ? "10px solid blue"
                        : "10px solid #D4D6DB",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default QuestionDetails;
