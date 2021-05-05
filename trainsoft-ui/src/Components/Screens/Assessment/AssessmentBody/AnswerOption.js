import React, { useContext } from "react";
import { AssessmentContext } from "../AssesementContext";
import styles from "./AssessmentBody.module.css";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const AnswerOption = ({ answerOptionValue, active, index, correct, result = false }) => {
    const labels = "ABCDEFG".split("");
    const { finished } = useContext(AssessmentContext);
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
          {
            finished 
            ? ((correct && active) || (correct && result) ? <CheckIcon style={{ color: "green" }} /> : <>{active && <CloseIcon style={{ color: "red" }} />}</>) 
            : ""
          }
        </div>
        <div className={styles.result}></div>
      </div>
    );
}
 
export default AnswerOption;