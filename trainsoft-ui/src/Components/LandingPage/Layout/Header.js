import {Navbar,Nav,Form,FormControl} from 'react-bootstrap'
import  "./header.css";
const Header = () => {

  const scrollView = (id)=> {
    var elmnt = document.getElementById(id);
    elmnt.scrollIntoView();
  }
    return(<>
      <div  className="pg-header">
        <div className="main-title">TrainSoft</div>
           <div>
                <div className="flx">
                  <Nav.Link onClick={()=> scrollView('home')}>Home</Nav.Link>
                 <Nav.Link onClick={()=> scrollView('features')}>Features</Nav.Link>
                 <Nav.Link onClick={()=> scrollView('about')}>About Us</Nav.Link>
                 <Nav.Link onClick={()=> scrollView('contact')}>Contact</Nav.Link>
            </div>
        </div>
        <div>
          
        </div>
        </div>

    </>)
}

export default Header