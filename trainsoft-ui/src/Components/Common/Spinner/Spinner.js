import useSpinner from '../../../Store/SpinnerHook'
import  './spinner.css'

const Spinner = ({value})=> {
    return(<>
    { value && value.spinner &&  <div className="fullpage-spinner flx flx-center">
        <div className="loading-spinner-container">
            <div className="spinner-border text-primary" role="status">
                </div><div className="mt-3 text-dark">{value.message}</div>
                </div>
            </div>}
        </>)
}
export default Spinner