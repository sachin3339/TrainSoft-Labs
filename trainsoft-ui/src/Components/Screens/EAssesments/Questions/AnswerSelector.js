import React from 'react';
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import RestService from "../../../../Services/api.service";
import AppContext from "../../../../Store/AppContext";
import useToast from "../../../../Store/ToastHook";
import { Field } from "formik";
import AppUtils from '../../../../Services/Utils';
import GLOBELCONSTANT from '../../../../Constant/GlobleConstant';

const AnswerSelector = ({ 
  values, 
  ordering = GLOBELCONSTANT.ANSWER_PATTERN.ALPHABETS, 
  setFieldValue,
  deletedAnswers,
  setDeletedAnswers
}) => {
  const [correctAnswer, setCorrectAnswer] = useState();

  const addAnswer = () => {
    try {
      let tmpVal = {...values};
      tmpVal.answer.push(GLOBELCONSTANT.DATA.ANS_OBJ);
      setFieldValue("answer", tmpVal.answer);
      handleChangeOptionValue();
    } catch (err) {
      console.error("Error occur in addAnswer --", err);
    }
  }

  const deleteAnswer = (index) => {
    try {
      let tmpVal = {...values};
      let tempDelObj = tmpVal.answer.find((r, i) => i === index);
      if(AppUtils.isNotEmptyObject(tempDelObj)) {
        if (tempDelObj.sid) setDeletedAnswers([...deletedAnswers, {...tempDelObj, "operation": GLOBELCONSTANT.OPERATION.DELETE}])
      }
      if (tempDelObj.sid) console.log([...deletedAnswers, {...tempDelObj, "operation": GLOBELCONSTANT.OPERATION.DELETE}]);
      tmpVal.answer.splice(index, 1);
      setFieldValue("answer", tmpVal.answer);
      handleChangeOptionValue();
    } catch (err) {
      console.error("Error occur in deleteAnswer --", err);
    }
  }

  // this method to set option value
  const handleChangeOptionValue = () => {
    let newVal = values.answer && values.answer.map((r, i) => ({...r, answerOption: ordering === GLOBELCONSTANT.ANSWER_PATTERN.ALPHABETS ? GLOBELCONSTANT.ALPHABETS[i] : i + 1}))
    setFieldValue("answer", newVal);
  }

  // this method to set correct answer for question
  const handleSetCorrectAnswer = (index) => {
    try {
      setCorrectAnswer(index);
      let newVal = values.answer && values.answer.map((r, i) => ({...r, correct: i === index ? true : false}));
      setFieldValue("answer", newVal);
    } catch (err) {
      console.error("Error occur in handleSetCorrectAnswer --", err);  
    }
  }

  useEffect(() => {
    handleChangeOptionValue();
  }, [ordering])
   

  return (
    <div style={{ margin: "45px 0" }}>
      {
        AppUtils.isNotEmptyObject(values)
        && <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "30px" }}>
            <Form.Label className="label">Answers</Form.Label>
            {
              values.answer
              && AppUtils.isNotEmptyArray(values.answer)
              && values.answer.map((_answer, index) => <div
                key={index}
                style={{
                  padding: "15px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    background: "#D4D6DB",
                    marginRight: "10px",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "20px" }}>{ ordering === GLOBELCONSTANT.ANSWER_PATTERN.ALPHABETS ? GLOBELCONSTANT.ALPHABETS[index] : index + 1}.</div>
                  <Field 
                     style={{
                      width: "500px",
                      border: "none",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      outline: "none",
                    }}
                    name={`answer[${index}].answerOptionValue`}
                  />
                  <div
                    onClick={() => deleteAnswer(index)}
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "10px",
                      background: "#ED7A7A",
                      marginRight: "10px",
                      marginLeft: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <RemoveOutlinedIcon
                      style={{ color: "white", fontSize: "14px" }}
                    />
                  </div>
                </div>
              </div>)
            }
          </div>
          <div>
            <Form.Label className="label">Mark Correct Answer </Form.Label>
            {
               values.answer
               && AppUtils.isNotEmptyArray(values.answer)
               && values.answer.map((ans, index) => <div
                style={{
                  padding: "15px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => handleSetCorrectAnswer(index)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "10px",
                    background: "#D4D6DB",
                    marginRight: "10px",
                    cursor: "pointer",
                    border:
                      correctAnswer === index || ans.correct
                        ? "4px solid blue"
                        : "4px solid #D4D6DB",
                  }}
                />
              </div>)
            }
          </div>
        </div>
      }
      <div
        onClick={() => addAnswer()}
        style={{
          color: "#2D62ED",
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <AddCircleOutlinedIcon style={{ marginRight: "5px" }} />
        Add Option
      </div>
    </div>
  );
}

export default AnswerSelector;