import { useState,useEffect } from "react"
import { ICN_CLOSE, ICN_SEARCH } from "../Icon"


const SearchBox = ({onChange=()=>{},onEnter=()=>{}}) => {
    const [value,setValue]= useState('')
    
    useEffect(() => onChange(value), [value])

    return(<div className="search-box">
        <div className="mr-2 aic search-icon-wrap">{ICN_SEARCH}</div>
        <div className="full-w">
            <input value={value} onKeyUp={(e)=> e.key === 'Enter' && onEnter (value)} onChange={(e)=> setValue(e.target.value)} placeholder="Search..." className="form-control form-control-sm" type="text"/>
        </div>
        <div className="mr-2 aic pointer" onClick={()=> setValue('')}>{value.length > 0 && ICN_CLOSE}</div>
    </div>)
}

export default SearchBox
