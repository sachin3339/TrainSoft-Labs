import { Breadcrumb } from "react-bootstrap";
import { Link, navigate } from "./Router";
import { SearchInputBox } from "react-bs-search";
import SearchBox from "./SearchBox/SearchBox"


const CardHeader = ({ location, onChange=()=>{},onEnter,clearField = false }) => {
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
            <div>
            <SearchBox {...{onChange,onEnter,clearField}} />
            </div>
        </div>
    </>)
}
export default CardHeader;