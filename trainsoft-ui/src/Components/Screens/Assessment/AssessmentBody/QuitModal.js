import React ,{useContext} from 'react';
import AppContext from '../../../../Store/AppContext';
import { BsModal } from "../../../Common/BsUtils";
import { navigate } from "../../../Common/Router";
import Submit from "../common/SubmitButton";
import styles from "./AssessmentBody.module.css";

const QuitModal = ({show, setShow}) => {
  const { fromLogin } = useContext(AppContext);
    
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
        <div className={styles.quitButtonModal} onClick={() => {fromLogin ? navigate("/assessment",{state:{title:"Dashboard"}}) : navigate("/")}}>Quit</div>
      </div>
    </div>
  </BsModal>;
}
 
export default QuitModal;