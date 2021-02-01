import { ShowChart } from "@material-ui/icons";
import { useState } from "react";
import { BtnPrimary } from "../../Components/Buttons/Buttons";
import ModalGen from "../../Components/Modal/Modal";
import SearchBox from "../../Components/SearchBox/SearchBox"
import { ICN_ON_GOING, ICN_STAR } from "../../Constant/Icon"
import AddLab from "./AddLab";
import "./Styles.css";

const dummyData = [
    {label:'Google Cloud Essentials', icon: ICN_ON_GOING, link: '', desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Google Cloud Essentials', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'App Development', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Big Data', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Machine Learning', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'},
    {label:'Security Backups & Recovery', icon: ICN_ON_GOING, link: '',  desc:'In this introductory-level Quest, you will get hands-on practice with the Google Cloud’s fundamental tools and services. Google Cloud Essentials is the recommended first Quest for the Google... more details'}
]

const LabList = () => {
    const [show,setShow] = useState(false)
    return (<div className="table-shadow p-3">
          <div className="jcb ">
                <div className="">Lab Store</div>
                <SearchBox/>
            </div>
            <div className="flx mt-3">
                  <div className="tab-btn">Catalog</div>  
                  <div className="tab-btn secondary-color">My Labs</div>  
            </div>

            <div className="catalog-container">
                {dummyData.map(res=> <div className="labList">
                    <div className="aic flx1 jcc">{res.icon}</div>
                    <div className="labList-info flx5">
                        <div>
                            <div className="title-md text-white">{res.label}</div>
                            <div className="title-sm text-white">{res.desc}</div>
                        </div>
                        <div className="text-md text-white">
                            <div className="row">
                                <div className="col-3">
                                    2 hours
                                </div>
                                <div className="col-3">
                                    Intermediate
                                </div>
                                <div className="col-3">
                                    on Demand
                                </div>
                                <div className="col-3">
                                    0.2$
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right jcb-c">
                        <div><BtnPrimary onClick={()=>setShow(true)}>+ Import Now</BtnPrimary></div>
                        <div className="">
                              <div className="title-sm text-white">500 + active imports</div>
                              <div className="star-icon">
                                  <div>
                                      {ICN_STAR}
                                  </div>
                                  <div>
                                      {ICN_STAR}
                                  </div>
                                  <div>
                                      {ICN_STAR}
                                  </div>
                                  <div>
                                      {ICN_STAR}
                                  </div>
                                  <div>
                                      {ICN_STAR}
                                  </div>
                                  
                              </div>
                        </div>
                    </div>
                </div> )}
          
            </div>
    {<ModalGen {...{show,setShow,headerTitle:"Add This Lab",size:"xl"}}>
         {show && <AddLab/>}  
    </ModalGen>}
</div>)
}

export default LabList