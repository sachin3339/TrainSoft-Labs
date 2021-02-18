import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_ON_GOING } from "../../Common/Icon"
import { navigate, Router } from "../../Common/Router";

import LabList from "./LabList";
import "./Styles.css";
import CardHeader from "../../Common/CardHeader";
import MyLab from "./MyLab/MyLab";

const dummyData = [
    {label:'Infrastructure & DevOps', icon: ICN_ON_GOING, link: '', desc:'Implement, deploy, migrate and maintain application in the cloud'},
    {label:'Website Development', icon: ICN_ON_GOING, link: '',  desc:'For software engineers who develop web applications in the cloud'},
    {label:'App Development', icon: ICN_ON_GOING, link: '',  desc:'For developer who develops mobile apps in the cloud'},
    {label:'Big Data', icon: ICN_ON_GOING, link: '',  desc:'Design, build, analyze Big Data Solutions'},
    {label:'Machine Learning', icon: ICN_ON_GOING, link: '',  desc:'Write distributed Machine Learning models that scale'},
    {label:'Security Backups & Recovery', icon: ICN_ON_GOING, link: '',  desc:'Stay compliant, protect information, data application and infrastructure'}
]

const dummyData2 = [
    {label:'Google Cloud Essentials', icon: ICN_ON_GOING, link: '', desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Google Cloud Essentials', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'App Development', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Big Data', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Machine Learning', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Security Backups & Recovery', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'}
]

const LabContainer = ({location})=>{
    return (<div className="catalog-container">
    {dummyData.map(res=> <div className="catalogBox">
        <div className="aic flx1 jcc">{res.icon}</div>
        <div className="catalogBox-info">
            <div>
                <div className="title-md text-white">{res.label}</div>
                <div className="title-sm text-white">{res.desc}</div>
            </div>
            <div className="text-right">
            <BtnPrimary onClick={()=> navigate('labstore/lab-list',{state: { title: 'LAB STORE', subTitle:"Catalog", subPath:"labstore" }})}>Show All 50 Labs</BtnPrimary>
            </div>
        </div>
    </div> )}

</div>)
}

const LabStore = ({location})=>{
    console.log(location)
    return(
        <div className="table-shadow p-3">
        <CardHeader {...{location}}/>
          <div className="flx storeTab-shadow mb-3">
              <TabBtn active={location.state.subPath === "labstore"} onClick={()=>navigate("/labstore",{state: { title: 'LAB STORE',subTitle:"Catalog", subPath:"labstore" }})}>Catalog</TabBtn>
              <TabBtn  active={location.state.subPath === "mylab"} onClick={()=>navigate("/labstore/mylab",{state: { title: 'LAB STORE',subTitle:"My Lab", subPath:"mylab"  }})}>My Labs</TabBtn> 
          </div>
          <Router>
                <LabContainer path="/"/>
                <LabList {...{list: dummyData2}} path="lab-list"/>
                <MyLab  {...{dummyData2}} path="mylab"/>
          </Router>
    </div>)
}
export default LabStore
