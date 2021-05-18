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
const zoomAuth = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InRHY3VUTmpkUVVTM2prVHdfZWF6OWciLCJleHAiOjE2MTY1NzM4OTMsImlhdCI6MTYxNTk2OTA3OX0.2Aqdh7qmOJvNUx3JijVb5XqMwdiZS0ggvNbJTPljtgA"

const RestService = {
  getCount: (name) => AxiosService.get(GLOBELCONSTANT.GET_COUNT.replace("{classz}", name)),
  login: (payload) => AxiosService.post(GLOBELCONSTANT.AUTH.LOGIN, {}, {}, payload),
  forgetPwd: (email) => AxiosService.post(GLOBELCONSTANT.AUTH.FORGOT + email),
  validateToken: (token) => AxiosService.post(GLOBELCONSTANT.AUTH.RESET.replace("{token}", token)),
  updatePwd: (token, sid, pwd) => AxiosService.put(GLOBELCONSTANT.AUTH.UPDATE_PWD.replace("{token}", token).replace("{appUserSid}", sid).replace("{password}", pwd,)),

  //  course
  getAllCourse: () => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE),
  CreateCourse: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_COURSE, payload),
  CreateSession: (payload) => AxiosService.post(GLOBELCONSTANT.COURSE.CREATE_SESSION, payload),
  updateSession: (payload) => AxiosService.put(GLOBELCONSTANT.COURSE.UPDATE_COURSE_SESSION, payload),
  getCourseSession: (sid) => AxiosService.get(GLOBELCONSTANT.COURSE.GET_COURSE_SESSION + sid),
  deleteCourse: (courseSid) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE + courseSid),
  editCourse: (payload) => AxiosService.put(GLOBELCONSTANT.COURSE.UPDATE_COURSE, payload),
  searchCourse: (name) => AxiosService.get(GLOBELCONSTANT.COURSE.SEARCH_COURSE + name),
  searchSession: (name) => AxiosService.get(GLOBELCONSTANT.COURSE.SEARCH_SESSION + name),
  deleteSession: (sessionId) => AxiosService.delete(GLOBELCONSTANT.COURSE.DELETE_COURSE_SESSION + sessionId),
  getCourseSessionByPage: (courseSid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.COURSE.COURSE_SESSION_PAGE.replace("{courseSid}", courseSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getCourseByPage: (pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.COURSE.COURSE_BY_PAGE.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),

  //batches
  getAllBatches: () => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST),
  getAllBatchesByPage: (pageNo, pageSize) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_LIST + pageNo + "/" + pageSize),
  getBatchesBySid: (sid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_SID.replace("{batchSid}", sid)),
  deleteBatches: (batchId) => AxiosService.delete(GLOBELCONSTANT.BATCHES.DELETE_BATCHES + batchId),
  deleteBatchesParticipant: (batchId, vASid) => AxiosService.delete(GLOBELCONSTANT.BATCHES.DELETE_BATCH_PARTICIPANT.replace("{batchSid}", batchId).replace("{vASid}", vASid)),
  editBatches: (payload) => AxiosService.put(GLOBELCONSTANT.BATCHES.EDIT_BATCHES, payload),
  searchBatches: (name) => AxiosService.get(GLOBELCONSTANT.BATCHES.SEARCH_BATCHES + name),
  getBatchParticipant: (batchSid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_BATCH_PARTICIPANT.replace("{batchSid}", batchSid)),
  validateBatches: (name) => AxiosService.get(GLOBELCONSTANT.BATCHES.BATCH_VALIDATION.replace("{batchName}", name)),
  associateParticipant: (batchSid, participant) => AxiosService.post(GLOBELCONSTANT.BATCHES.ASSOCIATE_PARTICIPANT.replace("{batchSid}", batchSid), participant),
  getBatchLearner: (sid) => AxiosService.get(GLOBELCONSTANT.BATCHES.GET_LEARNER.replace("{batchSid}", sid)),


  CreateBatch: (payload) => AxiosService.post(GLOBELCONSTANT.BATCHES.CREATE_BATCHES, payload),
  //participant
  getAllParticipant: (sid) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT),
  getAllUser: (type) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS + type),
  getUserDetails: (vSId) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_PARTICIPANT_ID.replace("{VASid}", vSId)),

  getAllUserByPage: (type, pageNo, pageSize) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.ALL_USERS + `${type}/${pageNo}/${pageSize}`),
  searchUser: (str) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.SEARCH_USER.replace("{str}", str)),
  UploadParticipant: (payload, header) => AxiosService.uploadMultiPart(GLOBELCONSTANT.PARTICIPANT.UPLOAD_PARTICIPANT, payload, header),
  createParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.CREATE_PARTICIPANT, payload),
  updateParticipant: (payload) => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.UPDATE_PARTICIPANT, payload),
  generatePwd: () => AxiosService.post(GLOBELCONSTANT.PARTICIPANT.GENERATE_PWD),
  getUserCount: (type) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.GET_USER_COUNT.replace("{type}", type)),
  validateEmail: (email) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.EMAIL_VALIDATION.replace("{email}", email)),
  changeUserRole: (role, vSid) => AxiosService.get(GLOBELCONSTANT.PARTICIPANT.UPDATE_ROLE.replace("{role}", role).replace("{virtualAccountSid}", vSid)),
  changeAndDeleteStatus: (status, vSid) => AxiosService.put(GLOBELCONSTANT.PARTICIPANT.STATUS_DELETE.replace("{status}", status).replace("{vASid}", vSid)),
  changeDepartmentRole: (role, departmentVASid) => AxiosService.put(GLOBELCONSTANT.PARTICIPANT.UPDATE_DEPARTMENT_ROLE.replace("{role}", role).replace("{departmentVASid}", departmentVASid)),

  // training
  getAllTrainingByPage: (type, pageNo, pageSize) => AxiosService
    .get(type === "SUPERVISOR" ? GLOBELCONSTANT.TRAINING.GET_TRAINING + "/" + pageNo + "/" + pageSize :
      (type === "INSTRUCTOR" ? GLOBELCONSTANT.TRAINING.GET_INSTRUCTOR_TRAINING.replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)
        : GLOBELCONSTANT.TRAINING.GET_LEARNER_TRAINING)),

  getTrainingSession: (trainingSid, courseSid) => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SESSION.replace("{trainingSid}", trainingSid).replace("{courseSid}", courseSid)),
  createTraining: (payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_TRAINING, payload),
  editTraining: (payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.EDIT_TRAINING, payload),
  editTrainingSession: (payload, meetingSid = "") => AxiosService.post(GLOBELCONSTANT.TRAINING.UPDATE_TRAINING_SESSION + "/" + meetingSid, payload),
  CreateTrainingSession: (payload) => AxiosService.post(GLOBELCONSTANT.TRAINING.CREATE_SESSION, payload),
  searchTraining: (name) => AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINER + name),
  deleteTraining: (trainingId) => AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAINER + trainingId),
  getTrainingBySid: (trainingSid) => AxiosService.get(GLOBELCONSTANT.TRAINING.GET_TRAINING_SID.replace("{trainingSid}", trainingSid)),
  deleteTrainingSession: (trainingId) => AxiosService.delete(GLOBELCONSTANT.TRAINING.DELETE_TRAIN_SESSION.replace("{trainingSesssionSid}", trainingId)),
  searchTrainingSession: (trainingSid, name) => AxiosService.get(GLOBELCONSTANT.TRAINING.SEARCH_TRAINING_SESSION.replace("{trainingSid}", trainingSid).replace("{name}", name)),
  unScheduleSession: (sessionSid, status, meetingSid) => AxiosService.post(GLOBELCONSTANT.TRAINING.UNSCHEDULE_SESSION.replace("{sessionSid}", sessionSid).replace("{status}", status).replace("{meetingId}", meetingSid)),
  zoomParticipant: () => AxiosService.get('https://api.zoom.us/v2/users/kumarkanhiya21@gmail.com/meetings?page_size=30&type=live', zoomAuth),
  // getTrainingByRole: (pageNo,pageSize) => AxiosService.get(GLOBELCONSTANT.TRAINING.PARTICIPANT_BY_ROLE.replace("{pageNo}",pageNo).replace("{pageSize}",pageSize)),

  // assessment
  getAllTopic: (pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_TOPIC + pageSize + "&pageNo=" + pageNo),
  deleteTopic: (sid) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_TOPIC.replace("{topicSid}", sid)),
  updateTopic: (payload) => AxiosService.put(GLOBELCONSTANT.ASSESSMENT.UPDATE_TOPIC, payload),
  getAllQuestion: (pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ALL_QUESTION + pageSize + "&pageNo=" + pageNo),
  createQuestion: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.CREATE_QUESTION, payload),
  GetQuestionType: () => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_QUESTION_TYPE),
  createTopic: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.CREATE_TOPIC, payload),
  getAssessmentByTopic: (assID, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT.replace("{assId}", assID).replace("{pageSize}", pageSize).replace("{pageNo}", pageNo)),
  deleteAssessment: (sid) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_ASSESSMENT.replace("{assId}", sid)),
  deleteAssociateQuestion: (qId, aId) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_ASS_QUESTION.replace("{qsid}", qId).replace("{asid}", aId)),
  deleteQuestion: (sid) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT.DELETE_QUESTION.replace("{questionId}", sid)),
  associateQuestion: (assID, payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.ASSOCIATE_QUESTION.replace("{assID}", assID), payload),
  getNotAssociateQuestion: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_NOT_ASS_QUESTION.replace("{assId}", assId)),
  getAssociateQuestion: (assID, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSOCIATE_QUESTION.replace("{assId}", assID).replace("{pageSize}", pageSize).replace("{pageNo}", pageNo)),
  getAllCategory: () => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_CATEGORY),
  createAssessment: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.CREATE_ASSESSMENT, payload),
  updateAssessment: (payload) => AxiosService.put(GLOBELCONSTANT.ASSESSMENT.UPDATE_ASSESSMENT, payload),
  searchTopic: (query, companySid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.SEARCH_TOPIC + query + "/" + companySid),
  searchAssessment: (query, companySid, topicSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.SEARCH_ASSESSMENT.replace("{query}", query).replace("{companySid}", companySid).replace("{topicSid}", topicSid)),
  searchQuestion: (query, companySid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.SEARCH_QUESTION.replace("{query}", query).replace("{companySid}", companySid).replace("{pageSize}", pageSize).replace("{pageNo}", pageNo)),
  generateUrl: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GENERATE_URL.replace("{assId}", assId)),
  uploadAssParticipant: (payload, headers) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.UPLOAD_ASSESSMENT, payload, '', headers),
  uploadQuestion: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT.UPLOAD_QUESTION, payload),
  getAssessmentDashboard: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT_DASHBOARD.replace("{aasId}", assId)),
  getAssUser: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT_DASHBOARD.replace("{aasId}", assId)),
  getAssestUser: (assId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_ASSESSMENT_USER.replace("{assID}", assId)),
  getQuestionById: (qId) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT.GET_QUESTION_BY_SID.replace("{qId}", qId)),
  changeQuestionStatus: (qId, status) => AxiosService.put(GLOBELCONSTANT.ASSESSMENT.CHANGE_QUESTION_STATUS.replace("{qId}", qId).replace("{status}", status)),

  // assessment dashboard
  getTopUser: (cSid, caSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_TOP_USER.replace("{cSid}", cSid).replace("{caSid}", caSid)),
  getDashboardData: (vSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.DASHBOARD_DATA.replace("{sid}", vSid)),
  getAvgCategory: (vSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ALL_CATEGORY_SCORE.replace("{sid}", vSid)),
  getAssessmentByCategory: (cSid, caSid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ASSESSMENT_BY_CATEGORY.replace("{cSid}", cSid).replace("{caSid}", caSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getTagCount: (cSid, caSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_TAGS_COUNT.replace("{cSid}", cSid).replace("{caSid}", caSid)),
  searchCategoryAssessment: (value,cSid, caSid, pageSize, pageNo) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.SEARCH_CATEGORY_ASSESSMENT.replace("{value}",value).replace("{cSid}", cSid).replace("{caSid}", caSid).replace("{pageNo}", pageNo).replace("{pageSize}", pageSize)),
  getCategoryAssessmentCount: (cSid, caSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ASSESSMENT_COUNT.replace("{cSid}", cSid).replace("{caSid}", caSid)),
  getAllTimeLeaderboard: (cSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.ALL_TIME_LEADERBOARD.replace('{cSid}', cSid)),
  getTodayLeaderbord: (cSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_TODAY_LEADERBOADE.replace('{cSid}', cSid)),
  getMyAssessment: (status, sid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_MY_ASSESSMENT.replace('{status}', status).replace("{sid}", sid)),
  createBookmark: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.CREATE_BOOKMARK, payload),
  getBookmark: (vSid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_BOOKMARK.replace("{vSid}", vSid)),
  removeBookmark: (payload) => AxiosService.delete(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.REMOVE_BOOKMARK, payload),
  filterAssessment: (pageNo,pageSize,payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_ASSESSMENT_FILTER.replace("{pageNo}",pageNo).replace("{pageSize}",pageSize),payload),
  filterCount: (payload) => AxiosService.post(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.FILTER_COUNT,payload),
  getMyAssessmentCount: (sid) => AxiosService.get(GLOBELCONSTANT.ASSESSMENT_DASHBOARD.GET_MYASSESSMENT_COUNT.replace('{sid}',sid)),


  // assessment 
  getAssessmentInstruction: (payload) => AxiosService.post(GLOBELCONSTANT.API.ASSESSMENT.GET_INSTRUCTION, payload),
  getQuestionAnswer: (assessmentSid, virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.GET_QUESTIONS.replace("{assessmentSid}", assessmentSid).replace("{virtualAccountSid}", virtualAccountSid)),
  submitAnswer: (payload) => AxiosService.post(GLOBELCONSTANT.API.ASSESSMENT.SUBMIT_ANSWER, payload),
  reviewAssessmentResponse: (virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.REVIEW_RESPONSE.replace("{virtualAccountSid}", virtualAccountSid)),
  submitAssessment: (payload) => AxiosService.post(GLOBELCONSTANT.API.ASSESSMENT.SUBMIT_ASSESSMENT, payload),
  getAssessmentScore: (assessmentSid, virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.GET_SCORE.replace("{assessmentSid}", assessmentSid).replace("{virtualAccountSid}", virtualAccountSid)),
  getSubmittedResponse: (virtualAccountSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.SUBMIT_RESPONSE.replace("{virtualAccountSid}", virtualAccountSid)),
  getTopics: () => AxiosService.get(GLOBELCONSTANT.API.GET_TOPIC),
  createAssessmentUser: (payload, header) => AxiosService.post(GLOBELCONSTANT.API.CREATE_ASS_USER, payload, "", header),
  getAssessmentBySid: (assSid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.GET_ASSESSMENT_BY_SID + assSid),
  getTodayLeaders: (sid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.TODAY_LEADER + sid),
  getAllTimeLeaders: (sid) => AxiosService.get(GLOBELCONSTANT.API.ASSESSMENT.ALL_TIME_LEADER + sid),
  updateQuestion: (payload) => AxiosService.put(GLOBELCONSTANT.API.ASSESSMENT.UPDATE_QUESTION, payload),
  getAssUserByVirtualAccountSid: (sid) => AxiosService.get(GLOBELCONSTANT.API.GET_ASSES_USER + sid),
};

export default RestService;
