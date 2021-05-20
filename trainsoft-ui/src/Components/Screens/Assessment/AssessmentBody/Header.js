import { useContext, useState } from "react";
import AppContext from "../../../../Store/AppContext";
import { IcnExitApp, IcnCloseCircleOutline, IcnInfoOutline, IcnArrowRight, IcnCheckCircle, IcnEdit } from "../../../Common/Icon";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from "../AssesementContext";
import { AssessmentTimer } from "./AssesmentTimer";
import styles from "./AssessmentBody.module.css";
import QuitModal from "./QuitModal";


const Header = ({ instruction, startTime = 0, timeLimit = 2500, introDialog }) => {
  const [show, setShow] = useState(false);
  const { fromLogin } = useContext(AppContext);
  const { finished, setHasExamEnd } = useContext(AssessmentContext);
    return (
      <div className={styles.header}>
        <div className="aic"><span className="mr10"><IcnInfoOutline /></span><span className="theme-color">{instruction ? instruction.title : "Your Assessment Questions"}</span></div>
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
                className={`${styles.exitButton} disabled`}
                style={{
                  background: "#FECD48",
                  marginRight: "10px",
                  width: "200px",
                }}
              >
                Download Certificate
              </div>
              <div className={styles.exitButton} onClick={() =>{ fromLogin ? navigate("/assessment",{state:{title:"Dashboard"}}) : navigate("/")}}><span className="aic"><span className="mr5"><IcnExitApp /></span><span className="pt2">Exit</span></span></div>
              </>
            : <div className={styles.quitButton} onClick={() => setShow(true)}><span className="mr10"><IcnCloseCircleOutline /></span><span className="pt2">Quit</span></div>
          }
          
        </div>
       <QuitModal {...{show, setShow}}/>
      </div>
    );
}
 
export default Header;