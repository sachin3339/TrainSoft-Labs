import React, { useState } from 'react'
import {Navbar,Nav,Form,FormControl} from 'react-bootstrap'
import { ICN_TRAINSOFT } from '../../Common/Icon';
import { navigate } from '../../Common/Router';
import  "./header.css";
const Header = ({reset=false}) => {
  const [active, setActive] = useState('home')

  const scrollView = (id) => {
      try {
          setActive(id)
          var element = document.getElementById(id);
          element && element.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
          console.error("error occur on scrollView()", err)
      }
  }
    return(<>
         <div className="pg-header">
            <div className="main-title pointer" onClick={() => {scrollView('home');navigate('/')}}>{ICN_TRAINSOFT}</div>
            <div>
               {!reset && <div className="flx">
                    <Nav.Link className={`${active === "home" ? 'nav-active' : ''}`} onClick={() => scrollView('home')}>Home</Nav.Link>
                    <Nav.Link className={`${active === "features" ? 'nav-active' : ''}`} onClick={() => scrollView('features')}>Features</Nav.Link>
                    <Nav.Link className={`${active === "about" ? 'nav-active' : ''}`} onClick={() => scrollView('about')}>About Us</Nav.Link>
                    <Nav.Link className={`${active === "contact" ? 'nav-active' : ''}`} onClick={() => scrollView('contact')}>Contact</Nav.Link>
                </div>
              }
            </div>
        </div>

    </>)
}

export default Header