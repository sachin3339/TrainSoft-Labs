import { useContext } from "react";
import { ICN_TRAINSOFT } from "../../../Common/Icon";
import { navigate } from "../../../Common/Router";
import { AssesmentContext } from "../AssesementContext";
// import { questions } from "../mock";
import styles from "./Sidebar.module.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckIcon from "@material-ui/icons/Check";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const Sidebar = ({ questions }) => {
  const {
    setQuestion,
    selectedAnswers,
    activeQuestion,
    setquestionIndex,
    questionIndex,
    finished,
  } = useContext(AssesmentContext);
  return (
    <div
      style={{
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

      {!finished ? (
        <>
          {
            questions.map((_question, index) => (
              <div
                onClick={() => {
                  setQuestion(_question);
                  setquestionIndex(index + 1);
                }}
              >
                <QuestionItem
                  {..._question}
                  key={index}
                  number={index + 1}
                  done={selectedAnswers[_question && _question.questionId?.sid]}
                  active={activeQuestion?.sid === _question && _question.questionId?.sid}
                />
              </div>
            ))
          }
          <div
            onClick={() => {
              setQuestion(null);
              setquestionIndex(-1);
            }}
          >
            <QuestionItem number={-1} active={questionIndex === -1} />
          </div>
        </>
      ) : (
        <LeaderBoard />
      )}
    </div>
  );
};

const LeaderBoard = () => {
  const leaders = [
    { percent: 99, name: "Karen" },
    { percent: 98, name: "John" },
    { percent: 98, name: "Arthur" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#49167E",
          font: "normal normal 600 16px/26px Montserrat",
          marginTop: "20px",
        }}
      >
        LeaderBoard: {leaders.length}
      </div>
      <div
        style={{
          width: "150px",
          display: "flex",
          marginTop: "25px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            font: " normal normal 600 13px/26px Montserrat",
            color: "#111111",
            borderBottom: "3px solid #FECD48",
            cursor: "pointer",
          }}
        >
          Today
        </div>
        <div
          style={{
            cursor: "pointer",
          }}
        >
          All Time
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        {leaders.map((_leader, index) => (
          <LeaderBoardItem {..._leader} index={index} />
        ))}
      </div>
    </div>
  );
};
const LeaderBoardItem = ({ name, index, percent }) => {
  return (
    <div
      style={{
        background: "white",
        display: "flex",
        margin: "5px 10px",
        width: "100%",
        padding: "10px 15px",
        borderRadius: "6px",
        border: "1px solid #DBDBDB",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginRight: "10px",
            color: "#49167E",
            font: "normal normal 600 12px/26px Montserrat",
            alignItems: "center",
          }}
        >
          #{index + 1}
        </div>
        <div
          style={{
            marginRight: "10px",
            width: "28px",
            height: "28px",
            borderRadius: "14px",
            border: "1px solid #CCC",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PersonOutlineOutlinedIcon style={{ fontSize: "14px" }} />
        </div>
        <div style={{ font: "normal normal normal 12px/26px Montserrat" }}>
          {name}
        </div>
      </div>
      <div style={{ font: "normal normal 600 12px/26px Montserrat" }}>
        {percent}%
      </div>
    </div>
  );
};

const QuestionItem = ({ number, active = false, done = false }) => {
  debugger;
  return (
    <div
      className={styles.questionItem}
      style={{
        background: active ? "#FECD48" : "transparent",
        position: "relative",
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
            zIndex: 10,
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
