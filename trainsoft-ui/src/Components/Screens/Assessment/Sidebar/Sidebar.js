import { useContext } from "react";
import { ICN_TRAINSOFT } from "../../../Common/Icon";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from "../AssesementContext";
import styles from "./Sidebar.module.css";
import QuestionItem from "./QuestionItem";
import LeaderBoard from "./LeaderBoard";
import AppUtils from "../../../../Services/Utils";

const Sidebar = () => {
  const {
    setQuestion,
    selectedAnswers,
    setQuestionIndex,
    questionIndex,
    finished,
    setSelectedAnswer,
    questions,
    setInReview
  } = useContext(AssessmentContext);

  /** this method trigger when select particular
   * @param {Object} _question = selected question
   * @param {Number} index = index of selected question 
  */
  const onSelectQuestion = (_question, index) => {
    try {
      setQuestion(_question); 
      setSelectedAnswer({}); 
      setQuestionIndex(index);
      if(selectedAnswers[_question && _question?.sid]?.answerId) setInReview(true);
    } catch (error) {
      console.error("Error occurred in sendBeacon --", error);
    }
  }
  return <div style={{
        flex: 3,
        background: "#EAEAEA",
        padding: "35px 25px",
      }}
    >
      <div
        className={`${styles.container} pointer`}
        onClick={() => {
          navigate("/");
        }}
      >
        {ICN_TRAINSOFT}
      </div>

      {
        !finished ? <>
            {
              AppUtils.isNotEmptyArray(questions)
              && questions.map((_question, index) => (
                <div onClick={() => onSelectQuestion(_question, index)}>
                  <QuestionItem
                    {..._question}
                    key={index}
                    number={index + 1}
                    done={selectedAnswers[_question && _question?.sid]?.answerId}
                    active={questionIndex === index}
                  />
                </div>
              ))
            }
            <div onClick={() => { setQuestion(null); setQuestionIndex(-1); setInReview(false);}}>
              <QuestionItem number={-1} active={questionIndex === -1} />
            </div>
        </> : <LeaderBoard />
      }
  </div>;
};

export default Sidebar;
