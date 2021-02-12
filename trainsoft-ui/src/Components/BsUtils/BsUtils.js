import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Dropdown } from 'react-bootstrap';
import { CustomToggle } from '../../Services/MethodFactory';


// progress bar
export const Progress = ({ value= 0, variant, label="",className=""}) =>  <ProgressBar className={className} label={label}  variant={variant} now={value} />

export const BsDropDown = ({children, header="",direction="right"})=>  <Dropdown className="dropdown-menus">
<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
    {header}
</Dropdown.Toggle>
<Dropdown.Menu as="div" align={direction}>
    {children}
</Dropdown.Menu>
</Dropdown>
