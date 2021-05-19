import React, { useContext, useEffect, useState } from "react";
import styles from "./AssessmentBody.module.css";
import AssessmentCard from "./AssesmentCard";
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import useToast from "../../../../Store/ToastHook";
import { AssessmentContext } from "../AssesementContext";
import { IcnCheckCircleSuccessOutline, IcnCheckMarkMd, IcnCloseMd, IcnFileText, IcnTeam, IcnTeamWithStar } from "../../../Common/Icon";

const FinishScreen = ({ questions }) => {
    const {
        instruction,
        assUserInfo
    } = useContext(AssessmentContext);
    const { spinner } = useContext(AppContext);
    const Toast = useToast();
    const [score, setScore] = useState({});
    const [resQuestionList, setResQuestionList] = useState([]);

    // this method to get assessment score
    const getAssessmentScore = (
        assessmentSid = instruction.sid,
        virtualAccountSid = assUserInfo.sid
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

      // this method to get assessment score
      const getSubmittedResponse = (
        virtualAccountSid = assUserInfo.sid
        ) => {
        try {
            spinner.show("Loading.. Please wait...");
            RestService.getSubmittedResponse(virtualAccountSid).then(
                response => {
                    spinner.hide();
                    setResQuestionList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("Error occur in getSubmittedResponse--", err);
        }
    }

    // component initialization
    useEffect(() => {
        if(instruction && assUserInfo) {
            getAssessmentScore();
            getSubmittedResponse();
        }
    }, []);
    return (
        <div className={styles.finishScreen}>
            <div className="mb10">
                <IcnCheckCircleSuccessOutline />
            </div>
            <div className={styles.title}>
                <span className="pr5">Congratulations! You have completed the assessment</span>
                <span style={{ fontWeight: 800 }}>{instruction ? `"${instruction.title}"` : ""}</span>
            </div>
            {
                AppUtils.isNotEmptyObject(score) 
                    && <div
                        style={{
                        display: "flex",
                        width: "70%",
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
                                <IcnFileText />
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
                                <IcnTeam />
                            </div>
                        </div>
                        <div style={{
                                font: "normal normal 600 26px/16px Montserrat",
                                color: "#49167E",
                            }}>#{score.yourRankToday}{" "}
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
                                <IcnTeamWithStar />
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
                        <div className="aic">
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
                        <div className="aic"><span className="mr10"><IcnCheckMarkMd /></span><span className="pt2">Right Answer</span></div>
                        <div className="aic"><span className="mr10"><IcnCloseMd /></span><span className="pt2">Wrong Answer</span></div>
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