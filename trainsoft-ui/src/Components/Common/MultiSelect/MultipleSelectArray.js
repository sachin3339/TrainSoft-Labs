import React, { useState, useEffect } from 'react';
import { Dropdown, Form, FormControl } from 'react-bootstrap';
import './MultipleSelect.css'
import { ICN_DOWN_SMALL } from "ng-icons";

/*
    Applies filter .
    @param {Array} data - Array which is source data
    @param {inputValue} str - take param as string
    @return {Array}
*/

const filterArray = (listData, inputValue) => (listData.toUpperCase().indexOf(inputValue.toUpperCase()) > -1);

/* 
    Dropdown needs access to the DOM node in order to position the Menu
 */
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div ref={ref} onClick={e => { e.preventDefault(); onClick(e); }}>
        {children}
    </div>
));


const filterAction = React.forwardRef(
    ({ children, style, className, filterplaceholder, notfoundmsg }, ref) => {
        const [value, setValue] = useState('');
        return (
            <div ref={ref} style={style} className={className}>
                <FormControl autoFocus className="filterInput" placeholder={filterplaceholder ? filterplaceholder : "Type to filter..."}
                    onChange={e => setValue(e.target.value)} value={value} size="sm"
                />
                <ul className="esc-multi-select-list">
                    {
                        React.Children.toArray(children).filter((child, index) => !value || (index !== 0 && filterArray(child.props.label, value))).length === 0 ? <span className="px-3 text-muted py-1">{notfoundmsg ? notfoundmsg : "data not found"}</span> :
                            React.Children.toArray(children).filter((child, index) => !value || (index !== 0 && filterArray(child.props.label, value)))}
                </ul>
            </div>
        );
    },
);

/*  ------ Multiple Select ----
Initially All checkbox is Unselected
Props: 
 dataSet - set of object data, 
 sortDirection - ascending/descending By default ascending,
 style - customize list of dropdown  by applying css style 
 checked - true/false
 onSelect - function that handle on change
 className -customize list of dropdown by class name 
 showFilter - true/false  default-true
 */
const MultipleSelectArray = ({ dataSet, className = null, children,field=null, initialData, showFilter, checked = false, style = null, sortDirection, onSelect }) => {
    const [allSelected, setAllSelected] = useState(checked)
    const [mapItem, setMapItem] = useState([])
    const ID = () => ('_' + Math.random().toString(36).substr(2, 9))
    /*
        Sort the array by key.
        @param {Array of Objects} arr - Array of object which is source data
        @param {String} key - Object key which is used to sort the array
        @param {Boolean} isAsc - Default ascending order is true
        @return {Array of Objects} - Returns sorted array
    */

    //   const sortByKey = (arr = [], isAsc) => {
    //     if (isAsc) {
    //       return ((Array.isArray(arr)) ? (arr.sort((a, b) => (typeof a === 'string' ? a.toUpperCase() : (a) > (typeof b === 'string') ? b.toUpperCase() : (b) !== isAsc) ? -1 : 1)) : arr)
    //     } else {
    //       return arr
    //     }
    //   }

    /*
        handleChange on click 
        @param {take element}  e.target.name take the checked name
    */
    const handleChange = (click, data) => {
        click ? setMapItem([...mapItem, data]) : setMapItem(mapItem && mapItem.filter(res => res !== data))
        setAllSelected(false)
    }

    /*
        select all the list items
        @param {take element}  e.target.name take the checked name
    */
    const selectAll = (e) => {
        setAllSelected(e)
        e ? setMapItem(dataSet.listItems) : setMapItem([])
    }

    // pass the data on parent component
    useEffect(() => {
        onSelect(mapItem)
        mapItem.length === dataSet.listItems.length ? setAllSelected(true) : setAllSelected(false)
    }, [mapItem])

    useEffect(() => selectAll(checked), [])

    useEffect(() => initialData && setMapItem(initialData), [])

    return (
        <Dropdown className="dropdown-custom-components">
            <Dropdown.Toggle as="div" id="dropdown-custom-components" className="d-flex align-items-center">
            <div className="w100">
					<input type="text" {...field} className="form-control form-control-sm input-field" value={mapItem && mapItem.join(',')} />
				</div>
				<div>
					{ICN_DOWN_SMALL}
				</div>
            </Dropdown.Toggle>
            <Dropdown.Menu style={style} notfoundmsg={dataSet.dataNotFound} filterplaceholder={dataSet.filterPlaceholder} className={showFilter ? (className ? className : "multipleDropDown") : (className ? className : "multipleDropDown2 esc-multi-select-list")} as={showFilter && filterAction}>
                <Form.Check
                    style={dataSet.SelectListStyle}
                    className={dataSet.SelectListClass}
                    onChange={(e) => selectAll(e.target.checked)}
                    custom
                    key='as'
                    checked={allSelected}
                    label={dataSet.selectAllLabel ? dataSet.selectAllLabel : "Select All"}
                    type="checkbox"
                    name='selectAll'
                    id={ID()}
                />
                {dataSet.listItems.map((items, index) => {
                    return (
                        <Form.Check key={index}
                            style={dataSet.SelectListStyle}
                            className={dataSet.SelectListClass}
                            onChange={(e) => handleChange(e.target.checked, items)}
                            custom
                            checked={mapItem && mapItem.some(res => res === items)}
                            label={items}
                            type="checkbox"
                            name={items}
                            id={`i${ID()}`}
                        />
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
}
export default MultipleSelectArray;