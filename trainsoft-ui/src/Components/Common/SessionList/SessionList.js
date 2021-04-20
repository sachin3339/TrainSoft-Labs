import React, { useState, useContext } from 'react'
import { Collapse , Dropdown} from 'react-bootstrap'
import NoDataFound from "../NoDataFound/NoDataFound";
import moment from 'moment'
import './style.css'
import AppContext from '../../../Store/AppContext';
import { navigate } from '../Router';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ICN_DELETE, ICN_EDIT, ICN_MORE } from '../Icon';

const SessionList = ({ sessionList = [], role = "SUPERVISOR",onSchedule=()=>{}, sessionType = 'course', onDelete=()=>{},onEdit=()=>{} }) => {
    const { user, ROLE,setZoomInfo } = useContext(AppContext)
    const [open, setOpen] = useState(null);

    const onClickToggle = (e) => {
        if (open === e) {
            setOpen(null)
        } else {
            setOpen(e)
        }
    }

    return (<div className="mt-2">
        {sessionList && sessionList.length > 0 ? sessionList.map((res, i) =>
            <div className="se-list" key={i}>
                <div className="jcb full-w">
                    <div className="se-name title-sm">
                        {/* <div className="mr-2 success-checkbox"><div className="custom-input"><input checked={res.active} type="checkbox" id={`a${i}`} /><label htmlFor={`a${i}`}></label></div></div> */}
                        <div onClick={() => onClickToggle(i)}>{res.topicName || res.topic}</div>
                    </div>
                    <div className="se-date">
                        {sessionType === 'training' && user.role === ROLE.SUPERVISOR && <>
                            {res.status === "ENABLED" ? <div className="batch-pri" onClick={()=>onSchedule(res)}> Scheduled</div> : <div   className="batch-sec">Not Scheduled</div>}
                        </>}
                        {sessionType === 'training' && user.role !== ROLE.SUPERVISOR && (res.status === "ENABLED" ? <div onClick={() => {setZoomInfo(res.meetingInfo);navigate('/class')}} className="batch-sec">{user.role === ROLE.INSTRUCTOR ? 'Start Now' : 'Join Now'} </div> : <div   className="batch-sec">Not Scheduled</div>)}
                        <div>{moment(res.createdOn).format("DD/MM/YYYY")}</div>
                        <div className="ml-3">
                       {user.role === ROLE.SUPERVISOR &&  <Dropdown  className="session-list-dropDown">
                            <Dropdown.Toggle as={CustomToggle} >
                                {ICN_MORE}
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm" >
                                  <Dropdown.Item key={i} onClick={()=>onEdit(res)}>{ICN_EDIT} Edit</Dropdown.Item>
                                  <Dropdown.Item onClick={()=> onDelete(res)} key={i}>{ICN_DELETE} Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }</div>
                    </div>
                </div>
                <Collapse in={sessionType === 'training' ? open === i : true}>
                    <div className={`session-onExpand`}>
                        <p>{res.topicDescription || res.agenda}</p>
                        {sessionType === 'training' && <div>
                            <div className="row mt-2">
                                <div className="col-md-3">
                                    <div><span className="title-sm">Start Date: </span><span>{res.sessionDate !== 0 ? moment(res.startTime).format('DD/MM/YYYY'):'N/A'}</span></div>
                                </div>
                                <div className="col-md-3">
                                    <div><span className="title-sm">Start Time: </span><span>{res.startTime !== 0 ? moment(res.startTime).format('h:mm a'): 'N/A'}</span></div>
                                </div>
                                <div className="col-md-3">
                                    <div><span className="title-sm">End Time: </span><span>{res.startTime !== 0 ? moment(res.endTime).format('h:mm a'): 'N/A'}</span></div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                <div className='aic'><div className="title-sm mr-2">Assets: </div><div className="flx">{res.assets ? JSON.parse(res.assets).map(resp=><div className="downloadLink"><a target="_blank" href={resp.fileUrl}>{resp.fileName}</a></div>): 'N/A'}</div></div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </Collapse>
            </div>
        ) : <NoDataFound title="No data found" />}
    </div>)
}
export default SessionList