import { ProfileImg } from "../../../Common/BsUtils"
import { Button } from "../../../Common/Buttons/Buttons"
import './forum.css'
import Imagess from '../../../../Assets/Images/vid.jpg'
import TrainingRoute from "../TrainingRoute"
import CardHeader from "../../../Common/CardHeader"

const Forum = ({location}) =>{
    return(<>
         <CardHeader {...{location,onChange: (e) => {},
                    onEnter: (e) => {},}}/>
        <TrainingRoute {...{location}}/>
       <div className="jcb pb-2">
            <div></div>
            <div className="aic ">
                <div>
                  <div className="custom-input"><input  type="checkbox" id='view-all'/><label htmlFor='view-all' className="mx-2"> View All</label></div>   
                </div>
                <div>
                  <div className="custom-input"><input  type="checkbox" id='view-all'/><label  className="mx-2" htmlFor='view-all'> Your Post</label></div>   

                </div>
                <div>
                    <Button>+ Add a post</Button>
                </div>
            </div>
       </div>
       <div className="forum">
            <div className="forum-list">
                <div className="forum-profile">
                    <ProfileImg name="AA" size="lg" url={Imagess}/>
                </div>
                <div className="forum-content">
                    <div className="title-sm">OOAD Methodology</div>
                    <div className="text-sm">1 day ago by Sarah B</div>
                    <div className="forum-body">
                    <div className="forum-desc">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
                            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at
                             nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus 
                             sed augue semper porta
                        </p>
                    </div>
                     <div className="forum-reply">
                            <div className="forum-reply-profile">
                              <ProfileImg url={Imagess} name="AA" size="sm"/>
                            </div>
                            <div className="forum-reply-container">
                                 <div className="forum-reply-header">
                                        <div className="title-sm">Jane</div>
                                        <div>
                                            5 min 
                                        </div>
                                        <div className="link">
                                            edit 
                                        </div>
                                        <div  className="link">
                                            delete 
                                        </div>
                                </div>
                                <div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                         Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                                          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>
                                </div>
                            </div>
                     </div>
                     <div className="forum-reply">
                            <div className="forum-reply-profile">
                              <ProfileImg url={Imagess} name="AA" size="sm"/>
                            </div>
                            <div className="forum-reply-container">
                                 <div className="forum-reply-header">
                                        <div className="title-sm">Jane</div>
                                        <div>
                                            5 min 
                                        </div>
                                        <div>
                                            edit 
                                        </div>
                                        <div>
                                            delete 
                                        </div>
                                </div>
                                <div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                         Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                                          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>
                                </div>
                            </div>
                     </div>
                     <div className="title-sm pointer mt-2">Lode More (5)</div>
                    </div>
                    
                </div>
            </div>
            <div className="forum-list">
                <div className="forum-profile">
                    <ProfileImg name="OM" size="lg" url={Imagess}/>
                </div>
                <div className="forum-content">
                    <div className="title-sm">OOAD Methodology</div>
                    <div className="text-sm">1 day ago by Sarah B</div>
                
                    
                </div>
            </div>
        </div>
    </>)
}

export default Forum