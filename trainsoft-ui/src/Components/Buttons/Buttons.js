import React from 'react';

/*
    Common button for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const Cancel = ({ children, className, onClick, name = "Cancel" }) => {
    return (<>
        <button onClick={onClick} className={"btn btn-light btn-sm btn-outlined px-2 mr-2 " + className} type="button">{!children && name} {children}</button>
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
export const Button = ({ children, className=null, onClick, type = "button", disabled = false, name = "Submit" }) => {
    return (<>
        <button type={type} onClick={onClick} disabled={disabled} className={"btn btn-sm btn-secondary px-3 " + className}>{!children && name} {children}</button>
    </>)
}

/*
    Common lightBtn for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const LightBtn = ({ children, className, onClick, name = "Button", disabled = false }) => <button
    onClick={onClick}
    className={"btn btn-light btn-sm btn-outlined " + className}
    disabled={disabled}
    type="button">
    {!children && name}
    {children}
</button>