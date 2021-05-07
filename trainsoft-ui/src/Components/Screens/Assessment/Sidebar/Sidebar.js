import { useContext } from "react";
import { ICN_TRAINSOFT } from "../../../Common/Icon";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from "../AssesementContext";
import styles from "./Sidebar.module.css";
import QuestionItem from "./QuestionItem";
import LeaderBoard from "./LeaderBoard";

const Sidebar = ({ questions }) => {
  const {
    setQuestion,
    selectedAnswers,
    activeQuestion,
    setQuestionIndex,
    questionIndex,
    finished,
    setSelectedAnswer
  } = useContext(AssessmentContext);
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
              questions.map((_question, index) => (
                <div onClick={() => { setQuestion(_question); setSelectedAnswer({}); setQuestionIndex(index);}}>
                  <QuestionItem
                    {..._question}
                    key={index}
                    number={index + 1}
                    done={selectedAnswers[_question && _question?.sid]}
                    active={questionIndex === index}
                  />
                </div>
              ))
            }
            <div onClick={() => { setQuestion(null); setQuestionIndex(-1);}}>
              <QuestionItem number={-1} active={questionIndex === -1} />
            </div>
        </> : <LeaderBoard />
      }
  </div>;
};

export default Sidebar;
