import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ICN_NOTIFICATION, ICN_SEARCH } from '../../Common/Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ProfileImg } from '../../Common/BsUtils';
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import './header.css'



const Header = ({location}) => {
    const {user} = useContext(AppContext)

    // get user name
    const getUserName = (name) =>{
        let a = ''
        try{
         let b = name.split(' ')
          a = `${b[0].charAt()}${b[1] ? b[1].charAt() : ''}`
        }catch(err){
            console.error("Error occur on getUserName()",err)
        }
        return a
    }
    return (<>
    { location.state.title !== "COMPILER" &&
    <div className="header">
            <div className="title-lg mb-0">
                {location.state && location.state.title}
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
            
            <Dropdown className="">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                         <div><ProfileImg name={getUserName(user.name)} size="md"/></div>
                    </Dropdown.Toggle>
                <Dropdown.Menu as="div" align="left">
                  <Dropdown.Item onClick={()=>navigate('/')}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            
    </div>}</>)
}

export default Header