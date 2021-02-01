import './classlab.css'
import vid from '../../Assets/Images/vid.jpg';
import { ICN_ASSESSMENT, ICN_EDIT, ICN_EXIT, ICN_PEOPLE, ICN_RECORD, ICN_SCREEN_SHARE, ICN_SEND } from '../../Constant/Icon';


const ClassLab = () =>{
    return(<>
        <div className="p-4 full-w full-h">
            <div className="flx full-w full-h ">
            <div className="full-w full-h flx3 column">
              <div className="title-lg">TrainSoft - Instructor</div>
              <div className="class-mode">
                New
                <div className="mode-close">X</div>
              </div>    
              <div className="box-shadow vic">
                    <div className="">
                            <div className="title-md mb-3">You are currently not sharing anything </div>
                            <div>Start sharing now!</div>
                    </div>
              </div>
            </div>

             {/* right panel */}
               <div className="flx1 ml-3 column">
                    <div className="jcb">
                        <div className="action-btn">
                            {ICN_SCREEN_SHARE}
                        </div>
                        <div className="action-btn">
                            {ICN_RECORD}
                        </div>
                        <div className="action-btn">
                            {ICN_PEOPLE}
                        </div>
                        <div className="action-btn">
                            {ICN_ASSESSMENT}
                        </div>
                        <div className="action-btn">
                            {ICN_ASSESSMENT}
                        </div>
                        <div className="action-btn">
                            {ICN_EXIT}
                        </div>
                    </div>
                    <div>
                        <div className="video-container">
                            <div className="video-action">
                                <img src={vid}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="flx mt-3 storeTab-shadow">
                        <div className="tab-btn">Class conversation</div>  
                        <div className="tab-btn secondary-color">Private message</div>  
                    </div>
                    <div className="chat-container">
                        <div className="chat-body">
                            <div className="inbound-chat">
                            <div className="user-img">

                            </div>
                                <div className="chat-bubble">
                                    
                                </div>
                            </div>
                            <div className="outbound-chat">
                                
                            </div>
                        </div>
                        <div className="jcb">
                         <div className="chat-send">
                             <div><input type="text" className="form-control" placeholder="Type your message..."/></div>
                            <div className="primary-cir text-white">{ICN_SEND}</div>
                        </div>
                        </div>
                    </div>
               </div>
                {/* end right panel */}
            </div>
        </div>
    </>)
}
export default ClassLab