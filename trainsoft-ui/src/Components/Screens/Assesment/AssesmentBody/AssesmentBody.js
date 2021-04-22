import { useContext, useEffect, useState } from "react";
import { navigate } from "../../../Common/Router";
import { AssesmentContext } from "../AssesementContext";
import Submit from "../common/SubmitButton";
import { IntroDialog } from "../IntroDialog";
import { questions } from "../mock";
import styles from "./AssesmentBody.module.css";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

const AssesmentBody = () => {
  const [introDialog, setIntroDialog] = useState(true);

  return (
    <div className={styles.container}>
      <IntroDialog open={introDialog} setOpen={setIntroDialog} />
      <Header title={"Introduction to Java"} />
      <Main />
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
      <div className={styles.exitButton} onClick={() => navigate("/")}>
        Exit
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

const Main = () => {
  const {
    questionIndex,
    activeQuestion,
    selectedAnswers,
    setFinished,
    finished,
  } = useContext(AssesmentContext);

  return (
    <div className={styles.main}>
      {finished ? (
        <FinishScreen />
      ) : (
        <>
          {Object.keys(selectedAnswers).length === questions.length &&
            !finished && (
              <div className={styles.doneBox}>
                <div>
                  <div
                    style={{ font: "normal normal 600 14px/26px Montserrat" }}
                  >
                    Awesome! You have attended {questions.length}/
                    {questions.length} questions in your assessment!
                  </div>
                  <div>
                    You can either Submit your assessment now or review your
                    answers & then submit
                  </div>
                </div>
                <Submit onClick={() => setFinished(true)}>
                  Submit Assesment
                </Submit>
              </div>
            )}
          {/* {title && <div className={styles.title}>{title}</div>} */}
          {questionIndex === -1 ? (
            questions.map((_question, index) => (
              <AssesmentCard question={_question} index={index} review />
            ))
          ) : (
            <AssesmentCard question={activeQuestion} />
          )}
        </>
      )}
    </div>
  );
};

const FinishScreen = () => {
  return (
    <div className={styles.finishScreen}>
      <div className={styles.check} />
      <div className={styles.title}>
        Congratulations! You have completed the assessment.
      </div>
      <div></div>
    </div>
  );
};
const AssesmentCard = ({ question, review = false, index }) => {
  const {
    setAnswer,
    selectedAnswers,
    finished,
    setquestionIndex,
    questionIndex,
  } = useContext(AssesmentContext);
  const [activeOption, setActiveOption] = useState(
    selectedAnswers[question?.id]
  );

  useEffect(() => {
    setActiveOption(selectedAnswers[question?.id]);
  }, [question, selectedAnswers]);

  return (
    <div className={styles.assesmentCard}>
      <div className={styles.number}>
        Question {question?.number} / {question?.total}
        {review && (
          <div
            className={styles.editButton}
            onClick={() => {
              setquestionIndex(index);
            }}
          >
            <CreateOutlinedIcon
              style={{ fontSize: "12px", marginRight: "5px" }}
            />
            Edit
          </div>
        )}
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
      {!review && (
        <div className={styles.button}>
          <Submit
            onClick={() => {
              setAnswer(question.id, activeOption);
              setquestionIndex(questionIndex + 1);
            }}
            // assesment={!assesmentDone}
            assesment={true}
          >
            Submit
          </Submit>
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
