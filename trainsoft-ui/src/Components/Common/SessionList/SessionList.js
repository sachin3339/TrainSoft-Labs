import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import NoDataFound from "../NoDataFound/NoDataFound";
import moment from 'moment'
import './style.css'

const SessionList = ({ sessionList = [], role = "admin", sessionType = 'course' }) => {
    const [open, setOpen] = useState(null);

    const onClickToggle = (e) => {
        if (open === e) {
            setOpen(null)
        } else {
            setOpen(e)
        }
    }

    return (<>
        {sessionList.length > 0 ? sessionList.map((res, i) =>
            <div className="se-list">
                <div className="jcb full-w">
                    <div className="se-name title-sm">
                        <div className="mr-2 success-checkbox"><div class="custom-input"><input checked={res.active} type="checkbox" id={`a${i}`} /><label htmlFor={`a${i}`}></label></div></div>
                        <div onClick={() => onClickToggle(i)}>{res.topicName}</div>
                    </div>
                    <div className="se-date">
                        {sessionType === 'training' && <>
                            {res.active ? <div className="batch-pri">Scheduled</div> : <div className="batch-sec">Not Scheduled</div>}
                        </>}
                        <div>{moment(res.createdOn).format("MMM Do YY")}</div>
                        <div></div>
                    </div>
                </div>
                <Collapse in={sessionType === 'training' ? open === i : true}>
                    <div className={`session-onExpand`}>
                        <p>{res.topicDescription}</p>
                       {sessionType === 'training' && <div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div><span className="title-sm">Session Date: </span><span>07/07/2021</span></div>
                                </div>
                                <div className="col-md-3">
                                    <div><span className="title-sm">Start Time: </span><span>10:02 PM</span></div>
                                </div>
                                <div className="col-md-3">
                                    <div><span className="title-sm">End Time: </span><span>12:02 AM</span></div>
                                </div>
                            </div>
                        </div>
                       }
                    </div>
                </Collapse>
            </div>
        ) : <NoDataFound title="No data found" />}
    </>)
}
export default SessionList