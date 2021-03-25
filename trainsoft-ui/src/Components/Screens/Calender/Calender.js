import { BsCheckbox,ActiveBox } from "../../Common/BsUtils"
import CalenderGraph from "../../Common/CalenderGraph/CalenderGraph"
import CardHeader from "../../Common/CardHeader"
import Calendar from 'react-calendar';
import './Calender.css'
import { useState } from "react";
import moment from 'moment'
const Calender = ({location}) => {
    const [value,setValue] = useState(new Date());
    return (
        <div className="table-shadow p-3">
           <CardHeader {...{location}}/>
           <div className="row mt-2">
               <div className="col-md-4">
                   <div>
                   <Calendar
                    onChange={(e)=> setValue(e)}
                  />
                   </div>
                   <div className="title-md mt-4">
                       Filter
                   </div>
                   <div>
                       <BsCheckbox checked={true} className="my-3" label="Complete" id="complete"/>
                       <BsCheckbox checked={true} className="my-3" label="On-going" id="On-going"/>
                       <BsCheckbox checked={true} className="my-3" label="Upcoming" id="Upcoming"/>
                       <BsCheckbox checked={true} className="my-3" label="Delayed" id="Delayed"/>
                   </div>
               </div>
               <div className="col-md-8">
                   <div className="box-shadow full-h">
                       <div className="jcb my-2">
                            <div className="aic"><div className="title-md mb-0 mr-2">Calender</div> <div>{moment(value).format('dddd')}, {moment(value).format('Do MMM  YYYY')}</div></div>
                            <div className="flx">
                            <ActiveBox className="my-3" bgColor="complete" label="Complete"/>
                            <ActiveBox className="my-3" bgColor="on-going" label="On-going" />
                            <ActiveBox className="my-3" bgColor="upcoming" label="Upcoming"/>
                            <ActiveBox className="my-3" bgColor="delayed" label="Delayed" />  
                            </div>
                       </div>
                   <CalenderGraph/>
                   </div>
               </div>
           </div>
    </div>
    )
}

export default Calender