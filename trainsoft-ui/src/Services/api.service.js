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
const  zoomAuth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InRHY3VUTmpkUVVTM2prVHdfZWF6OWciLCJleHAiOjE2MTY1NzM4OTMsImlhdCI6MTYxNTk2OTA3OX0.2Aqdh7qmOJvNUx3JijVb5XqMwdiZS0ggvNbJTPljtgA"

const RestService = {
  getCount:(name)=> AxiosService.get(GLOBELCONSTANT.GET_COUNT.replace("{classz}",name)),
  login:(payload)=> AxiosService.post(GLOBELCONSTANT.AUTH.LOGIN,{},{},payload),

  //  course
  getAllCourse: () => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE),
  CreateCourse: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_COURSE, payload),
  CreateSession: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_SESSION, payload),
  updateSession: (payload) => AxiosService.put(GLOBELCONSTANT.COURSE.UPDATE_COURSE_SESSION, payload),
  getCourseSession : (sid) => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE_SESSION + sid),
  deleteCourse : (courseSid) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE + courseSid),
  editCourse : (payload) => AxiosService.put(GLOBELCONSTANT.COURSE.UPDATE_COURSE,payload),
  searchCourse : (name) => AxiosService.get(GLOBELCONSTANT.COURSE.SEARCH_COURSE + name),
  searchSession : (name) => AxiosService.get(GLOBELCONSTANT.COURSE.SEARCH_SESSION + name),
  deleteSession : (sessionId) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE_SESSION + sessionId),
  getCourseSessionByPage: (courseSid,pageSize,pageNo) => AxiosService.get(GLOBELCONSTANT.COURSE.COURSE_SESSION_PAGE.replace("{courseSid}", courseSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getCourseByPage: (pageSize,pageNo) => AxiosService.get(GLOBELCONSTANT.COURSE.COURSE_BY_PAGE.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),

  //batches
  getAllBatches: () => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST),
  getAllBatchesByPage: (pageNo,pageSize) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST + pageNo + "/" + pageSize),
  getBatchesBySid: (sid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_SID.replace("{batchSid}",sid)),
  deleteBatches: (batchId) => AxiosService.delete(GLOBELCONSTANT.BATCHES.DELETE_BATCHES + batchId),
  editBatches: (payload) => AxiosService.put(GLOBELCONSTANT.BATCHES.EDIT_BATCHES, payload),
  searchBatches : (name) => AxiosService.get(GLOBELCONSTANT.BATCHES.SEARCH_BATCHES + name),


  CreateBatch: (payload) => AxiosService.post(GLOBELCONSTANT.BATCHES.CREATE_BATCHES, payload),
  //participant
  getAllParticipant: (sid) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT),
  getAllUser: () => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS),
  searchUser: (str) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.SEARCH_USER.replace("{str}",str)),
  UploadParticipant: (payload,header) => AxiosService.uploadMultiPart(GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT, payload, header),
  createParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.CREATE_PARTICIPANT,payload),
  generatePwd: () => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.GENERATE_PWD),


  // training
  getAllTrainingByPage: (pageNo,pageSize)=> AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING + "/" + pageNo + "/" + pageSize),
  getTrainingSession: (trainingSid,courseSid)=> AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SESSION.replace("{trainingSid}",trainingSid).replace("{courseSid}",courseSid)),
  createTraining: (payload)=> AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_TRAINING,payload),
  CreateTrainingSession: (payload)=> AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_SESSION,payload),
  searchTraining : (name) => AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINER + name),
  deleteTraining: (trainingId)=> AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAINER + trainingId),
  deleteTrainingSession: (trainingId)=> AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAIN_SESSION.replace("{trainingSesssionSid}",trainingId) ),


  zoomParticipant: ()=> AxiosService.get('https://api.zoom.us/v2/users/kumarkanhiya21@gmail.com/meetings?page_size=30&type=live',zoomAuth)


  // instructor


  
};

export default RestService;
