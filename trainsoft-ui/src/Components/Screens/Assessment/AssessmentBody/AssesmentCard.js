import React, { useContext, useEffect, useState} from 'react';
import { AssessmentContext } from '../AssesementContext';
import Submit from "../common/SubmitButton";
import styles from "./AssessmentBody.module.css";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AnswerOption from './AnswerOption';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';

const AssessmentCard = ({ question, review = false, index, correct, result = false, questions }) => {
    const {
        setAnswer,
        selectedAnswers,
        finished,
        setQuestionIndex,
        questionIndex,
        activeQuestion,
        selectedAnswer, 
        setSelectedAnswer
      } = useContext(AssessmentContext);
      const { spinner } = useContext(AppContext)
      const [activeOption, setActiveOption] = useState(selectedAnswers[question?.sid]);

      // this method to submit your answer
      const handleSubmitAnswer = () => {
        if(AppUtils.isNotEmptyObject(selectedAnswer) && AppUtils.isNotEmptyObject(question)) {
          try {
            spinner.show("Submitting your answer.. Please wait...");
            let payload = {
              "answer": selectedAnswer.answerOption,
              "questionSid": activeQuestion.questionId.sid,
              "quizSetSid": "659253CF91270AD9421C17EA0EB550305576E7943120E023722C03A9877E92BD",
              "virtualAccountSid": "479F0242214E4AA4B3D8A9866FD2B5BED5671ABFA27E4C77A75CAA5E0B3D527B"
            }
            RestService.submitAnswer(payload).then(
              response => {
                spinner.hide();
                setAnswer(question.sid, activeOption);
                setQuestionIndex(questionIndex + 1);
                setSelectedAnswer({});
              },
              err => {
                spinner.hide();
              }
            ).finally(() => {
              spinner.hide();
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
                && <div className={styles.editButton} onClick={() => setQuestionIndex(index)}>
                    <CreateOutlinedIcon style={{ fontSize: "12px", marginRight: "5px" }}/>Edit
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
            && question.questionId.answer.map((option, i) => <div
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
            </div>)
          }
          {
            result
            && <div className="">

            </div>
          }
          <div className={styles.divider} />
          {
            !review 
            && !finished 
            && <div className={styles.button}>
                <Submit onClick={() => handleSubmitAnswer()} disabled={AppUtils.isEmptyObject(selectedAnswer)} assessment={true}>Submit</Submit>
            </div>
          }
        </div>
      );
}
 
export default AssessmentCard;