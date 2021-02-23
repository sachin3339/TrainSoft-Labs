/* Note : Calling Api Standard
* E.g : getListing Axios call accept params in following seq
* Url : service url
  payload : post data
  param : url parameter
  config : if config object
  config = {
    loader : '#container'  //loader will show for the div having id = 'container'
  }
  if any api fails or empty response comes then related messge will be shown

  Ex:
  getListing(payload,config) {
    var params ={
      viewType :'detail'
    };
    return AxiosService.post('/api/listing', payload,params,config);
  },

*
*/
import GLOBELCONSTANT from "../Constant/GlobleConstant.js";
import AxiosService from "./axios.service.js";

const RestService =  {
  //  course
    getAllCourse: () => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE),
    CreateCourse: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_COURSE,payload)
};

export default RestService;
