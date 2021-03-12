import { Breadcrumb } from "react-bootstrap";
import { Link, navigate } from "./Router";

import SearchBox from "./SearchBox/SearchBox"


const CardHeader = ({ location }) => {
    return (<>
        {console.log(location)}
        <div className="jcb aic py-2">
            {location && location.state && <Breadcrumb>
                <Breadcrumb.Item className=""><Link to=''>{location.state.title}</Link></Breadcrumb.Item>
                {location.state.subTitle && <Breadcrumb.Item active>
                    {location.state.subTitle}
                </Breadcrumb.Item>}
                {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
            </Breadcrumb>}
            <SearchBox />
        </div>
    </>)
}
export default CardHeader;