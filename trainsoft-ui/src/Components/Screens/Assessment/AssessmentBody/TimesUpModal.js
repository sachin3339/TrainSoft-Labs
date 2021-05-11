import React, { useEffect, useContext, useState} from 'react';
import { navigate } from "../../../Common/Router";
import Submit from "../common/SubmitButton";
import styles from "./AssessmentBody.module.css";
import { Modal } from 'react-bootstrap';
import { IcnStopWatch } from '../../../Common/Icon';
import { AssessmentContext } from '../AssesementContext';

const TimesUpModal = ({show, setShow, submitInTime = 5, callBack = () => {}}) => {
    const {
        hasExamEnd
    } = useContext(AssessmentContext);
    const [countDownTime, setCountDownTime] = useState(submitInTime)
    useEffect(() => {
        if(hasExamEnd) {
            if(countDownTime > 0) {
                setTimeout(() => {
                    setCountDownTime(countDownTime - 1);
                }, 1000)
            } else {
                setShow(false);
                callBack();
            }
        }
    }, [countDownTime])
    return <Modal
    size="md"
    show={show}
    onHide={() => setShow(false)}
    dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title"
    className={styles.timesUpModal}
    centered
>
    <div className="p0">
        <div className="w100 jcc aic">
            <div className={styles.timesUpCircle}>
                <IcnStopWatch />
            </div>
        </div>
        <div className={styles.timesUpHeader}>
            <div className="jcc">Sorry! Time's Up!</div>
        </div>
        <div className={styles.timesUpBody}>
            <div className={styles.timesUpButton} onClick={() => callBack()}>{`Submitting in ${countDownTime}s`}</div>
        </div>
    </div>

</Modal>;
}
 
export default TimesUpModal;