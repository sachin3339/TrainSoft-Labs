
import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Form, FormControl } from 'react-bootstrap';
import useOnClickOutside from '../../../Store/useOnClickOutside';
import './MultipleSelect.css'
const downIcon = <svg xmlns="http://www.w3.org/2000/svg" width="9.887" height="6" viewBox="0 0 9.887 6"><path fill="#888" className="a" d="M4.957,14.524l-4.4-4.4a.543.543,0,0,1,0-.768l.513-.513a.543.543,0,0,1,.768,0l3.5,3.487,3.5-3.487a.543.543,0,0,1,.768,0l.513.513a.543.543,0,0,1,0,.768l-4.4,4.4A.543.543,0,0,1,4.957,14.524Z" transform="translate(-0.398 -8.683)"></path></svg>

/*  ------ Multiple Select ----
Initially All checkbox is Unselected
Props: 
 placeholder - Name of MultiSelect default in empty
 dataSet - set of object data, 
 sortDirection - ascending/descending By default ascending,
 style - customize list of dropdown  by applying css style 
 checked - true/false
 onSelect - function that handle on change
 className -customize list of dropdown by class name 
 showFilter - true/false  default-true
 */
const MultiSelect = ({ dataSet, className = null,footerClick, selectAllMsg = "", isShowMore = false, showFilter = false, checked = false, style = null, sortDirection, onSelect, initialData = [], footerAction = false }) => {
  const [mapItem, setMapItem] = useState(null)
  const [viewData, setViewData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [show,setShow] = useState(false)
  const wrapperRef = useRef(null);

  

  /*
    * Filter attribute
    * @listDat {array} - array of attributes of the parent element 
    * @inputValue {string} - input value 
*/
  const filterArray = (listData) => {
    let filterData = listData
    if (searchValue) 
      filterData = listData.filter(res => res[dataSet.label].toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
    return filterData
  }

  /*
      Sort the array by key.
      @param {Array of Objects} arr - Array of object which is source data
      @param {String} key - Object key which is used to sort the array
      @param {Boolean} isAsc - Default ascending order is true
      @return {Array of Objects} - Returns sorted array
  */
  const ID = () => ('_' + Math.random().toString(36).substr(2, 9))

  const sortByKey = (arr = [], key = "", isAsc) => {
    if (isAsc) {
      return ((Array.isArray(arr) && key) ? (arr.sort((a, b) => (typeof a[key] === 'string' ? a[key].toUpperCase() : (a[key]) > (typeof b[key] === 'string') ? b[key].toUpperCase() : (b[key]) !== isAsc) ? -1 : 1)) : arr)
    } else {
      return arr
    }
  }

  /* 
  Dropdown needs access to the DOM node in order to position the Menu
  props
    toggleClass: String -pass the class name
    togglestyle: Pass the style
*/
  const CustomToggle = React.forwardRef(({ children, onClick, toggleClass, togglestyle }, ref) => (
    <div className={toggleClass ? toggleClass : "selectButtons"} ref={ref} title={mapItem.map(res => res[dataSet.label]).join(',')}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}
      style={togglestyle}>
      {children}
    </div>
  ));

  /*
      handleChange on click 
      @param {take element}  e.target.name take the checked name
  */
  const handleChange = (click, data) => click ? setMapItem([...mapItem, data]) : setMapItem(mapItem.filter(res => res !== data))

  /*
      select all the list items
      @param {take element}  e.target.name take the checked name
  */
  const selectAll = (e) => e ? setMapItem(dataSet.selectItems) : setMapItem([])


  // view render data
  const renderData = () => {
    let joinData = ''
    try {
      let obj = viewData.map(res => res[dataSet.label].toLowerCase())
      let objLength = obj.length
      if (objLength > 0) {
        if (objLength === dataSet.selectItems.length) {
          joinData = selectAllMsg
        } else {
          joinData = (objLength > 2 ? <> <span>{`${obj.slice(0, 2).join(',')} & (${objLength - 2}) More`}</span></> : obj.join(','))
        }
      } else {
        joinData = <div>{dataSet.placeholder}</div>
      }
    } catch (err) {
      console.error('error occur on renderData()', err)
    }
    return <div className="d-flex"><span>{joinData}</span><span className="ml-2">{downIcon}</span></div>
  }

  // on cancel event
  const onCancel = () => {
    if (viewData.length > 0) {
      setViewData(viewData)
      setMapItem(viewData)
    }
    else {
      setMapItem([])
    }
  }
     // check to see if the user clicked outside of this component
     useOnClickOutside(wrapperRef, () => {
      try {
          setShow(false)
      } catch (err) {
          console.error("error occur on useOnClickOutside()")
      }
  });

  // show the content of dropdown field
  const showLabel = () => {
    try {
      let dropDownLabel = ''
      if (mapItem.length === 0) {
        dropDownLabel = dataSet.placeholder
      } else if (mapItem.length === dataSet.selectItems.length) {
        dropDownLabel = selectAllMsg
      } else {
        dropDownLabel = mapItem.map(res => res[dataSet.label]).join(',')
      }
      return dropDownLabel
    } catch (err) {
      console.error("error occur on showLabel()", err)
    }

  }

   // pass the data on parent component
   useEffect(() => {
    !footerAction && mapItem && onSelect(mapItem)
  }, [mapItem])


  useEffect(() => {
    selectAll(checked)
  }, [checked])

    // take initial values
    useEffect(() => {
      initialData && setMapItem(initialData)
    }, [])

  return (<>
    {dataSet.selectItems && mapItem && <div className="dropdown-container">
      <div onClick={()=>setShow(!show)} className="pointer full-w">
        {isShowMore ? renderData() : showLabel()}
      </div>
     { show && <div ref={wrapperRef} className={`multipleDropDown2 esc-multi-select-list `}  style={{"position": "absolute", "inset": "0px auto auto 0px", "margin": "0px", "transform": "translate(30px, 36px)"}}>
        {/* {dataSet.topMenu && <div className="dropDown-header"><span className="text-muted pl-3">{dataSet.topMenu}</span></div>} */}
        {/* {showFilter && <div className="dropDown-search">
          <FormControl autoFocus placeholder={dataSet.filterPlaceholder ? dataSet.filterPlaceholder : "Type to filter..."} onChange={e => setSearchValue(e.target.value)} size="sm" />
        </div>} */}
        <div className="dropdown-body">
          {searchValue.length === 0 && <Form.Check
            // style={dataSet.SelectListStyle}
            className={dataSet.SelectListClass}
            onChange={(e) => selectAll(e.target.checked)}
            custom
            key='as'
            checked={dataSet.selectItems.length === mapItem.length ? true : false}
            label={dataSet.selectAllLabel ? dataSet.selectAllLabel : "Select All"}
            type="checkbox"
            name='selectAll'
            id={ID()}
          />}
          {filterArray(dataSet.selectItems).map((items, index) => {
            return (
              <Form.Check key={index}
                // style={dataSet.SelectListStyle}
               
                className={dataSet.SelectListClass}
                onChange={(e) => handleChange(e.target.checked, items)}
                custom
                checked={mapItem.some(res => res[dataSet.label] === items[dataSet.label])}
                label={items[dataSet.label]}
                type="checkbox"
                name={items[dataSet.label]}
                id={ID()}
              />
            )
          })}
        </div>
        {filterArray(dataSet.selectItems).length === 0 && showFilter && <div className="px-3 pt-2">{dataSet.dataNotFound}</div>}
        {footerAction && <div className="dropdown-footer">
          <div className="flx">
            <div className="text-center" onClick={footerClick}>Add New Batch</div>
            {/* <Dropdown.Item eventKey="1" className="btn btn-sm btn-light btn-outlined mr-2" onClick={() => onCancel()}>Cancel</Dropdown.Item> */}
            {/* <Dropdown.Item eventKey="1" className="btn btn-sm btn-primary text-white" onClick={() => { onSelect(mapItem); setViewData(mapItem); }}> Apply </Dropdown.Item> */}
          </div>
        </div>
        }
      </div>}
    </div>
    }</>
  );
}
export default MultiSelect;