import {useEffect,useContext,useState} from 'react'
import { Form } from 'react-bootstrap';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';
import { ICN_ARROW_DOWN } from '../../../Common/Icon';
import SearchBox from '../../../Common/SearchBox/SearchBox';
import AssessmentRender from './AssessmentRender';
import '../assessment.css'
import GLOBELCONSTANT from '../../../../Constant/GlobleConstant';


const CatalogueDetails = ({location})=>{
  const {user,spinner} = useContext(AppContext)
  const [count,setCount] =  useState()
  const [tags,setTags] =useState({})
  const [categoryAssessment,setCategoryAssessment] = useState([])

   // get avg. category 
   const getAssessmentByCategory = async (pageNo=1) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getAssessmentByCategory(user.companySid,location?.state?.data.sid,10,pageNo-1)
      setCategoryAssessment(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAvgCategory()", err)
    }
  }

  // get avg. category 
  const getAssessmentCount = async (value) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getCategoryAssessmentCount(user.companySid,location?.state?.data?.sid,)
      setCount(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAvgCategory()", err)
    }
  }

  // get getAssessmentTag
  const getAssessmentTag = async (value) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.getTagCount(user.companySid,location?.state?.data?.sid,)
      setTags(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAvgCategory()", err)
    }
  }

   // get getAssessmentTag
   const searchAssessment = async (value) => {
    spinner.show("Loading... wait");
    try {
      let { data } = await RestService.searchCategoryAssessment(value,user.companySid,location?.state?.data?.sid,300,GLOBELCONSTANT.PAGE_SIZE)
      setCategoryAssessment(data);
      spinner.hide();
    } catch (err) {
      spinner.hide();
      console.error("error occur on getAvgCategory()", err)
    }
  }



  useEffect(() => {
    getAssessmentTag()
    getAssessmentCount();
    getAssessmentByCategory();
  }, [])

    return(<>
        <div className="row">
          <div className="col-sm-3 jcb border-bottom px-3">
            <div className="title-md">
                Filter
            </div>
            <div className="">
                Clear
            </div>
         </div>
          <div className="col-sm-9 jcb mb-3">
            <div> {count} Assessments </div>
            <div> <SearchBox 
            {...{
             onChange: (e) => e.length === 0 && getAssessmentByCategory(),
             onEnter: (e) => searchAssessment(e)}}/> </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="title-sm jcb my-3">
                <div>Technology</div>
                    <div>{ICN_ARROW_DOWN}</div>
                </div>
              {tags?.assessmentCountTagToList?.map(res=>
                <div className="jcb" key={res.sid}>
                  <Form.Check custom inline className="text-capitalize" label={res.tagName?.toLowerCase()} type="checkbox" id={`custom-${res.tagName}`}/>
                  <div>{res.count}</div>
                </div>
                )}
             <div className="title-sm jcb my-3">
                <div>Difficulty</div>
                    <div>{ICN_ARROW_DOWN}</div>
             </div>
             {tags?.assessmentCountDifficultyToList?.map(res=>
              <div className="jcb" key={res.sid}>
                <Form.Check custom inline className="text-capitalize" label={res.difficultyName?.toLowerCase()} type="checkbox" id={`custom-${res.difficultyName}`}/>
                <div>{res.count}</div>
              </div>
              )}
         </div>
          <div className="col-sm-9">
            <div className="">
                <AssessmentRender {...{data:categoryAssessment,count, setPageNo:(e)=> getAssessmentByCategory(e)}}/>
            </div>
          </div>
        </div>

    </>
    )

}

export default CatalogueDetails;

