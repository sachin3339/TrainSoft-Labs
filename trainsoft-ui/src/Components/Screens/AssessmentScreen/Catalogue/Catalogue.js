import  { useContext,useEffect } from 'react'

import { ICN_ARROW, ICN_PARTICIPANT } from '../../../Common/Icon';
import { navigate, Router } from '../../../Common/Router';
import ICN_TECH from '../images/tech.png'
import ICN_APTI from '../images/apti.png'
import ICN_DMAIN from '../images/dmain.png'
import ICN_PER from '../images/per.png'
import ICN_PSY from '../images/psy.png'
import ICN_SKILL from '../images/skill.png'



import '../assessment.css'
import CatalogueDetails from './CatalogDetails';
import AssessmentContext from '../../../../Store/AssessmentContext';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';

const icon = [
    {name: "Technology",mark:"70",images:ICN_TECH},
    {name: "Psychometric",mark:"60", images:ICN_PER},
    {name: "Skills",mark:"78",images:ICN_SKILL},
    {name: "Personality Index",mark:"55",images:ICN_PSY},
    {name: "Aptitude Tests",mark:"99",images:ICN_APTI},
    {name: "Domain Test",mark:"89",images:ICN_DMAIN},
]



const CatalogueList = () =>{
    const {user,spinner} = useContext(AppContext)
    const {category,setBookmark,setMyAssessment} = useContext(AssessmentContext)

      //  getBookmark 
      const getBookmark = async (categorySid) => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getBookmark(user.sid)
            setBookmark(data);
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getBookmark()", err)
        }
    }

     // get my assessment 
   const getMyAssessment = async () => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getMyAssessment('ALL',user.sid)
      setMyAssessment(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getMyAssessment()", err)
    }
  }

    useEffect(() => {
       getBookmark()
       getMyAssessment()
    }, [])
    return(<>
       <div className="catalog-box">
            {category.map(res=>
                    <div className="box-shadow catalog-list" key={res.sid}>
                    <div className="catalog-img">
                        <img src={icon.find(resp=>resp.name=== res.name)?.images}/>
                    </div>
                    <div className="catalog-link pointer"  onClick={()=>navigate('catalogue/catalogDetails',{ state: { path:'catalogue', title: 'Catalogue',data:res } })}>
                        <div className="link">{res.name}</div>
                        <div className="">
                        {ICN_ARROW}
                        </div>
                    </div>
            </div>
                )}
        </div>
    </>)

}

const Catalogue = ()=>{
    return(
        <Router>
            <CatalogueList path="/"/>
            <CatalogueDetails path="catalogDetails/*"/>
        </Router>
    )
}

export default Catalogue;

