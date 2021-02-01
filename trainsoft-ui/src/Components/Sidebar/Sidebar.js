import { Link } from "@reach/router";
import "./sideBar.css";
import { SidebarConfig } from './SidebarConfig'
const Sidebar = () => {
    return (<div className="sideBarNav">
        <div className="nav-title">TrainSoft</div>
        {SidebarConfig.map(res =>
            <div className="navMenu" key={res.title}>
                <Link state={{title:'abc'}} className="aic" to={res.pathname}>
                    <div className="mr-3">{res.icon}</div>
                    <div className="">{res.title}</div>
                </Link>
            </div>
        )}
    </div>)
}

export default Sidebar
