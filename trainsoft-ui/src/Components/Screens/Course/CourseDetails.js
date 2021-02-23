import CardHeader from '../../Common/CardHeader'
import Session from '../Training/Session/Session'
const CourseDetails =({location})=>{
    return (<>
        <div className="table-shadow p-3">
            <CardHeader {...{location}}/>
            <Session/>
        </div>
    </>)
}
export default CourseDetails