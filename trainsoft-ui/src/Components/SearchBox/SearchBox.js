import { ICN_SEARCH } from "../../Constant/Icon"


const SearchBox = () => <div className="search-box">
        <div className="mr-2">{ICN_SEARCH}</div>
        <div className="full-w">
            <input placeholder="Search..." className="form-control form-control-sm" type="text"/>
        </div>
</div>

export default SearchBox
