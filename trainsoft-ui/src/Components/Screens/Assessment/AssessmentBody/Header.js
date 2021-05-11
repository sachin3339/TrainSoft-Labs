import { useContext, useState } from "react";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from "../AssesementContext";
import { AssessmentTimer } from "./AssesmentTimer";
import styles from "./AssessmentBody.module.css";
import QuitModal from "./QuitModal";

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
                <AssessmentTimer {...{startTime, timeLimit: .5 * 60, callback: (time) => setHasExamEnd(true)}} />
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
       <QuitModal {...{show, setShow}}/>
      </div>
    );
}
 
export default Header;