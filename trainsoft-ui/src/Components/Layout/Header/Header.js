import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ICN_NOTIFICATION } from '../../Common/Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import { ProfileImg } from '../../Common/BsUtils';
import { navigate } from '../../Common/Router';
import AppContext from '../../../Store/AppContext';
import { TokenService } from '../../../Services/storage.service';
import './header.css'
import { AdminConfig } from '../Sidebar/SidebarConfig';
import BreadcrumbContext from '../../../Store/BreadcrumbContext';




const Header = ({location}) => {
    const breadcrumbContext = useContext(BreadcrumbContext)
    const {user,setUserValue} = useContext(AppContext)
    const [bcPath,setBcPath] = useState('/')
    console.log(location)

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

    const LogOut = ()=>{
        try{
           TokenService.removeToken()
           setUserValue("LOGOUT")
           navigate('/login')
        } catch(err){
            console.error("error occur on LogOut()",err)
        }
    }

    useEffect(() => {
        // if(location.pathname){
        //     let arr = location.pathname.split('/')
        //     let path = AdminConfig.find(res=> res.pathname === arr[0])
        //     for(let i= 0;  i< path.Children.length; i++){
        //         let pathData = path.Children[i]
        //     }   
        //     let data = path
        //     data.title = path.title
        //     breadcrumbContext.update(data)
        // }
        // setBcPath(location.pathname)
    }, [location])

    return (<>
    { location.state && ( location.state.title !== "Compiler" && location.state.title !== "VS Code" ) &&
    <div className="header">
            <div className="page-title">
                <div className="title-lg mb-0">
                    {location.state && location.state.title}
                </div>
                <div class="breadcrumb-wrap">
                    {/* <a href="#">Summary</a><a href="#">Level1</a><a href="#">Level2</a> */}
                </div>
            </div>
            <div className="aic">
                <Dropdown className="notification">
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                       <div className="mx-3">{ICN_NOTIFICATION}</div>
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
                    <Dropdown.Item onClick={()=> LogOut()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
    </div>}</>)
}

export default Header