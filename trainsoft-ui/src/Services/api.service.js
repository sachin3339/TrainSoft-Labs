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
  forgetPwd:(email)=> AxiosService.post(GLOBELCONSTANT.AUTH.FORGOT + email),
  validateToken:(token)=> AxiosService.post(GLOBELCONSTANT.AUTH.RESET.replace("{token}",token)),
  updatePwd:(token,sid,pwd)=> AxiosService.put(GLOBELCONSTANT.AUTH.UPDATE_PWD.replace("{token}",token).replace("{appUserSid}",sid).replace("{password}",pwd,)),

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
  deleteBatchesParticipant: (batchId,vASid) => AxiosService.delete(GLOBELCONSTANT.BATCHES.DELETE_BATCH_PARTICIPANT.replace("{batchSid}",batchId).replace("{vASid}",vASid)),
  editBatches: (payload) => AxiosService.put(GLOBELCONSTANT.BATCHES.EDIT_BATCHES, payload),
  searchBatches : (name) => AxiosService.get(GLOBELCONSTANT.BATCHES.SEARCH_BATCHES + name),
  getBatchParticipant: (batchSid)=> AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_PARTICIPANT.replace("{batchSid}",batchSid)),
  validateBatches: (name)=> AxiosService.get(GLOBELCONSTANT.BATCHES.BATCH_VALIDATION.replace("{batchName}",name)),
  associateParticipant: (batchSid,participant) => AxiosService.post(GLOBELCONSTANT.BATCHES.ASSOCIATE_PARTICIPANT.replace("{batchSid}",batchSid), participant),
  getBatchLearner: (sid)=> AxiosService.get(GLOBELCONSTANT.BATCHES.GET_LEARNER.replace("{batchSid}",sid)),


  CreateBatch: (payload) => AxiosService.post(GLOBELCONSTANT.BATCHES.CREATE_BATCHES, payload),
  //participant
  getAllParticipant: (sid) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT),
  getAllUser: (type) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS + type),
  getUserDetails: (vSId) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT_ID.replace("{VASid}",vSId)),

  getAllUserByPage: (type,pageNo,pageSize) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS +`${type}/${pageNo}/${pageSize}`),
  searchUser: (str) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.SEARCH_USER.replace("{str}",str)),
  UploadParticipant: (payload,header) => AxiosService.uploadMultiPart(GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT, payload, header),
  createParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.CREATE_PARTICIPANT,payload),
  updateParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.UPDATE_PARTICIPANT,payload),
  generatePwd: () => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.GENERATE_PWD),
  getUserCount: (type)=> AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_USER_COUNT.replace("{type}",type)),
  validateEmail: (email)=> AxiosService.get(GLOBELCONSTANT.PARTICIPANT.EMAIL_VALIDATION.replace("{email}",email)),
  changeUserRole: (role,vSid)=> AxiosService.get(GLOBELCONSTANT.PARTICIPANT.UPDATE_ROLE.replace("{role}",role).replace("{virtualAccountSid}",vSid)),
  changeAndDeleteStatus: (status,vSid)=> AxiosService.put(GLOBELCONSTANT.PARTICIPANT.STATUS_DELETE.replace("{status}",status).replace("{vASid}",vSid)),
  changeDepartmentRole: (role,departmentVASid)=> AxiosService.put(GLOBELCONSTANT.PARTICIPANT.UPDATE_DEPARTMENT_ROLE.replace("{role}",role).replace("{departmentVASid}",departmentVASid)),

  // training
  getAllTrainingByPage: (type,pageNo,pageSize)=> AxiosService
  .get(type === "SUPERVISOR" ? GLOBELCONSTANT.TRAINING.GET_TRAINING + "/" + pageNo + "/" + pageSize :
  (type ===  "INSTRUCTOR" ? GLOBELCONSTANT.TRAINING.GET_INSTRUCTOR_TRAINING.replace("{pageNo}",pageNo).replace("{pageSize}",pageSize) 
  : GLOBELCONSTANT.TRAINING.GET_LEARNER_TRAINING)),
  
  getTrainingSession: (trainingSid,courseSid)=> AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SESSION.replace("{trainingSid}",trainingSid).replace("{courseSid}",courseSid)),
  createTraining: (payload)=> AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_TRAINING,payload),
  editTraining: (payload)=> AxiosService.post(GLOBELCONSTANT.TRAINING.EDIT_TRAINING,payload),
  editTrainingSession: (payload,meetingSid ="")=> AxiosService.post(GLOBELCONSTANT.TRAINING.UPDATE_TRAINING_SESSION + "/"+ meetingSid,payload),
  CreateTrainingSession: (payload,virtualAccountSid)=> AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_SESSION.replace("{virtualAccountSid}",virtualAccountSid),payload),
  searchTraining : (name) => AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINER + name),
  deleteTraining: (trainingId)=> AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAINER + trainingId),
  getTrainingBySid: (trainingSid)=> AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SID.replace("{trainingSid}",trainingSid)),
  deleteTrainingSession: (trainingId)=> AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAIN_SESSION.replace("{trainingSesssionSid}",trainingId) ),
  searchTrainingSession:(trainingSid,name)=> AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINING_SESSION.replace("{trainingSid}",trainingSid).replace("{name}",name)),
  unScheduleSession:  (sessionSid,status,meetingSid)=> AxiosService.post(GLOBELCONSTANT.TRAINING.UNSCHEDULE_SESSION.replace("{sessionSid}",sessionSid).replace("{status}",status).replace("{meetingId}",meetingSid)),
  zoomParticipant: ()=> AxiosService.get('https://api.zoom.us/v2/users/kumarkanhiya21@gmail.com/meetings?page_size=30&type=live',zoomAuth),
  // getTrainingByRole: (pageNo,pageSize) => AxiosService.get(GLOBELCONSTANT.TRAINING.PARTICIPANT_BY_ROLE.replace("{pageNo}",pageNo).replace("{pageSize}",pageSize)),


  // instructor


  
};

export default RestService;
