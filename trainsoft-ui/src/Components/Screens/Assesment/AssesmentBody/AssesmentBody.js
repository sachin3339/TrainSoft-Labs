import { useEffect, useState } from "react";
import Submit from "../common/SubmitButton";
import { questions } from "../mock";
import styles from "./AssesmentBody.module.css";

const AssesmentBody = ({ selectedAnswers, ...props }) => {
  return (
    <div className={styles.container}>
      <Header title={"Introduction to Java"} />
      <Main
        selectedAnswer={selectedAnswers[props.question?.id]}
        assesmentDone={Object.keys(selectedAnswers).length === questions.length}
        {...props}
      />
    </div>
  );
};

const Header = ({ title, startTime = 9, timeLimit = 2500 }) => {
  return (
    <div className={styles.header}>
      <div>{title}</div>
      <div>
        <div>
          <AssesmentTimer startTime={startTime} timeLimit={timeLimit} />
        </div>
      </div>
    </div>
  );
};

const AssesmentTimer = ({ startTime = 0, timeLimit = 0 }) => {
  const [time, setTime] = useState(timeLimit - startTime);

  const pad = (n, width, z) => {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  const updateTime = () => {
    console.log("hey");
    if (time > 0) {
      setTime(time - 1);
    }
  };

  useEffect(() => {
    setTimeout(updateTime, 1000);
  }, [time]);

  const formatTime = () => {
    const minutes = pad(parseInt(time / 60), 2);
    const seconds = pad(parseInt(time % 60), 2);

    return `${minutes} : ${seconds}`;
  };

  return <div className={styles.timer}>{formatTime()}</div>;
};

const Main = ({ title, setAnswer, ...props }) => {
  return (
    <div className={styles.main}>
      {title && <div className={styles.title}>{title}</div>}

      <AssesmentCard setAnswer={setAnswer} {...props} />
    </div>
  );
};

const AssesmentCard = ({
  question,
  selectedAnswer,
  setAnswer,
  assesmentDone,
  setFinished,
  finished,
}) => {
  const [activeOption, setActiveOption] = useState(selectedAnswer);

  useEffect(() => {
    setActiveOption(selectedAnswer);
  }, [question, selectedAnswer]);

  return (
    <div className={styles.assesmentCard}>
      {!finished ? (
        <>
          <div className={styles.number}>
            Question {question?.number} / {question?.total}
          </div>
          <div className={styles.title}>{question?.title}</div>
          {question?.options?.map((_option, index) => (
            <div onClick={() => setActiveOption(_option?.id)}>
              <AnswerOption
                {..._option}
                key={_option?.id}
                index={index}
                active={activeOption === _option?.id}
              />
            </div>
          ))}
          <div className={styles.divider} />
          <div className={styles.button}>
            <Submit
              onClick={() => {
                if (assesmentDone) {
                  setFinished(true);
                } else {
                  setAnswer(question.id, activeOption);
                }
              }}
              assesment={!assesmentDone}
            >
              {assesmentDone ? "Finish AssignMent" : "Submit"}
            </Submit>
          </div>
        </>
      ) : (
        <div className={styles.finishScreen}>
          <div className={styles.check} />
          <div className={styles.title}>
            Congratulations! You have completed the assessment.
          </div>
          <div className={styles.pointsTitle}>Your Score Is</div>
          <div className={styles.points}>8.5</div>
          <Submit>SIGN UP TO GET THE DETAILED REPORT</Submit>
        </div>
      )}
    </div>
  );
};

const AnswerOption = ({ title, active, index }) => {
  const labels = "ABCDEFG".split("");
  return (
    <div className={styles.answer}>
      <div>
        <div
          className={styles.option}
          style={{
            borderColor: active ? "#2D62ED" : "#D4D6DB",
          }}
        />
      </div>
      <div className={styles.answerTitle}>
        {labels[index]}. {title}
      </div>
    </div>
  );
};

export default AssesmentBody;
