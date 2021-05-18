import React, { useContext } from 'react';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';
import useToast from '../../../../Store/ToastHook';
import { BsModal } from "../../../Common/BsUtils";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from '../AssesementContext';
import Submit from "../common/SubmitButton";
import styles from "./AssessmentBody.module.css";

const QuitModal = ({ show, setShow }) => {
  const {
    instruction,
    assUserInfo
  } = useContext(AssessmentContext);
  const { fromLogin } = useContext(AppContext);
  const { spinner } = useContext(AppContext);
  const Toast = useToast();

  const handleQuitAssessment = () => {
    try {
      spinner.show("Quitting assessment.. Please wait...");
      fromLogin ? navigate("/assessment", { state: { title: "Dashboard" } }) : navigate("/")
      RestService.quitAssessment(instruction.sid, assUserInfo.sid).then(
        response => {
          spinner.hide();
          Toast.success({ message: `Quit assessment successfully`, time: 3000 });
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("Error occurred while handleQuitAssessment---", err);
    }
  }

  return <BsModal {...{ show, setShow, headerTitle: "Are you sure?", size: "md" }}>
    <div>
      <div className="column f14 mb20">
        <span>You are about to quit the assessment.</span>
        <span>If you quit, all the progress will be unsaved and you have to take the assessment</span>
        <span> From the beginning again!</span>
      </div>
      <div className="jce py20 mt20">
        <Submit onClick={() => setShow(false)} style={{ backgroundColor: "#CECECE", color: "#333333", marginRight: "15px" }}>
          Cancel
        </Submit>
        <div className={styles.quitButtonModal} onClick={() => handleQuitAssessment()}>Quit</div>
      </div>
    </div>
  </BsModal>;
}

export default QuitModal;