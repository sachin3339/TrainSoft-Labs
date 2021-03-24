/*********
    * 
    * CallComm Technologies, Inc. Confidential
    * ____
    * 
    *  Copyright CallComm Technologies, Inc. 2021. All rights reserved
    * 
    * NOTICE:  All information contained herein is, and remains
    * the property of CallComm Technologies, Inc. and its suppliers,
    * if any.  The intellectual and technical concepts contained
    * herein are proprietary to CallComm Technologies, Inc.
    * and its suppliers and may be covered by U.S. and Foreign Patents,
    * patents in process, and are protected by trade secret or copyright law.
    * Dissemination of this information or reproduction of this material
    * is strictly forbidden unless prior written permission is obtained
    * from CallComm Technologies, Inc.
*/

import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import SelectableContext from "react-bootstrap/SelectableContext";
import './MultipleSelect.css'
import { ICN_DOWN_SMALL } from "ng-icons";
const close_icon = <svg fill="#888" xmlns="http://www.w3.org/2000/svg" width="7" height="9" viewBox="0 0 10 10"><path className="a" d="M6.9,10.625,9.738,7.782a.894.894,0,0,0,0-1.264l-.632-.632a.894.894,0,0,0-1.264,0L5,8.73,2.157,5.887a.894.894,0,0,0-1.264,0l-.632.632a.894.894,0,0,0,0,1.264L3.1,10.625.262,13.468a.894.894,0,0,0,0,1.264l.632.632a.894.894,0,0,0,1.264,0L5,12.52l2.843,2.843a.894.894,0,0,0,1.264,0l.632-.632a.894.894,0,0,0,0-1.264Z" transform="translate(0 -5.625)"></path></svg>

const MultipleSelectTag = ({ option = [], fieldKey, addTag, isTag=false, initialValue = null, selectedArray, onChangeInput, onSelect ,placeholder="", isAddTag = false}) => {
    const [mapItem, setMapItem] = useState([])
    const [options, setOptions] = useState([])
    const [onChangeInputs, setOnChangeInputs] = useState("")

    // pass the data on parent component
    useEffect(() => {
        selectedArray && selectedArray(mapItem)
    }, [mapItem])

    /*
       handleChange on on change 
       @param {e}  targeted element
   */
    const handleChange = (e) => {
        let data = e.target.value
        onChangeInput && onChangeInput(data.toLowerCase())
        setOnChangeInputs(data)
        let filterData = options.filter(res => res[fieldKey].toUpperCase().indexOf(data.toUpperCase()) > -1);
        data.length === 0 ? setOptions(option) : setOptions(filterData)
    }

    // initial value set on mapItem
    useEffect(() => {
        initialValue && setMapItem(initialValue)
    }, [])

    // option is update then options satte is update
    useEffect(() => {
        option && option.length > 0 && setOptions(option)
    }, [option])

    /*
        onclick add selected item
        prams: add - boolean true/false
        prams: val - selected object
    */
    const handelClick = (add, val) => {
        try {
            let selectedData = val
            if (add) {
                selectedData.action = true
                setMapItem([...mapItem, val])
                isTag && setOptions(options.filter(res => res[fieldKey] !== val[fieldKey]))
                setOnChangeInputs("")
                
            } else {
                selectedData.action = false
                isTag && setOptions([...options, val])
                setMapItem(mapItem && mapItem.filter(res => res[fieldKey] !== val[fieldKey]))
            }
            onSelect && onSelect(selectedData)
            
            
        } catch (err) {
            console.error("error occur on handelClick()", err)
        }
    }

    // call function when tag is Added
    const onAddTag = () => {
        setOnChangeInputs("")
        addTag()
    }

    return (<SelectableContext.Provider value={false}>
        <Dropdown className="dropdown-custom for-tag">
            <Dropdown.Toggle as="div" id="dropdown-custom-components" className="d-flex align-items-center full-w">
                <div className="w100 d-flex align-items-center justify-content-between">
                    <div className="input-container">
                        {isTag && mapItem.map((res,i) => <div key={i} className="field-tag">{res[fieldKey]} <span onClick={() => handelClick(false, res)}>{close_icon}</span></div>)}
                        <div>
                            <input placeholder={placeholder} type="text" value={onChangeInputs} onChange={handleChange} className="form-control form-control-sm input-field" />
                        </div>
                    </div>
                    <div>
                        {options && options.length === 0 && onChangeInputs.length > 2 && isAddTag && <span className="field-tag pointer" onClick={() => onAddTag()}>Add Tag</span>}
                        <span>{ICN_DOWN_SMALL}</span>
                    </div>
                </div>
            </Dropdown.Toggle>
            {options.length > 0 && <Dropdown.Menu>
                <div className="dropdown-container-box">
                {options.map((res, i) => <Dropdown.Item className="text-capitalize" key={i} onClick={() => handelClick(true, res)} eventKey={res}>{res[fieldKey]}</Dropdown.Item>
                )}
                </div>
            </Dropdown.Menu>}
        </Dropdown>
    </SelectableContext.Provider>
    );
}
export default MultipleSelectTag;