import React, { useContext } from "react";
import { AssessmentContext } from "../AssesementContext";
import styles from "./AssessmentBody.module.css";
import { IcnCheckMarkMd, IcnCloseMd } from "../../../Common/Icon";

const AnswerOption = ({ answerOptionValue, active, index, correct, result = false, isAlphabet }) => {
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
        <div className={`${styles.answerTitle} pointer`}>
          {isAlphabet ? labels[index] : index + 1}. {answerOptionValue}{" "}
          <span className="ml15">
            {
              finished 
              ? ((correct && active) || (correct && result) ? <IcnCheckMarkMd /> : <>{active && <IcnCloseMd />}</>) 
              : ""
            }
          </span>
        
        </div>
        <div className={styles.result}></div>
      </div>
    );
}
 
export default AnswerOption;