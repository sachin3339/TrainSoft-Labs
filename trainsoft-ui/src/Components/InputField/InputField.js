import React from 'react';
import {  ErrorMessage, Field } from 'formik';
import {Form} from 'react-bootstrap'
import './inputField.css'
import { ICN_EVENT } from '../../Constant/Icon';


/*
    Common button for cancel
    @param {Objects} className - optional className for Cancel
    @param {function} onClick - callback function
    @param {children} props default property
*/
export const TextInput = ({ label='',name }) => {
    return (<>
        <Form.Label className="label">{label}</Form.Label>
        <div className="input-field">
        <Field name={name} className="form-control form-control-sm" />
        </div>
        <ErrorMessage component={name} name="province" className="text-danger mb-2 small-text" />
    </>)
}

export const DateInput = ({ label='',name }) => {
    return (<>
        <Form.Label className="label">{label}</Form.Label>
        <div className="input-field">
        <Field type="date" name={name} className="form-control form-control-sm" />
         {/* {ICN_EVENT} */}
        </div>
        <ErrorMessage component={name} name="province" className="text-danger mb-2 small-text" />
    </>)
}

export const SelectInput = ({ label='',name, option=[] }) => {
    return (<>
        <Form.Label className="label">{label}</Form.Label>
        <div className="input-field">
           <Field as="select" name={name} className="form-control form-control-sm" >
           {option.map(res => <option value={res}>{res}</option>)}
           </Field>
        </div>
        <ErrorMessage component={name} name="province" className="text-danger mb-2 small-text" />
    </>)
}