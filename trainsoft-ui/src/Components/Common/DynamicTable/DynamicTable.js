import React, { useState, useEffect } from 'react';
import { Table, OverlayTrigger, Dropdown, Tooltip } from 'react-bootstrap';
import { ICN_ARROW_DOWN,ICN_MORE } from '../Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import './dynamicTable.css';
import PaginationOne from '../Pagination';
const htmlParser = require('html-react-parser');
const NO_ARROW_HIGHLIGHTED = ICN_ARROW_DOWN
const HIGHLIGHT_UP_ARROW = ICN_ARROW_DOWN;
const HIGHLIGHT_DOWN_ARROW = ICN_ARROW_DOWN;
/*
    Sort the array by key.
    @param {Array of Objects} arr - Array of object which is source data
    @param {String} key - Object key which is used to sort the array
    @param {Boolean} isAsc - Default ascending order is true
    @return {Array of Objects} - Returns sorted array
*/
const sortByKey = (arr = [], key = "", isAsc = true) => (Array.isArray(arr) && key) ? (arr.sort((a, b) => (typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]) > (typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]) !== isAsc ? -1 : 1)) : arr;

/*
    Applies filter on table rows for search enabled configuration only by search query.
    @param {Array of Objects} data - Array of object which is source data
    @param {Object} configuration - Table configuration such as columns and it's actions
    @param {String} str - Search query string
    @return {Array of Objects}
*/
const applyFilter = (data = [], configuration = {}, str = "") => {
    let filteredArr = [];
    try {
        if (typeof str === "string" && str) {
            let searchEnabledColumns = Object.keys(configuration.columns).filter(key => configuration.columns[key].isSearchEnabled); // Returns search enabled configuration key only
            filteredArr = data.filter(elem => searchEnabledColumns.some(key => elem[key].toUpperCase().indexOf(str.toUpperCase()) >= 0))
        } else {
            filteredArr = data
        }
    } catch (err) {
        filteredArr = data;
    }
    return filteredArr;
}

/*
    Returns custom field as per configuration.
    @param {Object} config - Column configurations
    @param {String} key - Source data Object key
    @param {Any} val - source data object value
    @return {JSX} - Table data(td)
*/
const getTableData = (config = {}, data = {}, key = "") => {
    let temp = data[key];
    try {
        if (config.render) temp = config.render(data, key);
        if (temp === null || temp === undefined || temp === "") temp = "NA"; // display NA-Not Available if data is not available
    } catch (err) {
        console.error("Exception occurred in getTableData -- " + err);
    }
    return temp;
}

/*
    Constructing table header.
    @param {Object} columns - It has all the table configuration such as columns and it's actions
    @param {String} headerTextColor - Custom css class
    @param {Function} updateSortBy - this is the callback function
    @param {Object} configuration -Table configuration such as columns and it's actions
    @return {JSX} - Table header(th)
*/
const TableHeader = ({ columns = {}, headerTextColor = "", updateSortBy, sortBy, actions, showCheckbox, isSelectedAll, onSelectAll }) => <tr>
    {showCheckbox && <th style={{ 'width': '10px', "padding": "8px 18px" }}>
        <div className="custom-input">
            <input type="checkbox" id="select-all" checked={isSelectedAll} onChange={(e) => onSelectAll(e.target.checked)} />
            <label htmlFor="select-all"></label>
        </div>
    </th>}
    {Object.keys(columns).map((key, i) => {



        return <th key={i} className={(key === sortBy && columns[key].sortEnabled) ? "active-sort" : ""} style={{ width: columns[key].width, color: headerTextColor }} onClick={() => { if (columns[key].sortEnabled && typeof updateSortBy === 'function') updateSortBy(key) }}>
            {columns[key].title && <div> {typeof columns[key].title === 'string' && columns[key].title}{typeof updateSortBy === 'function' && <span>&emsp;{(typeof columns[key].title === 'string' && (key === sortBy)) ? (columns[key].sortDirection ? HIGHLIGHT_UP_ARROW : HIGHLIGHT_DOWN_ARROW) : ((columns[key].sortEnabled) ? NO_ARROW_HIGHLIGHTED : "")}</span>}</div>}
        </th>
    })}
    {actions && actions.length > 0 && <th style={{ "width": "50px" }}></th>}
</tr>

/*
    Constructing table body which is rows(tr).
    @param {Array of Objects} sourceData - Row data's
    @param {Object} configuration -Table configuration such as columns and it's actions
    @return {JSX} - Table header(th)
*/
const TableBody = ({ sourceData, configuration, onSelect }) => sourceData.map((data, idx) => <tr key={idx}>
    {/* key mapping. Note: key should be same as table key*/}
    {configuration.showCheckbox && <td style={{ 'width': '10px', "padding": "8px 18px" }}>
        <div className="custom-input">
            <input type="checkbox" id={idx} checked={data.isChecked} onChange={(e) => onSelect(e.target.checked, idx)} />
            <label htmlFor={idx}></label>
        </div>
    </td>}
    {Object.keys(configuration.columns).map((key, rowIdx) => <td key={rowIdx} className={`${configuration.columns[key].tdCustomClass ? configuration.columns[key].tdCustomClass : "elps"} ${getTableData(configuration.columns[key], data, key) === "NA" ? "text-muted" : ""}`} onClick={() => { if (typeof configuration.columns[key].onClick === 'function') configuration.columns[key].onClick(data) }}>
        {configuration.showTooltip ? <OverlayTrigger placement='auto' flip={true} overlay={<Tooltip>{data[key] || configuration.columns[key].title}</Tooltip>}><span>{getTableData(configuration.columns[key], data, key)}</span></OverlayTrigger> : <span>{getTableData(configuration.columns[key], data, key)}</span>}
    </td>)}
    {configuration.actions && configuration.actions.length > 0 && <td className="text-right">{!configuration.isHideEdit && <Action {...{ configuration, "row": data, index: idx }} />}</td>}
</tr>)

/*
    Constructing table row action.
    @param {Object} configuration -Table configuration such as columns and it's actions
    @param {Object} row - Row object
    @return {JSX} - Dropdown with set of actions which passed through props
*/
const Action = ({ configuration = {}, row = {}, index = null }) => <Dropdown alignRight={configuration.actionAlignment ? configuration.actionAlignment : true}>
    <Dropdown.Toggle as={CustomToggle} variant={configuration.actionVariant ? configuration.actionVariant : ""} className={configuration.actionCustomClass} id={"actions-" + Math.random()} >
        {ICN_MORE}
    </Dropdown.Toggle>
    <Dropdown.Menu size="sm" >
        {
            configuration.actions.filter(action => (!action.rule || (typeof action.rule === "function" && action.rule(row)))).map((action, i) => <Dropdown.Item key={i} onClick={(e) => {
                if (typeof action.onClick === 'function')
                    action.onClick(row, index);
            }} as="button">
                <span className="action-icon">{action.icon}</span>{action.title}
            </Dropdown.Item>)
        }
    </Dropdown.Menu>
</Dropdown>

/*
    React bootstrap table component, It can be used where data to represented in table format.
    @param {Object} props - The date required data to build a table
    @return {JSX} - Table
*/
export const DynamicTable = (props) => {
    const [sourceData, setSourceData] = useState(props.sourceData);
    const [isSelectedAll, setSelectedAll] = useState(false);
    /**
		Fires when user clicked on single checkbox.
		@param {Boolean} checked - This is checkbox event value
	*/
    const onSelect = (checked, idx) => {
        try {
            let flag = checked;
            let tempData = sourceData[idx];
            if (tempData) {
                tempData.isChecked = checked;
                setSourceData([...sourceData]);
                setSelectedAll(flag ? ((sourceData.filter(sd => sd.isChecked)).length === sourceData.length) : flag);
                props.onSelected(sourceData.filter(e => e.isChecked)); // Invoking callback method when there user take an action of checkbox
            }
        } catch (err) {
            console.error("Exception occurred in onSelect -- " + err);
        }
    }

    /**
		Fires when user clicked on select all checkbox.
		@param {Boolean} checked - This is checkbox event value
	*/
    const onSelectAll = (flag) => {
        try {
            if (Array.isArray(sourceData) && sourceData.length > 0) {
                for (let i = 0, l = sourceData.length; i < l; i++)
                    sourceData[i].isChecked = flag;
                setSourceData([...sourceData]);
                setSelectedAll(flag);
                props.onSelected(sourceData.filter(e => e.isChecked)); // Invoking callback method when there user take an action of checkbox
            }
        } catch (err) {
            console.error("Exception occurred in onSelectAll -- " + err);
        }
    }

    // Listening for source data change and updates checkbox isSelected.
    useEffect(() => {
        if (Array.isArray(sourceData) && sourceData.length > 0) {
            let temp = sourceData.filter(d => d.isChecked);
            if (temp.length === sourceData.length && !isSelectedAll) setSelectedAll(true);
        }
    }, [sourceData]);

    // Listening for source data change and update the same in source data
    useEffect(() => {
        if (Array.isArray(props.sourceData)) setSourceData(props.sourceData);
    }, [props.sourceData]);

    // Listening for clear selection value change
    useEffect(() => {
        if (props.configuration.clearSelection) onSelectAll(false);
    }, [props.configuration.clearSelection]);

    // Listen sortBy, sortDirection and update the data source
    useEffect(() => {
        setSourceData(sortByKey(applyFilter(sourceData, props.configuration, props.configuration.searchQuery), props.configuration.sortBy, props.configuration.sortDirection));
    }, [props.configuration.sortBy, props.configuration.sortDirection])

    return<> <div className="dynamic-table-wrapper"><Table className={props.configuration.tableCustomClass ? props.configuration.tableCustomClass : "ng-table"}>
        <thead>
            <TableHeader {...{ ...props.configuration, isSelectedAll, onSelectAll }} />
        </thead>
        <tbody>
            {Array.isArray(sourceData) && sourceData.length > 0 && <TableBody {...{ ...props, sourceData, onSelect }} />}
            {
                (!Array.isArray(sourceData) || sourceData.length <= 0) && <tr className="text-center">
                    <td colSpan={Object.keys(props.configuration.columns).length + (props.configuration.actions ? 1 : 0) + (props.configuration.showCheckbox ? 1 : 0)} className="no-item-show mt-4">
                        {props.errorMessage || "There's no records"}
                    </td>
                </tr>
            }
        </tbody>
    </Table></div>
    <div className="pagination-div">
        {props.onPageChange && <PaginationOne totalCount={props.count ? props.count : 5}  onNavigate={props.onPageChange}/> }
    </div>
</>}
export default DynamicTable;