import React from 'react';
import './style.css';


const ICN_NODATA = <></>;
const ICN_NODATA_BIG = <svg xmlns="http://www.w3.org/2000/svg" width="180px" height="120px" viewBox="0 0 751.015 496.951"><g transform="translate(-974.332 -1442)" opacity="0.2"><circle cx="42" cy="42" r="42" transform="translate(1398 1486)" fill="#aeaeae"></circle><path d="M-2986.043,5326.816s100.775-172.565,124.041-206.045,46.721,0,46.721,0,149.648,214.009,167.545,242.035h0L-2810.891,5394Z" transform="translate(4336.025 -3460.901)" fill="#aeaeae"></path><path d="M-2978.752,5328s119.568-161.057,147.876-203.322,56.847,0,56.847,0,194.766,304.976,216.541,340.356c5.836,9.482,0,4.366,0,4.366s-153.753-73.551-259.069-103.971S-2978.752,5328-2978.752,5328Z" transform="translate(4098.476 -3535.819)" fill="#aeaeae"></path><path d="M-3217.191,5376.188s-15.993,6.016.7-.221c7.145-2.23,115.629-34.748,240.563,2.556,129.465,38.657,216.652,86.1,216.652,86.1s79.683,48.571,183.556,20.458c103.456-28,85.219-24.935,72.49-20.458-.167.042-.084.021,0,0" transform="translate(4208.428 -3565)" fill="none" stroke="#aeaeae" strokeWidth="20"></path><path d="M4245.6-3293.721v-47.208c-20.4-.6-48.5-9.55-55.378-40.039a3.906,3.906,0,0,1-.222-.975c0-.073,0-1.062,0-1.222v-71.313a12.089,12.089,0,0,1,12.087-12.088,12.089,12.089,0,0,1,12.088,12.088l.048,72.516c0,.015,0,.03,0,.045.869,1.045,13.595,15.934,31.38,13.029V-3513.7A13.3,13.3,0,0,1,4258.9-3527a13.3,13.3,0,0,1,13.3,13.3v102.716c17.846,1.864,30.486-12.217,31.372-13.233v-.046l.05-72.515c0-6.676,5.683-12.089,12.693-12.089s12.694,5.413,12.694,12.089v71.312c0,.161-.008,1.148,0,1.222a3.82,3.82,0,0,1-.233.975c-7.042,29.748-35.3,39-56.573,39.981v89.571a13.3,13.3,0,0,1-13.3,13.3A13.3,13.3,0,0,1,4245.6-3293.721Zm-55.6-88.24a.137.137,0,0,1,0,.019v0A.059.059,0,0,1,4190-3381.962Zm139-42.286a.074.074,0,0,1,0-.019.141.141,0,0,1,0,.024Z" transform="translate(-3185 5110)" fill="#949494"></path><rect width="12" height="38" rx="6" transform="translate(1434 1442)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="translate(1434 1576)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="translate(1526 1522) rotate(90)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="translate(1392 1522) rotate(90)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="translate(1496.57 1462.012) rotate(43)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="translate(1400.57 1559.012) rotate(43)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="matrix(-0.588, 0.809, -0.809, -0.588, 1408.898, 1487.314)" fill="#989898"></rect><rect width="12" height="38" rx="6" transform="matrix(-0.588, 0.809, -0.809, -0.588, 1513.898, 1576.314)" fill="#989898"></rect></g></svg>

/*
    Common button for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
const NoDataFound = ({ title, subTitle, small = true }) => {
    return (<>
    <div className="no-item-show">
            <div className="mb10">
                { ICN_NODATA_BIG}
            </div>
            <h5 className="no-title">{title}</h5>
            <p className="no-micro">{subTitle}</p>
    </div>
</>)
}

export default NoDataFound;