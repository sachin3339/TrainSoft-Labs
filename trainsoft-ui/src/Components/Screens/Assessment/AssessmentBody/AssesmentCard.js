import React, { useContext, useEffect, useState} from 'react';
import { AssessmentContext } from '../AssesementContext';
import Submit from "../common/SubmitButton";
import styles from "./AssessmentBody.module.css";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AnswerOption from './AnswerOption';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import { IcnEdit } from '../../../Common/Icon';

const AssessmentCard = ({ question, review = false, setReview,  index, correct = false, result = false, questions }) => {
    const {
        setAnswer,
        selectedAnswers,
        finished,
        setQuestionIndex,
        questionIndex,
        activeQuestion,
        selectedAnswer, 
        setSelectedAnswer,
        instruction,
        assUserInfo
      } = useContext(AssessmentContext);
      const [activeOption, setActiveOption] = useState(selectedAnswers[question?.sid]);
      const [inReview, setInReview] = useState(false);
      const [submitStatus, setSubmitStatus] = useState(false);

      // this method to submit your answer
      const handleSubmitAnswer = () => {
        if(AppUtils.isNotEmptyObject(selectedAnswer) && AppUtils.isNotEmptyObject(question)) {
          try {
            setSubmitStatus(true);
            let payload = {
              "answerSid": selectedAnswer.sid,
              "questionSid": activeQuestion.questionId.sid,
              "quizSetSid": instruction.sid,
              "virtualAccountSid": assUserInfo.sid
            }
            RestService.submitAnswer(payload).then(
              response => {
                setSubmitStatus(false);
                setQuestionIndex(inReview ? -1 : questionIndex + 1);
                setAnswer(question.sid, activeOption);
                setSelectedAnswer({});
              },
              err => {
                setSubmitStatus(false);
              }
            ).finally(() => {
              setSubmitStatus(false);
            });
          } catch (err) {
            console.error("Error occur in handleSubmitAnswer--", err);
          }
        }
      }
    
      useEffect(() => {
        setActiveOption(selectedAnswers[question?.sid]);
      }, [question, selectedAnswers]);
    
      return (
        <div className={styles.AssessmentCard}>
          <div className={`${styles.questionNumber} aic mb20`}>
            <div>
              Question {questionIndex === -1 ? index + 1 : questionIndex + 1} / {Array.isArray(questions) && questions.length}
            </div>
            <div>
              {
                review 
                && <div className={styles.editButton} onClick={() => {setQuestionIndex(index); setInReview(true); setReview(true)}}>
                    <CreateOutlinedIcon style={{fontSize:"20px", marginRight:"10px"}}/>Edit
                </div>
              }
            </div>
          </div>
          <div className={styles.title}>{question && question.questionId?.name}</div>
          {
            question 
            && question.questionId
            && Array.isArray(question.questionId.answer)
            && question.questionId.answer.length > 0
            && question.questionId.answer.map((option, i) => <><div
                onClick={() => {
                  if (!finished) {
                    setActiveOption(option?.sid);
                    setSelectedAnswer(option);
                  }
                }}
              >
                <AnswerOption
                  {...option}
                  correct={result ? option.correct : correct }
                  key={option?.sid}
                  index={i}
                  active={activeOption === option?.sid}
                  result={result}
                />
            </div>
            </>)
          }
          {
            question
            && question.questionId
            && Array.isArray(question.questionId.answer)
            && question.questionId.answer.length > 0
            && question.questionId.answer.map((option, i) => <>
              {
                result
                && <div className="row">
                  <div className="col-10">
                    {
                      finished
                        && result
                        ? (<>
                          {
                            option.correct
                            && activeOption === option?.sid
                            && <div class={`alert alert-success correct-answer-box mt5`} role="alert">
                              <h4 class="alert-heading f16 text-semi-bold">{"Correct Answer!"}</h4>
                              <p className="description">{question.questionId.answerExplanation}</p>
                            </div>

                          }
                          {
                            !option.correct
                            && activeOption === option?.sid
                            && <div class={`alert alert-danger wrong-answer-box mt5`} role="alert">
                              <h4 class="alert-heading f16 text-semi-bold">{"Your answer is wrong! The correct answer is,"}</h4>
                              <p className="description">{question.questionId.answerExplanation}</p>
                            </div>

                          }
                        </>)
                        : ""
                    }
                  </div>
                </div>
              }
            </>)
          }

          <div className={styles.divider} />
          {
            !review 
            && !finished 
            && <div className={styles.button}>
                <Submit onClick={() => {handleSubmitAnswer();}} disabled={AppUtils.isEmptyObject(selectedAnswer)} assessment={true} loading={submitStatus}>{submitStatus ? "Submit..." : "Submit"}</Submit>
            </div>
          }
        </div>
      );
}
 
export default AssessmentCard;