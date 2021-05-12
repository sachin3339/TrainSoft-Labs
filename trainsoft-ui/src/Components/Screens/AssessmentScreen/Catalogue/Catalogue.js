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

const data = [
    {name: "Technological",mark:"70",images:ICN_TECH},
    {name: "Psychometric",mark:"60", images:ICN_PER},
    {name: "Skills",mark:"78",images:ICN_SKILL},
    {name: "Personality Index",mark:"55",images:ICN_PSY},
    {name: "Aptitude Tests",mark:"99",images:ICN_APTI},
    {name: "Domain Tests",mark:"89",images:ICN_DMAIN},
]

const CatalogueList = () =>{

    return(<>
       <div className="catalog-box">
            {data.map(res=>
                    <div className="box-shadow catalog-list">
                    <div className="catalog-img">
                        <img src={res.images}/>
                    </div>
                    <div className="catalog-link">
                        <div className="link" onClick={()=>navigate('catalogue/catalogDetails',{ state: { path:'catalogue', title: 'Catalogue', } })}>{res.name}</div>
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

