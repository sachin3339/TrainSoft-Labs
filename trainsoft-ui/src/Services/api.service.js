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

const RestService = {
  //  course
  getAllCourse: () => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE),
  CreateCourse: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_COURSE, payload),
  CreateSession: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_SESSION, payload),
  getCourseSession : (sid) => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE_SESSION + sid),
  //batches
  getAllBatches: () => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST),
  CreateBatch: (payload) => AxiosService.post(GLOBELCONSTANT.BATCHES.CREATE_BATCHES, payload),
  //participant
  getAllParticipant: () => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT),
  UploadParticipant: (payload) => AxiosService.uploadMultiPart(GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT, payload),
  // training
  createTraining: (payload)=> AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_TRAINING,payload),
  createSession: (payload)=> AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_SESSION,payload)

  
};

export default RestService;
