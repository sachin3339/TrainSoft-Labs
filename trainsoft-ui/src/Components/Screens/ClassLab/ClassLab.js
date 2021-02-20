import { useState } from 'react';
import './classlab.css'
import vid from '../../../Assets/Images/vid.jpg';
import { ICN_ASSESSMENT, ICN_CLOSE, ICN_EXIT, ICN_MIC, ICN_PEOPLE,  ICN_RECORD, ICN_SCREEN_SHARE, ICN_SEND, ICN_VIDEO } from '../../Common/Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import { Dropdown } from 'react-bootstrap';
import { BtnRound, BtnSquare, Button } from '../../Common/Buttons/Buttons'
import OnlineMedia from './OnlineMedia/OnlineMedia';
import Content from './Content/Content';
import ClassPoll from './ClassPoll/ClassPoll';
import { BsDropDown } from '../../Common/BsUtils';
import CodeEditor from './CodeEditor/CodeEditor';
import WhiteBoard from './WhiteBoard/WhiteBoard';
import NoDataFound from '../../Common/NoDataFound/NoDataFound';

const ClassLab = () => {
    const [show,setShow] = useState(false)
    const [tab, setTab] = useState([])
    const [selectedTab, setSelectedTab] = useState()
    const [onClickMedia,setOnClickMedia] = useState(false) 
    return (<>
        <div className="p-4 full-w full-h">
            <div className="flx full-w full-h ">
                <div className="full-w full-h flx3 column">
                    <div className="title-lg">TrainSoft - Instructor</div>
                    <div className="flx">
                        {tab.length !== 0 ?
                            tab.map((res,i) => <div  className={`class-mode ${selectedTab === res && 'active-tab-class'}`}  key={i}>
                                <div className="" onClick={()=> {setSelectedTab(res);onClickMedia(false)}}>{res}</div><div className={`mode-close }`} onClick={() => { setTab(tab.filter(resp => resp !== res)); setSelectedTab(tab[tab.length-1]) }}>{ICN_CLOSE}</div>
                            </div>)
                            : <div className="class-mode">New</div>}
                        <Dropdown className="dropdown-menus">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <div className="plus-btn">+</div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu as="div" align="right">
                                <Dropdown.Item className={`${tab.some(res => res === "Online Media") ? 'd-none': 'd-block'}`} onClick={() => { setTab(prevState => [...prevState, 'Online Media']); setSelectedTab('Online Media');setOnClickMedia(true) }}>Online Media</Dropdown.Item>
                                <Dropdown.Item className={`${tab.some(res => res === "Whiteboard") ? 'd-none': 'd-block'}`} onClick={() => { setTab(prevState => [...prevState, 'Whiteboard']); setSelectedTab('Whiteboard') }}>Whiteboard</Dropdown.Item>
                                <Dropdown.Item className={`${tab.some(res => res === "Content") ? 'd-none': 'd-block'}`} onClick={() => { setTab(prevState => [...prevState, 'Content']); setSelectedTab('Content') }}>Content</Dropdown.Item>
                                <Dropdown.Item className={`${tab.some(res => res === "Code editor") ? 'd-none': 'd-block'}`} onClick={() => { setTab(prevState => [...prevState, 'Code editor']); setSelectedTab('Code editor') }}>Code editor</Dropdown.Item>
                                <Dropdown.Item className={`${tab.some(res => res === "Development Env") ? 'd-none': 'd-block'}`} onClick={() => { setTab(prevState => [...prevState, 'Development Env']); setSelectedTab('Development Env') }}>Development Env</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                    <div className="class-lab vic">

                        {/* ...Whiteboard  .... */}
                         <WhiteBoard className={`${selectedTab === "Whiteboard" ? 'd-inline': 'd-none'}`}/>
                         
                        {/* ...End Whiteboard  .... */}

                           {/* ...Content  .... */}
                           <div className={`${selectedTab === "Content" ? 'd-block': 'd-none'} full-h full-w`}><Content/> </div>
                        {/* ... End Content  .... */}

                          {/* ...Code Editor.... */}
                          <div className={`${selectedTab === "Code editor" ? 'column': 'd-none'} full-h full-w `}><CodeEditor/></div>
                          {/* ...Code Editor.... */}


                        {/* ...Media Link .... */}
                        <div className={`${selectedTab === "Online Media" ? 'd-block': 'd-none'} full-h full-w`}><OnlineMedia/></div>
                        {/* ...End Media Link .... */}

                            {/* ... Development Env .... */}
                            <div className={`${selectedTab === "Development Env" ? 'd-block': 'd-none'} full-h full-w`}>
                                <NoDataFound title="Development Env" subTitle="Work on"/>
                            </div>
                        {/* ...Development Env .... */}

                        {tab.length === 0 && <div className="">
                            <div className="title-md mb-3">You are currently not sharing anything </div>
                            <div>Start sharing now!</div>
                        </div>}
                    </div>
                </div>

                {/* right panel */}
                <div className="flx1 ml-3 column">
                    <div className="jcb">
                        <BtnSquare>{ICN_SCREEN_SHARE}</BtnSquare>
                        <BtnSquare>{ICN_RECORD}</BtnSquare>
                        <BtnSquare> {ICN_PEOPLE}</BtnSquare>
                        <BsDropDown 
                        header={<BtnSquare>{ICN_ASSESSMENT}</BtnSquare>}>
                           <Dropdown.Item  onClick={()=> setShow(true)}>Create a poll</Dropdown.Item>
                           <Dropdown.Item>Result</Dropdown.Item>
                        </BsDropDown>
                        <BtnSquare>{ICN_ASSESSMENT}</BtnSquare>
                        <BtnSquare>{ICN_EXIT}</BtnSquare>
                    </div>
                    <div>
                        <div className="video-container">
                            <div className="video-action">
                                <img src={vid} />
                                <div></div>
                            </div>
                            <div className="footer-video-action">
                                        <BtnRound className="mr-3">{ICN_VIDEO}</BtnRound>
                                        <BtnRound>{ICN_MIC}</BtnRound>
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
                                    US
                                </div>
                                <div className="chat-bubble">
                                    <div>You</div>
                                    <div> You did a really great work! Can you please make me one more report until tomorrow EOB?</div>

                                </div>
                            </div>
                            <div className="outbound-chat">
                                <div className="chat-bubble">
                                    <div>You</div>
                                    <div>Tnx Monica, sure! Tell me what you need.</div>
                                </div>
                            </div>
                        </div>
                        <div className="jcb">
                            <div className="chat-send">
                                <div><input type="text" className="form-control" placeholder="Type your message..." /></div>
                                <div className="primary-cir text-white">{ICN_SEND}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end right panel */}
            </div>
        </div>
        <ClassPoll {...{setShow,show}}/>
    </>)
}
export default ClassLab