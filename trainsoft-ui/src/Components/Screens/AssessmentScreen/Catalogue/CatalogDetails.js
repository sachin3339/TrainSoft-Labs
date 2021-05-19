import {useEffect,useContext,useState} from 'react'
import { Form } from 'react-bootstrap';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';
import { ICN_ARROW_DOWN } from '../../../Common/Icon';
import SearchBox from '../../../Common/SearchBox/SearchBox';
import AssessmentRender from './AssessmentRender';
import '../assessment.css'
import GLOBELCONSTANT from '../../../../Constant/GlobleConstant';
import AssessmentContext from '../../../../Store/AssessmentContext';


const CatalogueDetails = ({location})=>{
  const {user,spinner} = useContext(AppContext)
  const [count,setCount] =  useState()
  const [tags,setTags] =useState({})
  const [categoryAssessment,setCategoryAssessment] = useState([])
  const [difficulty,setDifficulty] = useState([])
  const [tagList,setTagList] = useState([])

    // filter assessment
    const filterAssessment = async (pageNo=1) => {
      spinner.show("Loading... wait");
      let  payload = {
          "categorySid":location?.state?.data.sid ,
          "companySid": user.companySid,
          "difficultyList":  difficulty,
          "tagsList": tagList
        }
      try {
        let { data } = await RestService.filterAssessment(pageNo-1,GLOBELCONSTANT.PAGE_SIZE,payload)
        setCategoryAssessment(data);
        filterCount()
        spinner.hide();
      } catch (err) {
        spinner.hide();
        console.error("error occur on getAvgCategory()", err)
      }
    }

     // filter assessment
     const filterCount = async () => {
      spinner.show("Loading... wait");
      let  payload = {
          "categorySid":location?.state?.data.sid ,
          "companySid": user.companySid,
          "difficultyList":  difficulty,
          "tagsList": tagList
        }
      try {
        let { data } = await RestService.filterCount(payload)
        setCount(data);
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

const onSelectTag = (e,sid)=>{
  try{
    let checked = e.target.checked
    if(checked){
        setTagList([...tagList,sid])
    }else{
      setTagList(tagList.filter(res=>res !== sid))
    }

  }catch(err){
    console.error("error occur on onSelectTag",err)
  }
}

const onSelectDeficulty = (e,def)=>{
  try{
    let checked = e.target.checked
    if(checked){
        setDifficulty([...difficulty,def])
    }else{
      setDifficulty(difficulty.filter(res=>res !== def))
    }

  }catch(err){
    console.error("error occur on onSelectDifficulty",err)
  }
}


useEffect(() => {
    filterAssessment()
}, [tagList,difficulty])

  useEffect(() => {
    getAssessmentTag()
    getAssessmentCount();
    filterAssessment()
  }, [])

    return(<>
        <div className="row">
          <div className="col-sm-3 jcb border-bottom px-3">
            <div className="title-md">
                Filter
            </div>
            <div className="pointer" onClick={()=>{setTagList([]);setDifficulty([])}}>
                Clear
            </div>
         </div>
          <div className="col-sm-9 jcb mb-3">
            <div> {count} Assessments </div>
            <div> <SearchBox 
            {...{
             onChange: (e) => e.length === 0 && filterAssessment(),
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
                  <Form.Check custom inline checked={tagList.some(resp=>resp === res.sid)} className="text-capitalize pointer" onChange={(e)=> onSelectTag(e,res.sid)} label={res.tagName?.toLowerCase()} type="checkbox" id={`custom-${res.tagName}`}/>
                  <div>{res.count}</div>
                </div>
                )}
             <div className="title-sm jcb my-3">
                <div>Difficulty</div>
                    <div>{ICN_ARROW_DOWN}</div>
             </div>
             {tags?.assessmentCountDifficultyToList?.map(res=>
              <div className="jcb" key={res.difficultyName}>
                <Form.Check custom inline className="text-capitalize pointer" checked={difficulty.some(resp=>resp === res.difficultyName)} onChange={(e)=> onSelectDeficulty(e,res.difficultyName)} label={res.difficultyName?.toLowerCase()} type="checkbox" id={`custom-${res.difficultyName}`}/>
                <div>{res.count}</div>
              </div>
              )}
         </div>
          <div className="col-sm-9">
            <div className="">
                <AssessmentRender {...{data:categoryAssessment,count, setPageNo:(e)=> filterAssessment(e)}}/>
            </div>
          </div>
        </div>

    </>
    )

}

export default CatalogueDetails;

