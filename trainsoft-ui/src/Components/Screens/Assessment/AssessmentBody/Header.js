import { useContext } from "react";
import { navigate } from "../../../Common/Router";
import { AssessmentContext } from "../AssesementContext";
import { AssessmentTimer } from "./AssesmentTimer";
import styles from "./AssessmentBody.module.css";
const Header = ({ instruction, title, startTime = 9, timeLimit = 2500, introDialog }) => {
    const { finished } = useContext(AssessmentContext);
    return (
      <div className={styles.header}>
        <div>{instruction ? instruction.title : "Your Assessment Questions"}</div>
        {
          !introDialog 
          && !finished 
          && <div>
              <div>
                <AssessmentTimer {...{startTime: 0, timeLimit: instruction.duration * 60}} />
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
            : <div className={styles.exitButton} onClick={() => navigate("/")}>Exit</div>
          }
          
        </div>
      </div>
    );
}
 
export default Header;