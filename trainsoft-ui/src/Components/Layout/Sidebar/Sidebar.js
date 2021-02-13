import { Link } from "@reach/router";
import "./sideBar.css";
import { SidebarConfig } from './SidebarConfig'
const Sidebar = ({location}) => {
    console.log(location);
    return (<div className="sideBarNav">
        <div className="nav-title">TrainSoft</div>
        {location && SidebarConfig.map(res =>
            <div className={`navMenu ${res.title === (location.state && location.state.title) ? 'active' :''}`} key={res.title}>
                <Link state={{title: res.title}} className={`aic`} to={res.pathname}>
                    <div className="mr-3">{res.icon}</div>
                    <div className="">{res.title}</div>
                </Link>
            </div>
        )}
    </div>)
}

export default Sidebar
