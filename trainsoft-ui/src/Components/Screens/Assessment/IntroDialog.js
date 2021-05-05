import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { navigate } from "../../Common/Router";
import Submit from "./common/SubmitButton";
import RestService from "../../../Services/api.service";
import AppContext from "../../../Store/AppContext";
import { AssessmentContext } from "./AssesementContext";
export const IntroDialog = ({ open, setOpen }) => {
  const { instruction, setInstruction} = useContext(AssessmentContext);
  const { spinner } = useContext(AppContext)
  const [introInfo, setIntroInfo] = useState({});

  // get All session
  const getAssessmentInstruction = async () => {
    try {
      spinner.show();
      let payload = {
        "difficulty": "BEGINNER",
        "tagSid": "CF993A5F48E54E948418B7A0AFC1010E88AAB7458DE4C02DEE35FBDCE2C6AE49"
      }
      RestService.getAssessmentInstruction(payload).then(
        response => {
          setInstruction(response.data[0])
          setIntroInfo(response.data[0]);
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAssessmentInstruction()--", err);
    }
  }

  useEffect(() => {
    getAssessmentInstruction();
  }, []);
  return <Dialog
    open={open}
    onClose={() => {
      setOpen(false);
      // setSubmited(false);
    }}
    style={{ padding: "10px" }}
  >
    <DialogContent dividers>
      <Typography
        gutterBottom
        style={{ font: "normal normal normal 16px/26px Montserrat" }}
      >
        <span style={{ fontWeight: 600 }}>Welcome John,</span>
        <br /> Please read the following instructions carefully before you
          start your assessment.
        </Typography>
      <br />
      <Typography
        gutterBottom
        style={{
          color: "#F05300",
          font: " normal normal bold 16px/19px Montserrat",
        }}
      >
        INSTRUCTIONS
        </Typography>
      {
        introInfo
        && <Typography gutterBottom>
          1. Number of questions is <span style={{ fontWeight: 600 }}>{introInfo.noOfQuestions}</span>
          <br />
            2. Time limit to complete is {" "}
          <span style={{ fontWeight: 600 }}>{introInfo.duration} mins</span>
          <br />
            3. Assessment should be completed in{" "}
          <span style={{ fontWeight: 600 }}> {introInfo.multipleAttempts ? "multiple" : "one"} attempt</span>, you cannot save
            in between <br /> 4. All questions are{" "}
          <span style={{ fontWeight: 600 }}>{introInfo.mandatory ? "mandatory" : "not mandatory"} </span>
          <br /> 5. You can <span style={{ fontWeight: 600 }}> {introInfo.previousEnabled ? "edit" : "not edit"} </span> your
            previous answer during the session{" "}
          <span style={{ fontWeight: 600 }}> any time </span>
        </Typography>
      }
    </DialogContent>
    <DialogActions>
      <div style={{ padding: "10px" }}>
        <Submit
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#CECECE",
            color: "#333333",
            marginRight: "15px",
          }}
        >
          Cancel
          </Submit>
        <Submit onClick={() => setOpen(false)}>Start Assessment</Submit>
      </div>
    </DialogActions>
  </Dialog>;
};
