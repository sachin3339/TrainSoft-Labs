import { Breadcrumb } from "react-bootstrap";
import { Link, navigate } from "./Router";
import { SearchInputBox } from "react-bs-search";
import SearchBox from "./SearchBox/SearchBox"
import { Button } from "./Buttons/Buttons";


const CardHeader = ({ location, onChange=()=>{},onEnter,clearField = false,actionClick ,showAction}) => {
    return (<>
        <div className="jcb aic py-2">
            <div className="flx1">
            {location && location.state && <Breadcrumb>
                <Breadcrumb.Item className=""><Link to=''>{location.state.title}</Link></Breadcrumb.Item>
                {location.state.subTitle && <Breadcrumb.Item active>
                    {location.state.subTitle}
                </Breadcrumb.Item>}
                {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
            </Breadcrumb>}
            </div>
            <div className="aic ">
            <SearchBox {...{onChange,onEnter,clearField}} />
            <div>{showAction && <Button className="ml-2" onClick={actionClick}>+ Add New</Button> }</div>
         </div>
        </div>
    </>)
}
export default CardHeader;