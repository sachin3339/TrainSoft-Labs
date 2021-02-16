import React from 'react'
import  Breadcrumb  from 'react-bootstrap/Breadcrumb'
import { Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import { CustomToggle } from '../../Services/MethodFactory';
import { ICN_CLOSE } from './Icon'
import "./bsUtils.css";

// model
export const BsModal = ({ children, setShow, show, headerTitle, size = "md" }) => {
    return (
        <Modal
            size={size}
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Body className="px-5 py-4">
                <div className="jcb mb-3">
                    <div className="title-md ">{headerTitle}</div>
                    <div><div className="circle-md" onClick={() => setShow(false)}>
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
                    {action && <div className="card-action-icon">A</div>}
                </div>
            </div>}
            {children}
        </div>
    )
}

export const Breadcrumbs = () => <Breadcrumb>
    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/Breadcrumb/">
        Library
</Breadcrumb.Item>
    <Breadcrumb.Item active>Data</Breadcrumb.Item>
</Breadcrumb>