import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { ICN_TRAINSOFT } from "../../Common/Icon";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { TextInput } from "../../Common/InputField/InputField";
import { BtnInfo } from "../../Common/Buttons/Buttons";
import { AssesmentContext } from "./AssesementContext";
import { navigate } from "../../Common/Router";
import Submit from "./common/SubmitButton";
import RestService from "../../../Services/api.service";
import AppContext from "../../../Store/AppContext";

export const IntroDialog = ({ open, setOpen }) => {
  const { user, spinner } = useContext(AppContext)
  const [introInfo, setIntroInfo] = useState({
    "sid": "659253CF91270AD9421C17EA0EB550305576E7943120E023722C03A9877E92BD",
    "title": "Java Fundamentals",
    "description": "Basic Java fundamental Questions.",
    "status": "ENABLED",
    "category": "Technology",
    "difficulty": "BEGINNER",
    "validUpto": "2021-04-17T14:37:53.000+00:00",
    "duration": 60,
    "createdByVirtualAccountSid": "5A3C54277479414C91A7BBF2BC3D2ED0FFFB5E771000431EB128D07D65394DC5",
    "topicSid": "89EA8C83643C428EB24950815D4D2C870803CB9A47334FE6BF23D9D187E4A3EE",
    "tagSid": "CF993A5F48E54E948418B7A0AFC1010E88AAB7458DE4C02DEE35FBDCE2C6AE49",
    "noOfQuestions": 9,
    "url": "http://localhost/assessment?assessmentSid=659253CF91270AD9421C17EA0EB550305576E7943120E023722C03A9877E92BD",
    "updatedBySid": null,
    "updatedOn": null,
    "negative": false,
    "companySid": "5D66EAB00B4446C9A7ADB898C43C2C119456C5E6CA4D4499AE237822E3A41CB7",
    "multipleAttempts": false,
    "multipleSitting": false,
    "pauseEnable": false,
    "paymentReceived": false,
    "autoSubmitted": true,
    "nextEnabled": true,
    "premium": false,
    "mandatory": false,
    "reduceMarks": false,
    "previousEnabled": true,
    "questionRandomize": false
  });

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
  return (
    <Dialog
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
          <Submit onClick={() => setOpen(false)}>Start Assesment</Submit>
        </div>
      </DialogActions>
    </Dialog>
  );
};
