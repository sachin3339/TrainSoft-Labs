import useSpinner from '../../../Store/SpinnerHook'
import  './spinner.css'

const Spinner = ({value})=> {
    return(<>
    { value && value.spinner &&  <div class="fullpage-spinner flx flx-center">
        <div class="loading-spinner-container">
            <div class="spinner-border text-primary" role="status">
                </div><div class="mt-3 text-dark">{value.message}</div>
                </div>
            </div>}
        </>)
}
export default Spinner