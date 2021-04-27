import { createContext, useEffect, useState } from "react";
import { questions } from "./mock";

export const AssesmentContext = createContext(null);

export const AssesmentProvider = ({ children }) => {
  const [activeQuestion, setActiveQuestion] = useState();
  const [questionIndex, setquestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);

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

  useEffect(() => {
    if (questionIndex === -1) {
    } else if (questionIndex < questions.length) {
      setQuestion(questions[questionIndex]);
    } else {
      setQuestion(null);
      setquestionIndex(-1);
    }
  }, [questionIndex]);

  const exportedValues = {
    activeQuestion,
    setActiveQuestion,
    setQuestion,
    setAnswer,
    selectedAnswers,
    setFinished,
    finished,
    setquestionIndex,
    questionIndex,
    dialogOpen,
    setDialogOpen,
  };

  return (
    <AssesmentContext.Provider value={exportedValues}>
      {children}
    </AssesmentContext.Provider>
  );
};
