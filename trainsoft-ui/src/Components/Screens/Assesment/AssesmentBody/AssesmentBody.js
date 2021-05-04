import { useContext, useEffect, useState } from "react";
import { navigate } from "../../../Common/Router";
import { AssesmentContext } from "../AssesementContext";
import Submit from "../common/SubmitButton";
import { IntroDialog } from "../IntroDialog";
// import { questions } from "../mock";
import styles from "./AssesmentBody.module.css";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";

const AssesmentBody = ({ questions }) => {
  const [introDialog, setIntroDialog] = useState(true);

  return (
    <div className={styles.container}>
      <IntroDialog open={introDialog} setOpen={setIntroDialog} />
      <Header introDialog={introDialog} title={"Introduction to Java"} />
      <Main {...{questions}}/>
    </div>
  );
};

const Header = ({ title, startTime = 9, timeLimit = 2500, introDialog }) => {
  const { finished } = useContext(AssesmentContext);
  return (
    <div className={styles.header}>
      <div>{title}</div>
      {!introDialog && !finished && (
        <div>
          <div>
            <AssesmentTimer startTime={startTime} timeLimit={timeLimit} />
          </div>
        </div>
      )}

      <div style={{ display: "flex" }}>
        {finished && (
          <div
            className={styles.exitButton}
            style={{
              background: "#FECD48",
              marginRight: "10px",
              width: "200px",
            }}
          >
            Download Certificate
          </div>
        )}
        <div className={styles.exitButton} onClick={() => navigate("/")}>
          Exit
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

const Main = ({questions}) => {
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
        <FinishScreen {...{questions}}/>
      ) : (
        <>
          {questions && Object.keys(selectedAnswers).length === questions.length &&
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
            questions.map((question, index) => (
              <AssesmentCard question={question} index={index} review />
            ))
          ) : (
            <AssesmentCard question={activeQuestion} />
          )}
        </>
      )}
    </div>
  );
};

const FinishScreen = ({questions}) => {
  return (
    <div className={styles.finishScreen}>
      <div className={styles.check}>
        <CheckIcon style={{ fontSize: "36px" }} />
      </div>
      <div className={styles.title}>
        Congratulations! You have completed the assessment
        <span style={{ fontWeight: 800 }}> "Java Fundamentals"</span>
      </div>
      <div
        style={{
          display: "flex",
          width: "60%",
          justifyContent: "space-between",
          marginBottom: "30px",
          marginTop: "20p",
        }}
      >
        <div
          style={{
            width: "190px",
            height: "120px",
            boxShadow: "0px 0px 5px #0000003E",
            borderRadius: "5px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              Your <br />
              Rank (Today)
            </div>
            <div>
              <FlagOutlinedIcon style={{ fontSize: "36px" }} />
            </div>
          </div>
          <div
            style={{
              font: "normal normal 600 26px/16px Montserrat",
              color: "#49167E",
            }}
          >
            98%
          </div>
        </div>

        <div
          style={{
            width: "190px",
            height: "120px",
            boxShadow: "0px 0px 5px #0000003E",
            borderRadius: "5px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              Your <br />
              Score
            </div>
            <div>
              <GroupOutlinedIcon
                style={{ fontSize: "36px", color: "#C321FF" }}
              />
            </div>
          </div>
          <div
            style={{
              font: "normal normal 600 26px/16px Montserrat",
              color: "#49167E",
            }}
          >
            #3{" "}
            <span
              style={{
                font: " normal normal 600 16px/16px Montserrat",
                color: "#333333",
              }}
            >
              {" "}
              / 130
            </span>
          </div>
        </div>

        <div
          style={{
            width: "190px",
            height: "120px",
            boxShadow: "0px 0px 5px #0000003E",
            borderRadius: "5px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              Your <br />
              Rank (All Time)
            </div>
            <div>
              <GroupOutlinedIcon
                style={{ fontSize: "36px", color: "#C321FF" }}
              />
            </div>
          </div>
          <div
            style={{
              font: "normal normal 600 26px/16px Montserrat",
              color: "#49167E",
            }}
          >
            #51{" "}
            <span
              style={{
                font: " normal normal 600 16px/16px Montserrat",
                color: "#333333",
              }}
            >
              {" "}
              / 2455
            </span>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div style={{ width: "100%" }}>
        <div style={{ padding: "0 20px", display: "flex" }}>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  background: "#2D62ED",
                  borderRadius: "7px",
                  display: "inline-block",
                  marginRight: "3px",
                }}
              />{" "}
              Your Answer
            </div>
            <div>
              <CheckIcon style={{ color: "green" }} /> Right Answer
            </div>
            <div>
              <CloseIcon style={{ color: "red" }} /> Wrong Answer
            </div>
          </div>
        </div>
        {questions.map((question, index) => (
          <AssesmentCard
            question={question}
            index={index}
            result
            correct={index % 2 === 0}
            questions
          />
        ))}
      </div>
    </div>
  );
};

const AssesmentCard = ({ question, review = false, index, correct, questions }) => {
  const {
    setAnswer,
    selectedAnswers,
    finished,
    setquestionIndex,
    questionIndex,
  } = useContext(AssesmentContext);
  const [activeOption, setActiveOption] = useState(
    selectedAnswers[question?.sid]
  );

  useEffect(() => {
    setActiveOption(selectedAnswers[question?.sid]);
  }, [question, selectedAnswers]);

  return (
    <div className={styles.assesmentCard}>
      <div className={styles.questionNumber}>
        Question {question?.questionNumber} / {Array.isArray(questions) && questions.length}
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
      <div className={styles.title}>{question && question.questionId?.name}</div>
      {
      question 
      && question.questionId
      && Array.isArray(question.questionId.answer)
      && question.questionId.answer.length > 0
      && question.questionId.answer.map((_option, index) => (
        <div
          onClick={() => {
            if (!finished) {
              setActiveOption(_option?.sid);
            }
          }}
        >
          <AnswerOption
            {..._option}
            correct={correct}
            key={_option?.sid}
            index={index}
            active={activeOption === _option?.sid}
          />
        </div>
      ))}
      <div className={styles.divider} />
      {!review && !finished && (
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

const AnswerOption = ({ answerOptionValue, active, index, correct }) => {
  const labels = "ABCDEFG".split("");
  const { finished } = useContext(AssesmentContext);
  return (
    <div className={styles.answer}>
      <div>
        <div
          className={styles.option}
          style={{
            borderColor: active ? "#2D62ED" : "#D4D6DB",
            borderWidth: finished ? "10px" : "4px",
          }}
        />
      </div>
      <div className={styles.answerTitle}>
        {labels[index]}. {answerOptionValue}{" "}
        {finished && active ? (
          correct ? (
            <CheckIcon style={{ color: "green" }} />
          ) : (
            <CloseIcon style={{ color: "red" }} />
          )
        ) : (
          ""
        )}
      </div>
      <div className={styles.result}></div>
    </div>
  );
};

export default AssesmentBody;
