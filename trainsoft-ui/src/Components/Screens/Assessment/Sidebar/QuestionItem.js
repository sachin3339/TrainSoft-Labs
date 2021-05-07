import React, {  } from 'react';
import styles from "./Sidebar.module.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CheckIcon from "@material-ui/icons/Check";


const QuestionItem = ({ number, active = false, done = false }) => {
    return <div className={styles.questionItem} style={{
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

        {
            active 
            ? <ArrowForwardIcon style={{ fontSize: "18px" }} /> 
            : <CreateOutlinedIcon style={{ fontSize: "18px" }} />
        }
    </div>;
}

export default QuestionItem;
