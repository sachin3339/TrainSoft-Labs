import React, { useContext, useEffect, useState } from "react";
import { AssessmentContext } from "../AssesementContext";
import Submit from "../common/SubmitButton";
import AssessmentCard from "./AssesmentCard";
import styles from "./AssessmentBody.module.css";
import FinishScreen from "./FinishScreen";
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import useToast from "../../../../Store/ToastHook";

const Main = ({ questions }) => {
    const {
        questionIndex,
        activeQuestion,
        selectedAnswers,
        setFinished,
        finished,
    } = useContext(AssessmentContext);
    const { spinner } = useContext(AppContext);
    const Toast = useToast();
    
    // this method to submit your answer
    const handleSubmitAssessment = () => {
        try {
            setFinished(true);
            spinner.show("Submitting assessment.. Please wait...");
            let payload = {
                "quizSetSid": "659253CF91270AD9421C17EA0EB550305576E7943120E023722C03A9877E92BD",
                "virtualAccountSid": "479F0242214E4AA4B3D8A9866FD2B5BED5671ABFA27E4C77A75CAA5E0B3D527B"
            }
            RestService.submitAssessment(payload).then(
                response => {
                    spinner.hide();
                    Toast.success({ message: `Congratulation! You have submitted your assessment successfully` });
                    setFinished(true);
                },
                err => {
                spinner.hide();
                if(err && err.response && err.response.status === 403) Toast.error({ message: `You have already submitted your assessment.` });
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("Error occur in handleSubmitAssessment--", err);
        }
    }

    return (
        <div className={styles.main}>
            { finished && <FinishScreen {...{ questions }} /> }
            {
                !finished 
                && <>
                    {
                        questions 
                        // && Object.keys(selectedAnswers).length === questions.length 
                        && questionIndex === -1
                        && <div className={styles.doneBox}>
                            <div>
                                <div style={{ font: "normal normal 600 14px/26px Montserrat" }}>
                                    Awesome! You have attended {AppUtils.isNotEmptyObject(selectedAnswers) && Object.keys(selectedAnswers).length}/
                                    {questions.length} questions in your assessment!
                                </div>
                                <div>
                                    You can either Submit your assessment now or review your
                                    answers & then submit
                                </div>
                            </div>
                            <Submit onClick={() => handleSubmitAssessment()}>Submit Assessment</Submit>
                        </div>
                    }
                    {
                        questionIndex === -1 
                        ? <>
                            {
                                questions.map((question, index) => <AssessmentCard {...{
                                    question, 
                                    index, 
                                    review: true,
                                    questions
                                }}/>)
                            }
                        </> 
                        : <AssessmentCard {...{question: activeQuestion, questions}} />
                    }
                </>
            }
        </div>
    );
}

export default Main;

