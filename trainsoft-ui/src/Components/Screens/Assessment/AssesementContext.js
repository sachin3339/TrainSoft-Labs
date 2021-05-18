import { createContext, useContext, useEffect, useState } from "react";
import RestService from "../../../Services/api.service";
import AppUtils from "../../../Services/Utils";
import AppContext from "../../../Store/AppContext";

export const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  const { spinner } = useContext(AppContext)
  const [activeQuestion, setActiveQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [instruction, setInstruction] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [assUserInfo, setAssUserInfo] = useState({});
  const [hasExamEnd, setHasExamEnd] = useState(false);

  const setAnswer = (questionID, answerID) => {
    setSelectedAnswers((_selectedAnswers) => ({
      ..._selectedAnswers,
      [questionID]: answerID,
    }));
  };

  // get All session
  const getAssessmentQuestions = async (
    assessmentSid = "", 
    virtualAccountSid = ""
    ) => {
    try {
        spinner.show("Loading... Please wait...");
        RestService.getQuestionAnswer(assessmentSid, virtualAccountSid).then(
            response => {
                if(AppUtils.isNotEmptyArray(response.data)) {
                    setQuestions(response.data);
                    setQuestionIndex(0);
                    setQuestion(response.data[0]);
                }
            },
            err => {
                spinner.hide();
            }
        ).finally(() => {
            spinner.hide();
        });
    } catch (err) {
        spinner.hide();
        console.error("Error occur on getAssessmentQuestions()--", err);
    }
  }

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

  useEffect(() => {
    if(AppUtils.isNotEmptyObject(instruction) 
    && AppUtils.isNotEmptyObject(assUserInfo)
    &&  instruction.sid
    && assUserInfo.sid) getAssessmentQuestions(instruction.sid, assUserInfo.sid);
  }, [instruction, assUserInfo])

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
    setSelectedAnswer,
    assUserInfo, 
    setAssUserInfo,
    questions,
    setQuestions,
    hasExamEnd, 
    setHasExamEnd
  };

  return (
    <AssessmentContext.Provider value={exportedValues}>
      {children}
    </AssessmentContext.Provider>
  );
};
