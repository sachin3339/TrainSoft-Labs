import { useContext, useState } from "react";
import { BsModal } from "../../../Common/BsUtils";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from "../AssesementContext";
import Submit from "../common/SubmitButton";
import { AssessmentTimer } from "./AssesmentTimer";
import styles from "./AssessmentBody.module.css";

const Header = ({ instruction, title, startTime = 0, timeLimit = 2500, introDialog }) => {
  const [show, setShow] = useState(false);
    const { finished, setHasExamEnd } = useContext(AssessmentContext);
    return (
      <div className={styles.header}>
        <div>{instruction ? instruction.title : "Your Assessment Questions"}</div>
        {
          !introDialog 
          && !finished 
          && <div>
              <div>
                <AssessmentTimer {...{startTime, timeLimit: instruction.duration * 60, callback: (time) => setHasExamEnd(true)}} />
              </div>
            </div>
        }
  
        <div style={{ display: "flex" }}>
          {
            finished 
            ? <><div
                className={styles.exitButton}
                style={{
                  background: "#FECD48",
                  marginRight: "10px",
                  width: "200px",
                }}
              >
                Download Certificate
              </div>
              <div className={styles.exitButton} onClick={() => navigate("/")}>Exit</div>
              </>
            : <div className={styles.quitButton} onClick={() => setShow(true)}>Quit</div>
          }
          
        </div>
        <BsModal {...{ show, setShow, headerTitle: "Are you sure?", size: "md" }}>
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
              <div className={styles.quitButtonModal} onClick={() => navigate("/")}>Quit</div>
            </div>
          </div>
        </BsModal>
      </div>
    );
}
 
export default Header;