import React from 'react';

/*
    Common button for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const Cancel = ({ children, className, onClick, name = "Cancel" }) => {
    return (<>
        <button onClick={onClick} className={"btn btn-light btn-sm btn-outlined px-3 mr-2 border round bold-ft f13" + className} type="button">{!children && name} {children}</button>
    </>)
}

/*
    Common button for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const BtnInfo = ({ children, className, onClick, name = "submit", type="button" }) => {
    return (<>
        <button onClick={onClick} className={"btn btn-info round  f13" + className} type={type}>{!children && name} {children}</button>
    </>)
}

/*
    Common button 
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {String} type - set the type of button
    @param {props} - children props default property
    @param {Boolean} - enable or disable the button
*/
export const Button = ({ children, className='', onClick, type = "button", disabled = false, name = "Submit" }) => {
    return (<>
        <button type={type} onClick={onClick} disabled={disabled} className={"btn btn-sm btn-primary px-3 " + className}>{!children && name} {children}</button>
    </>)
}

/*
    Common button 
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {String} type - set the type of button
    @param {props} - children props default property
    @param {Boolean} - enable or disable the button
*/
export const BtnRound = ({ children, className='', onClick, type = "button", disabled = false, name = "Submit" }) => {
    return (<>
        <button type={type} onClick={onClick} disabled={disabled} className={"btn btn-sm btn-secondary btn-round px-3 " + className}>{!children && name} {children}</button>
    </>)
}

/*
    Common button 
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {String} type - set the type of button
    @param {props} - children props default property
    @param {Boolean} - enable or disable the button
*/
export const BtnSquare = ({ children, className='', onClick, disabled = false, name = "Submit" }) => {
    return (<>
        <div onClick={onClick} className={"square-btn " + className}>{!children && name} {children}</div>
    </>)
}

/*
    Common button 
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {String} type - set the type of button
    @param {props} - children props default property
    @param {Boolean} - enable or disable the button
*/
export const BtnPrimary = ({ children, className='', onClick, type = "button", disabled = false, name = "Submit" }) => {
    return (<>
        <button type={type} onClick={onClick} disabled={disabled} className={"btn btn-sm btn-primary  px-3 " + className}>{!children && name} {children}</button>
    </>)
}

/*
    Common button 
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {String} type - set the type of button
    @param {props} - children props default property
    @param {Boolean} - enable or disable the button
*/
export const BtnWarning = ({ children, className='', onClick, type = "button", disabled = false, name = "Submit" }) => {
    return (<>
        <button type={type} onClick={onClick} disabled={disabled} className={"btn btn-sm btn-warning  px-3 round bold-ft f13 " + className}>{!children && name} {children}</button>
    </>)
}

/*
    Common button 
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {String} type - set the type of button
    @param {props} - children props default property
    @param {Boolean} - enable or disable the button
*/
export const BtnLight = ({ children, className='', onClick, type = "button", disabled = false, name = "Submit" }) => {
    return (<>
        <button type={type} onClick={onClick} disabled={disabled} className={"btn btn-sm btn-primary px-3 " + className}>{!children && name} {children}</button>
    </>)
}

/*
    Common TabBtn for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const TabBtn = ({ children, className="", onClick, active }) => <div
    onClick={onClick}
    className={`tab-btn ${active ? 'bg-primary' : ''}` + className}>
    {children}
</div>

/*
    Common lightBtn for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const LightBtn = ({ children, className="", onClick, name = "Button", disabled = false }) => <button
    onClick={onClick}
    className={"btn btn-light btn-sm btn-outlined " + className}
    disabled={disabled}
    type="button">
    {!children && name}
    {children}
</button>

