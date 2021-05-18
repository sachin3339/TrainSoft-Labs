import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import { CustomToggle } from '../../Services/MethodFactory';
import { ICN_CLOSE, ICN_EXPAND } from './Icon'
import "./bsUtils.css";

// model
export const BsModal = ({ children, setShow, show, headerTitle, size = "md",headerAction=null }) => {
    return (
        <Modal
            size={size}
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body className="px-5 py-4">
                <div className="jcb mb-3 aic">
                    <div className="title-md mb-0">{headerTitle}</div>
                    <div className="flx">
                      <div className="mx-2">
                            {headerAction}
                        </div>
                    <div className="circle-md" onClick={() => setShow(false)}>
                        {ICN_CLOSE}
                    </div>
                        
                    </div>
                </div>
                {children}
            </Modal.Body>

        </Modal>
    )
}

// progress bar
export const Progress = ({ value = 0, variant, label = "", className = "" }) => <ProgressBar className={className} label={label} variant={variant} now={value} />

// dropdown
export const BsDropDown = ({ children, header = "", direction = "right" }) => <Dropdown className="dropdown-menus">
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {header}
    </Dropdown.Toggle>
    <Dropdown.Menu as="div" align={direction}>
        {children}
    </Dropdown.Menu>
</Dropdown>

// card
export const Card = ({ children, title, action, className = "" }) => {
    return (
        <div className={`box-shadow ${className}`}>
            {title && <div className="d-flex jcb aic pb-2">
                <div className="title-md">{title}</div>
                <div>
                    {action && <div className="card-action-icon">{ICN_EXPAND}</div>}
                </div>
            </div>}
            {children}
        </div>
    )
}

// Breadcrumbs
export const Breadcrumbs = () => <Breadcrumb>
    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/Breadcrumb/">
        Library
</Breadcrumb.Item>
    <Breadcrumb.Item active>Data</Breadcrumb.Item>
</Breadcrumb>


// profile
// Assets/Images/vid.jpg
export const ProfileImg = ({ url = null, name = "", size = "sm", onClick }) => {
    return (<>
        <div className={`user-profile profile-${size} text-uppercase`} onClick={onClick}>
            {url === null ? <div className="">{name}</div> : <img src={url} />}

        </div>
    </>)
}

export const BsCheckbox = ({ label = "", checked = false, id, onChange, className = "" }) => {
    return (<div className={`custom-input ${className}`}>
        <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        <label htmlFor={id}><span className="pl-2">{label}</span></label>
    </div>)
}

export const ActiveBox = ({ label = "", className = "", bgColor = '' }) => {
    return (<div className={`aic ${className} ${bgColor}`}>
        <div className="activeBox-div">

        </div>
        <div className="mx-2 mr-4">{label}</div>
    </div>)
}

// toggle the checkbox
export const Toggle = ({ id = '', checked = false, onChange }) => {
    return (<> <label className="gen-switch ibvm">
        <input type="checkbox" onChange={onChange} checked={checked} id={id} />
        <div className="gen-slider round">
        </div></label></>)
}