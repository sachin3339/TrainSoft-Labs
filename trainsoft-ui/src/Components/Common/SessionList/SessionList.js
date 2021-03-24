import React, { useState, useContext } from 'react'
import { Collapse , Dropdown} from 'react-bootstrap'
import NoDataFound from "../NoDataFound/NoDataFound";
import moment from 'moment'
import './style.css'
import AppContext from '../../../Store/AppContext';
import { navigate } from '../Router';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ICN_DELETE, ICN_EDIT, ICN_MORE } from '../Icon';

const SessionList = ({ sessionList = [], role = "ADMIN", sessionType = 'course', onDelete=()=>{},onEdit=()=>{} }) => {
    const { user } = useContext(AppContext)
    const [open, setOpen] = useState(null);

    const onClickToggle = (e) => {
        if (open === e) {
            setOpen(null)
        } else {
            setOpen(e)
        }
    }

    return (<>
        {sessionList && sessionList.length > 0 ? sessionList.map((res, i) =>
            <div className="se-list" key={i}>
                <div className="jcb full-w">
                    <div className="se-name title-sm">
                        <div className="mr-2 success-checkbox"><div className="custom-input"><input checked={res.active} type="checkbox" id={`a${i}`} /><label htmlFor={`a${i}`}></label></div></div>
                        <div onClick={() => onClickToggle(i)}>{res.topicName || res.agendaName}</div>
                    </div>
                    <div className="se-date">
                        {sessionType === 'training' && user.role === "ADMIN" && <>
                            {res.active ? <div className="batch-pri"> Scheduled</div> : <div className="batch-sec">Not Scheduled</div>}
                        </>}
                        {sessionType === 'training' && user.role !== "ADMIN" && <div onClick={() => navigate('/class')} className="batch-sec">{user.role === 'TRAINER' ? 'Start Now' : 'Join Now'} </div>}
                        <div>{moment(res.createdOn).format("MMM Do YY")}</div>
                        <div className="ml-3">
                        <Dropdown alignRight={true}>
                            <Dropdown.Toggle as={CustomToggle} >
                                {ICN_MORE}
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm" >
                                  <Dropdown.Item key={i} onClick={()=>onEdit(res)}>{ICN_EDIT} Edit</Dropdown.Item>
                                  <Dropdown.Item onClick={()=> onDelete(res.sid)} key={i}>{ICN_DELETE} DELETE</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                    </div>
                </div>
                <Collapse in={sessionType === 'training' ? open === i : true}>
                    <div className={`session-onExpand`}>
                        <p>{res.topicDescription || res.agendaDescription}</p>
                        {sessionType === 'training' && <div>
                            <div className="row mt-2">
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