import CardHeader from "../../../Common/CardHeader"
import NoDataFound from "../../../Common/NoDataFound/NoDataFound"
import Session from "../Session/Session"
import TrainingRoute from "../TrainingRoute"

const Report = ({location}) =>{
    return(<>
    <CardHeader {...{location, onChange: (e) => {},
                    onEnter: (e) => {}}}/>
    <TrainingRoute {...{location}}/>
       {/* <div className="table-shadow"> */}
            <NoDataFound title="Coming Soon..."/>
    {/* </div> */}
    </>)
}

export default Report