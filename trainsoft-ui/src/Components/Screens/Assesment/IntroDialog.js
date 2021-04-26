import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { ICN_TRAINSOFT } from "../../Common/Icon";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { TextInput } from "../../Common/InputField/InputField";
import { BtnInfo } from "../../Common/Buttons/Buttons";
import { AssesmentContext } from "./AssesementContext";
import { navigate } from "../../Common/Router";
import Submit from "./common/SubmitButton";

export const IntroDialog = ({ open, setOpen }) => {
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
        <Typography gutterBottom>
          1. Number of questions is <span style={{ fontWeight: 600 }}>10</span>
          <br />
          2. Time limit to complete is{" "}
          <span style={{ fontWeight: 600 }}>10:00 mins</span>
          <br />
          3. Assessment should be completed in{" "}
          <span style={{ fontWeight: 600 }}> one attempt</span>, you cannot save
          in between <br /> 4. All questions are{" "}
          <span style={{ fontWeight: 600 }}> mandatory </span>
          <br /> 5. You can <span style={{ fontWeight: 600 }}> edit </span> your
          previous answer during the session{" "}
          <span style={{ fontWeight: 600 }}> any time </span>
        </Typography>
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
