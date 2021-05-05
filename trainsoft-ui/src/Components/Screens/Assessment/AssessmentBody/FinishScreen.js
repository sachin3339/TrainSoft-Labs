import React, { useContext, useEffect, useState } from "react";
import styles from "./AssessmentBody.module.css";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import AssessmentCard from "./AssesmentCard";
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import useToast from "../../../../Store/ToastHook";

const FinishScreen = ({ questions }) => {
    const { spinner } = useContext(AppContext);
    const Toast = useToast();
    const [score, setScore] = useState({});

    // this method to get assessment score
    const getAssessmentScore = (
        assessmentSid = "659253CF91270AD9421C17EA0EB550305576E7943120E023722C03A9877E92BD",
        virtualAccountSid = "479F0242214E4AA4B3D8A9866FD2B5BED5671ABFA27E4C77A75CAA5E0B3D527B"
        ) => {
        try {
            spinner.show("Submitting assessment.. Please wait...");
            RestService.getAssessmentScore(assessmentSid, virtualAccountSid).then(
                response => {
                    spinner.hide();
                    setScore(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("Error occur in getAssessmentScore--", err);
        }
    }

    useEffect(() => {
        getAssessmentScore();
    }, []);
    return (
        <div className={styles.finishScreen}>
            <div className={styles.check}>
                <CheckIcon style={{ fontSize: "36px" }} />
            </div>
            <div className={styles.title}>
                Congratulations! You have completed the assessment
                <span style={{ fontWeight: 800 }}> "Java Fundamentals"</span>
            </div>
            {
                AppUtils.isNotEmptyObject(score) 
                    && <div
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
                            <div>Your <br /> Score (Today)</div>
                            <div>
                                <FlagOutlinedIcon style={{ fontSize: "36px" }} />
                            </div>
                        </div>
                        <div
                            style={{
                                font: "normal normal 600 26px/16px Montserrat",
                                color: "#49167E",
                            }}
                        >{score.yourScore}%</div>
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
                            <div>Your <br />Rank</div>
                            <div>
                                <GroupOutlinedIcon style={{ fontSize: "36px", color: "#C321FF" }}/>
                            </div>
                        </div>
                        <div style={{
                                font: "normal normal 600 26px/16px Montserrat",
                                color: "#49167E",
                            }}>{score.yourRankToday}{" "}
                            <span style={{
                                font: " normal normal 600 16px/16px Montserrat",
                                color: "#333333",
                            }}>{" "}/ {score.totalAttendeesToday}</span>
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
                            <div>Your <br /> Rank (All Time)</div>
                            <div>
                                <GroupOutlinedIcon style={{ fontSize: "36px", color: "#C321FF" }}/>
                            </div>
                        </div>
                        <div style={{
                                font: "normal normal 600 26px/16px Montserrat",
                                color: "#49167E",
                            }}>#{score.yourRankAllTime}{" "}
                            <span style={{
                                font: " normal normal 600 16px/16px Montserrat",
                                color: "#333333",
                            }}>{" "}/ {score.totalAttendeesAllTime}</span>
                        </div>
                    </div>
                </div>
            }

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
                            />{" "}Your Answer
                        </div>
                        <div><CheckIcon style={{ color: "green" }} />Right Answer</div>
                        <div> <CloseIcon style={{ color: "red" }} /> Wrong Answer</div>
                    </div>
                </div>
                {
                    questions.map((question, index) => (
                        <AssessmentCard {...{
                                question,
                                index,
                                result: true,
                                questions
                            }}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default FinishScreen;