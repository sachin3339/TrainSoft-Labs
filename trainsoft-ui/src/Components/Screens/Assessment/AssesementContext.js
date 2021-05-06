import { createContext, useEffect, useState } from "react";
import { dummyQuestions } from "./mock";

export const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  const [activeQuestion, setActiveQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [instruction, setInstruction] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [questions, setQuestions] = useState(dummyQuestions);

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
        setSelectedAnswer("");
        setActiveQuestion({});
    } else if (questionIndex < questions.length) {
      setQuestion(questions[questionIndex]);
    } else {
      setQuestion(null);
      setQuestionIndex(-1);
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
    setQuestionIndex,
    questionIndex,
    dialogOpen,
    setDialogOpen,
    instruction, 
    setInstruction,
    selectedAnswer, 
    setSelectedAnswer
  };

  return (
    <AssessmentContext.Provider value={exportedValues}>
      {children}
    </AssessmentContext.Provider>
  );
};
