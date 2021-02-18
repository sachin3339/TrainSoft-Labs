import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { Button } from '../../../Common/Buttons/Buttons'
import AddSession from './AddSession'
import './session.css'
const Session = ()=>{

    const [open, setOpen] = useState(null);
    const [show, setShow] = useState(false)
    const listValue = [
        { name:"OOAD Methodology",date:"07/06/2019",active:true },
        { name:"Charteristic and features of OOP",date:"07/06/2019",active:false },
        { name:"Development Processes",date:"07/06/2019",active:false },
    ]

    const onClickToggle = (e)=>{
        if(open === e){
            setOpen(null)
        }else{
            setOpen(e)
        }
    }

    return(<>
        <div className="session-container">
            {listValue.map((res,i)=><div className="se-list">
                 <div className="jcb full-w">
                    <div className="se-name title-sm">
                        <div className="mr-2 success-checkbox"><div class="custom-input"><input checked={res.active} type="checkbox" id={`a${i}`}/><label htmlFor={`a${i}`}></label></div></div>
                        <div onClick={()=> onClickToggle(i)}>{res.name}</div>
                    </div>
                     <div className="se-date">
                        {res.active ? <div className="batch-pri">Scheduled</div> : <div className="batch-sec">Not Scheduled</div>} 
                         
                        <div>{res.date}</div>
                        <div></div>
                    </div>
                </div>
                <Collapse  in={open === i}>
                 <div className={`session-onExpand`}> 
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse 
                     cillum dolore eu fugiat nulla pariatur.</p> 
                     <div>
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
                </div>
                </Collapse>
            </div>
            )}
        </div>
        <div className="full-w mt-2"><Button className="btn-block" onClick={()=> setShow(true)}>+ Add Session</Button></div>
        <AddSession {...{show, setShow}}/>
    </>)
}
export default Session