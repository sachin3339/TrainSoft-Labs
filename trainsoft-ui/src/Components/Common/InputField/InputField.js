import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { ICN_CALENDER } from '../../Common/Icon'
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import "react-datepicker/dist/react-datepicker.css";
import './inputField.css'
import MultiSelect from '../MultiSelect/MultiSelect';
import { requirePropFactory } from '@material-ui/core';

// text input field
export const TextInput = (props) => {
    const [field, meta] = useField(props);
    return (<>
        {props.label && <Form.Label className="label">{props.label}</Form.Label>}
        <div className="input-wrapper">
            <div className={`input-field ${meta.touched && meta.error ? 'border border-danger' : ''}`}>
                <input disabled={props.disabled} {...field}  {...props} className="form-control form-control-sm" />
            </div>
            {props.isNotValid && field.value.length > 0 && <div className="text-danger small-text">{props.label} Already Exist !!</div>}
            <ErrorMessage component="div" name={props.name} className="text-danger small-text" />
        </div>
    </>)
}

// date input field
export const DateInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    return (<>
        <Form.Label className="label">{props.label}</Form.Label>
        <div className="input-wrapper">
            <div className="input-field">
                <DatePicker
                    name={props.name}
                    selected={meta.value}
                    placeholderText={props.placeholder ? props.placeholder : "Select Date"}
                    {...field}
                    dateFormat="dd/MM/yyyy"
                    value={meta.value}
                    onChange={e => setValue(e.getTime())}
                    className="form-control form-control-sm" />
                {ICN_CALENDER}
            </div>
            <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
        </div>
    </>)
}

// time input field
export const TimeInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    return (<>
        <Form.Label className="label">{props.label}</Form.Label>
        <div className="input-wrapper">
            <div className="input-field">
                <DatePicker
                    name={props.name}
                    selected={meta.value}
                    placeholderText={props.placeholder ? props.placeholder : "Select Date"}
                    {...field}
                    dateFormat="HH:mm aa"
                    timeFormat="HH:mm aa"
                    showTimeSelect
                    showTimeSelectOnly
                    use12Hours={true}
                    timeCaption="Time"
                    value={meta.value}
                    onChange={e => setValue(e.getTime())}
                    className="form-control form-control-sm" />
                {ICN_CALENDER}
            </div>
            <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
        </div>
    </>)
}

// date input field
export const TextArea = (props) => {
    const [field, meta] = useField(props);
    return (<>
        <Form.Label className="label">{props.label}</Form.Label>
        <div className={`input-field ${meta.touched && meta.error ? 'border border-danger' : ''}`}>
            <textarea  {...field}  {...props} className="form-control form-control-sm" />
        </div>
        <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
    </>)
}

// select input field
export const SelectInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const { value } = meta;
    return (<>
        <Form.Label className="label">{props.label}</Form.Label>
        <div className="input-wrapper">
            <div className="input-field">
                <CustomDropdown {...{
                    bindKey: props.bindKey ? props.bindKey : null,
                    valueKey: props.valueKey ? props.valueKey : null,
                    data: props.option,
                    searchKeywords: "",
                    onSelect: setValue,
                    title:  `Select ${props.label}`,
                    selectedVal: props.value,
                    disabled: props.disabled,
                    onChange:(e)=>console.log(e)
                }} />
            </div>
            <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
        </div>
    </>)
}

// select input field
export const MultiSelectInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const { value } = meta;
    const queueDropdownProps = {
        selectItems: props.option,
        label: props.bindKey,
        placeholder: props.label,
        selectAllLabel: "Select All",
        filterPlaceholder: "",
        className: "dropdown-custom",
        dataNotFound: "No result Found",
    }
    return (<>
        <Form.Label className="label">{props.label}</Form.Label>
        <div className="input-wrapper">
            <div className="input-field">
                <MultiSelect
                dataSet={queueDropdownProps}
                onSelect={(data) => setValue(data)}
                    checked={false}
                    selectAllMsg="All Selected"
                    initialData = {props.initialVal ? props.initialVal : []}
                />
            </div>
            <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
        </div>
    </>)
}

// input type RadioBox
export const RadioBox = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const { value } = meta;
    return (<>
        { props.options.map((option, i) => <Form.Check
            key={i}
            custom
            label={option}
            id={option}
            inline
            checked={value === option ? true : false}
            type="radio"
            onChange={(e) => setValue(option)}
        />)}
        <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
    </>)
};

// input type RadioBox 
export const RadioBoxKey = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const { value } = meta;
    return (<>
        { props.options.map((option, i) => <Form.Check
            key={i}
            custom
            label={option.label}
            id={option.label}
            inline
            disabled={option?.disabled}
            checked={value === option.value ? true : false}
            type="radio"
            onChange={(e) => setValue(option.value)}
        />)}
        <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
    </>)
};

// input type checkbox
export const Checkbox = (props) => {
    const [field, helpers] = useField(props);
    const { setValue } = helpers;
    return (<>
        <Form.Check
            custom
            type="checkbox"
            onChange={(e) => setValue(e.target.value)}
            {...field}
            {...props}
        />
        <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
    </>)
};


// input type CheckboxGroup
export const CheckboxGroup = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const { value } = meta;
    return (<>
        { props.options.map((option, i) => <Form.Check
            key={i}
            custom
            label={option}
            id={option}
            inline
            checked={value.some(res => res === option)}
            type="checkbox"
            onChange={(e) => e.target.checked ? setValue([...value, option]) : setValue(value.filter(res => res !== option))}
        />)}
        <ErrorMessage component="div" name={props.name} className="text-danger mb-2 small-text" />
    </>)
};