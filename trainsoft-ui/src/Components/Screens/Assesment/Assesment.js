import { useEffect, useState } from "react";
import AssesmentBody from "./AssesmentBody/AssesmentBody";
import { questions } from "./mock";
import Sidebar from "./Sidebar/Sidebar";

const Assesment = () => {
  const [activeQuestion, setActiveQuestion] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setQuestion(questions[0]);
  }, []);

  const setAnswer = (questionID, answerID) => {
    setSelectedAnswers((_selectedAnswers) => ({
      ..._selectedAnswers,
      [questionID]: answerID,
    }));
  };

  const setQuestion = (_question) => {
    if (!finished) {
      setActiveQuestion(_question);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        setQuestion={setQuestion}
        selectedAnswers={selectedAnswers}
        activeQuestion={activeQuestion}
      />
      <AssesmentBody
        question={activeQuestion}
        setAnswer={setAnswer}
        selectedAnswers={selectedAnswers}
        setFinished={setFinished}
        finished={finished}
      />
    </div>
  );
};

export default Assesment;
