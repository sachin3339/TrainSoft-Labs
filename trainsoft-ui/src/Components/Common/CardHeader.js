import { Breadcrumb } from "react-bootstrap";
import { navigate } from "./Router";

import SearchBox from "./SearchBox/SearchBox"


const CardHeader = ({ location }) => {
    return (<>
        <div className="jcb aic py-2">
            {location && location.state && <Breadcrumb>
                <Breadcrumb.Item className="">{location.state.title}</Breadcrumb.Item>
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