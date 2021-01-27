import { Dropdown } from 'react-bootstrap';
import { ICN_NOTIFICATION, ICN_SEARCH } from '../../Constant/Icon';
import { CustomToggle } from '../../Services/MethodFactory';
import './header.css'


const Header = () => {
    return (<div className="header">
            <div className="header-title">
                Dashboard
            </div>
            <div>
                <div className="search-box">
                    <div className="mr-2">{ICN_SEARCH}</div>
                    <div className="full-w">
                        <input placeholder="Search..." className="form-control form-control-sm" type="text"/>
                    </div>
                    
                </div>
            </div>
            <div className="aic">
            <Dropdown className="notification">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                       <div className="mx-2">{ICN_NOTIFICATION}</div>
                    </Dropdown.Toggle>
                <Dropdown.Menu as="div" align="left">
                    <div className="my-2">
                        <div className="title-sm">Lorem Ipsum</div>
                        <div className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisci</div>
                    </div>
                    <div className="my-2">
                        <div className="title-sm">Lorem Ipsum</div>
                        <div className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisci</div>
                    </div>
                    <div className="my-2">
                        <div className="title-sm">Lorem Ipsum</div>
                        <div className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisci</div>
                    </div>
                    <div className="my-2">
                        <div className="title-sm">Lorem Ipsum</div>
                        <div className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisci</div>
                    </div>
                    <div className="my-2">
                        <div className="title-sm">Lorem Ipsum</div>
                        <div className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisci</div>
                    </div>
                        <div className="text-md text-center pointer">View More</div>  
                </Dropdown.Menu>
            </Dropdown>
              
               <div className="user-profile">JD</div> 

              
               
            </div>
    </div>)
}

export default Header