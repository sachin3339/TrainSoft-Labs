import React from 'react';
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

const AnswerSelector = ({ answers = [], ordering = "Alphabets", setFieldValue }) => {
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
}
 
export default AnswerSelector;