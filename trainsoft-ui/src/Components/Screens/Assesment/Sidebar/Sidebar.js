import { navigate } from "../../../Common/Router";
import { questions } from "../mock";
import styles from "./Sidebar.module.css";

const Sidebar = ({ setQuestion, selectedAnswers, activeQuestion }) => {
  return (
    <div style={{ flex: 3, background: "#49167E", padding: "35px 25px" }}>
      <div className={`${styles.container} pointer`} onClick={()=>{navigate('/')}}>Trainsoft</div>

      {questions.map((_question) => (
        <div onClick={() => setQuestion(_question)}>
          <QuestionItem
            {..._question}
            key={_question?.id}
            done={selectedAnswers[_question?.id]}
            active={activeQuestion?.id === _question?.id}
          />
        </div>
      ))}
    </div>
  );
};

const QuestionItem = ({ number, active = false, done = false }) => {
  return (
    <div
      className={styles.questionItem}
      style={{
        background: active ? "#2D0A52" : "#3B0F69",
      }}
    >
      <div className={styles.number}>Question {number}</div>
      <div
        className={styles.icon}
        style={{
          background: done ? "#FECD48" : "#6623AC",
          // visibility: active && !done ? "hidde n" : "visible",
        }}
      />
    </div>
  );
};

export default Sidebar;
