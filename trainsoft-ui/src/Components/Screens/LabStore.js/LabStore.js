import { BtnPrimary } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_ON_GOING } from "../../Common/Icon"
import { navigate, Router } from "../../Common/Router";

import LabList from "./LabList";
import "./Styles.css";

const dummyData = [
    {label:'Infrastructure & DevOps', icon: ICN_ON_GOING, link: '', desc:'Implement, deploy, migrate and maintain application in the cloud'},
    {label:'Website Development', icon: ICN_ON_GOING, link: '',  desc:'For software engineers who develop web applications in the cloud'},
    {label:'App Development', icon: ICN_ON_GOING, link: '',  desc:'For developer who develops mobile apps in the cloud'},
    {label:'Big Data', icon: ICN_ON_GOING, link: '',  desc:'Design, build, analyze Big Data Solutions'},
    {label:'Machine Learning', icon: ICN_ON_GOING, link: '',  desc:'Write distributed Machine Learning models that scale'},
    {label:'Security Backups & Recovery', icon: ICN_ON_GOING, link: '',  desc:'Stay compliant, protect information, data application and infrastructure'}
]

const LabStores = () => {
    return (<div className="table-shadow p-3">
          <div className="jcb ">
                <div className="">Lab Store</div>
                <SearchBox/>
            </div>
            <div className="flx mt-3 storeTab-shadow">
                  <div className="tab-btn">Catalog</div>  
                  <div className="tab-btn secondary-color">My Labs</div>  
            </div>

            <div className="catalog-container">
                {dummyData.map(res=> <div className="catalogBox">
                    <div className="aic flx1 jcc">{res.icon}</div>
                    <div className="catalogBox-info">
                        <div>
                            <div className="title-md text-white">{res.label}</div>
                            <div className="title-sm text-white">{res.desc}</div>
                        </div>
                        <div className="text-right">
                        <BtnPrimary onClick={()=>navigate('labstore/lab-list')}>Show All 50 Labs</BtnPrimary>
                        </div>
                    </div>
                </div> )}
          
            </div>

</div>)
}

const LabStore = ()=>{
    return(
    <Router>
        <LabStores path="/"/>
        <LabList path="lab-list"/>
    </Router>)
}
export default LabStore