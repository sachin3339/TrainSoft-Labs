
import React, { useState, useEffect } from 'react';
import AppUtils from "../../../Services/Utils";
import Dropdown from 'react-bootstrap/Dropdown';
import SelectableContext from "react-bootstrap/SelectableContext";
import "./CustomDropdown.css";
const ICN_EXPAND_MORE = <svg xmlns="http://www.w3.org/2000/svg" width="9.887" height="6" viewBox="0 0 9.887 6"><path fill="#888" className="a" d="M4.957,14.524l-4.4-4.4a.543.543,0,0,1,0-.768l.513-.513a.543.543,0,0,1,.768,0l3.5,3.487,3.5-3.487a.543.543,0,0,1,.768,0l.513.513a.543.543,0,0,1,0,.768l-4.4,4.4A.543.543,0,0,1,4.957,14.524Z" transform="translate(-0.398 -8.683)"></path></svg>
const CustomDropdown = ({
	data,
	bindKey,
	valueKey,
	searchKeywords,
	onSelect,
	title,
	selectedVal,
	visible,
	field,
	filter= false,
	onClosed = () => { },
	disabled = false,
	onChange 
}) => {
	const [state, setState] = useState({
		data,
		bindKey,
		valueKey,
		searchKeywords,
		onSelect,
		title,
		selectedVal,
		onChange
	});

	/*
		Stops event propagation when user selets an option.
		@param {Event} e - Click event object
	*/
	const preventEventForSearch = (e) => e.stopPropagation();

	/*
		Fired when user selects a dropdown option.
		@param {Event} e - Click event object
		@param {Objects} obj - Dropdown option object
	*/
	const valueSelected = (e, obj) => {
		try {
			state.selectedVal = getSelectedVal(obj);
			state.searchKeywords = "";
			state.onSelect((state.valueKey) ? obj[state.valueKey] : obj);
			state.onChange((state.valueKey) ? obj[state.valueKey] : obj)
			setState({ ...state })
			preventEventForSearch(e);
		} catch (err) {
			console.error("Error occurred while valueSelected -- " + err);
		}
	}

	// Returns filterd data by bind key
	const filteredData = () => {
		let fData = [];
		try {
			fData = state.data.filter((arr) => ((arr[state.bindKey] ? arr[state.bindKey] : arr).search(new RegExp(AppUtils.escapeRegExString(state.searchKeywords), "i")) >= 0));
		} catch (err) {
			fData = [];
		}
		return fData;
	}

	// Returns selected value by bindKey if it's object
	const getSelectedVal = (val) => AppUtils.isObject(val) ? val[bindKey] : val;

	// Listening props value changes and update the same in local state
	useEffect(() => {
		setState({
			...state,
			data,
			bindKey,
			valueKey,
			onSelect,
			title,
			onChange
		});
	}, [data, bindKey, valueKey, onSelect, title,onChange])

	// Listening props value changes and update the same in local state
	useEffect(() => {
		setState({
			...state,
			selectedVal: getSelectedVal(selectedVal)
		});
	}, [selectedVal])

	// Listening a click event of dropdown and set search keyword as empty
	useEffect(() => {
		const setSearchKeywords = () => setState({ ...state, searchKeywords: "" });
		let elem = document.getElementById("eserve-dropdown");
		elem.addEventListener("click", setSearchKeywords);
		return elem.removeEventListener("click", setSearchKeywords)
	}, [])

	return <SelectableContext.Provider value={false}>
		<Dropdown onToggle={(e) => (e && onClosed())} className={`dropdown-custom ${disabled ? 'disabled': ''})`}>
			<Dropdown.Toggle variant="light" size="sm" as="div" id="eserve-dropdown" className="text-left flx aic" style={{ pointerEvents: disabled && "none" }}>
				<div className="w100">
					<input type="text"  {...field} className="form-control form-control-sm" value={getSelectedVal(state.selectedVal) || state.title} />
				</div>
				<div>
					{ICN_EXPAND_MORE}
				</div>
				{/* {getSelectedVal(state.selectedVal) || state.title} */}
			</Dropdown.Toggle>
			<Dropdown.Menu className="w100 " show={visible}>
				<div className="dropdown-container-box">
				{filter && <div className="ddsearch" onClick={(e) => preventEventForSearch(e)}>
						<div className="searchInputType3 w100 flx flx-center">
							<span className="fa-magnif"><i className="fa fa-search"></i></span>
							<div className="flx1">
								<input type="text" className="form-control form-control-sm " value={state.searchKeywords} onChange={(e) => setState({ ...state, searchKeywords: e.target.value })} placeholder="Search..." />
							</div>
						 </div>
					  </div>
					}
				{
					!AppUtils.isEmptyArray(state.data) && <div className="maxh200">
						{filteredData().map((arr, index) => <Dropdown.Item key={index} onClick={(e) => { valueSelected(e, arr) }}>{arr[state.bindKey] || arr}</Dropdown.Item>)}
					</div>
				}
				</div>

				{
					(AppUtils.isEmptyArray(state.data)
						|| (AppUtils.isNotEmpty(state.searchKeywords)
							&& filteredData().length <= 0))
					&& <Dropdown.Item className="pb-3">No records found</Dropdown.Item>
				}
			</Dropdown.Menu>
		</Dropdown>
	</SelectableContext.Provider>
}
export default CustomDropdown;