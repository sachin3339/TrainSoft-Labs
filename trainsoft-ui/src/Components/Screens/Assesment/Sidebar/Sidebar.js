import { useContext } from "react";
import { ICN_TRAINSOFT } from "../../../Common/Icon";
import { navigate } from "../../../Common/Router";
import { AssesmentContext } from "../AssesementContext";
import { questions } from "../mock";
import styles from "./Sidebar.module.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckIcon from "@material-ui/icons/Check";

const Sidebar = () => {
  const {
    setQuestion,
    selectedAnswers,
    activeQuestion,
    setquestionIndex,
    questionIndex,
  } = useContext(AssesmentContext);
  return (
    <div style={{ flex: 3, background: "#EAEAEA", padding: "35px 25px" }}>
      <div
        className={`${styles.container} pointer`}
        onClick={() => {
          navigate("/");
        }}
      >
        {ICN_TRAINSOFT}
      </div>

      {questions.map((_question, index) => (
        <div
          onClick={() => {
            setQuestion(_question);
            setquestionIndex(index);
          }}
        >
          <QuestionItem
            {..._question}
            key={_question?.id}
            done={selectedAnswers[_question?.id]}
            active={activeQuestion?.id === _question?.id}
          />
        </div>
      ))}
      <div
        onClick={() => {
          setQuestion(null);
          setquestionIndex(-1);
        }}
      >
        <QuestionItem number={-1} active={questionIndex === -1} />
      </div>
    </div>
  );
};

const QuestionItem = ({ number, active = false, done = false }) => {
  return (
    <div
      className={styles.questionItem}
      style={{
        background: active ? "#FECD48" : "transparent",
      }}
    >
      <div className={styles.number}>
        <div
          style={{
            background: done ? "#1C9030" : "#A5A5A5",
            borderRadius: "25px",
            width: "16px",
            height: "16px",
            display: "flex",
            marginRight: "10px  ",
            paddingTop: "1px",
            paddingLeft: "1px",
          }}
        >
          <CheckIcon style={{ fontSize: "13px", color: "white" }} />
        </div>
        {number === -1 ? "Review & Submit" : "Question " + number}
      </div>

      {active ? (
        <ArrowForwardIcon style={{ fontSize: "18px" }} />
      ) : (
        <CreateOutlinedIcon style={{ fontSize: "18px" }} />
      )}
    </div>
  );
};

export default Sidebar;
