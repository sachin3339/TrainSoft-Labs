import { Breadcrumb } from "react-bootstrap";
import { Link, navigate } from "./Router";
import { SearchInputBox } from "react-bs-search";
import SearchBox from "./SearchBox/SearchBox"
import { Button } from "./Buttons/Buttons";


const CardHeader = ({ location, onChange=()=>{},onEnter,clearField = false,actionClick ,showAction, children, hideSearch = false}) => {
    return (<>
        <div className="jcb aic py-2">
            <div className="flx1">
            {location && location.state && <Breadcrumb>
                <Breadcrumb.Item className=""><Link state={{title: location.state.title }} to={`${location.pathname.split('/').slice(0,2).join('/')}`}>{location.state.title}</Link></Breadcrumb.Item>
                {location.state.subTitle && <Breadcrumb.Item active>
                    {location.state.subTitle}
                </Breadcrumb.Item>}
                {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
            </Breadcrumb>}
            </div>
            <div className="aic ">
            {!hideSearch && <SearchBox {...{onChange,onEnter,clearField}} />}
                {children}
            <div>{showAction && actionClick && <Button className="ml-2" onClick={actionClick}>+ Add New</Button> }</div>
         </div>
        </div>
    </>)
}
export default CardHeader;