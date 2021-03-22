
let HOSTNAME = window.location.origin; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1) || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    // HOSTNAME = "https://www.eservecloud.com"; 
    HOSTNAME = "http://ec2-65-1-14-123.ap-south-1.compute.amazonaws.com:8089/insled/"; // Local development sever will be used from now onwards.
export const API_PATH = HOSTNAME;

const GLOBELCONSTANT = {
        BASE_URL: HOSTNAME,
        COURSE: {
            GET_COURSE: API_PATH + "v1/courses",
            CREATE_COURSE: API_PATH + "v1/course/create",
            DELETE_COURSE:  API_PATH + 'v1/delete/course/',
            UPDATE_COURSE: API_PATH + 'v1/update/course',
            SEARCH_COURSE: API_PATH + 'v1/courses/',
            GET_COURSE_SID :  API_PATH +  'v1/course/',
            CREATE_SESSION : API_PATH +  'v1/create/coursesession',
            GET_COURSE_SESSION:  API_PATH + '/v1/coursesession/course/',
            UPDATE_COURSE_SESSION:  API_PATH + "/v1/update/coursesession",
            DELETE_COURSE_SESSION:  API_PATH + "/v1/delete/coursesession/",
            SEARCH_SESSION:  API_PATH + "v1/coursesessions/",
            COURSE_SESSION_PAGE: API_PATH + "v1/coursesession/course/{courseSid}/{pageNo}/{pageSize}"

        },  
        BATCHES: {
            GET_BATCH_SID: API_PATH +  'v1/batch/{batchSid}',
            GET_BATCH_LIST: API_PATH +  'v1/batches/',
            CREATE_BATCHES: API_PATH +  'v1/batch/create',
            GET_BATCH_PARTICIPANT: API_PATH +  '/v1/participants/batch/',
            DELETE_BATCHES: API_PATH +  'v1/delete/batch/',
            EDIT_BATCHES: API_PATH +  'v1/update/batch',
            SEARCH_BATCHES: API_PATH + "v1/batches/"
        },
        PARTICIPANT: {
            GET_PARTICIPANT: API_PATH +  "v1/list/participant",
            UPLOAD_PARTICIPANT: API_PATH +  "v1/upload/list/participants",
            CREATE_PARTICIPANT: API_PATH +  "v1/user/create",
            ALL_USERS: API_PATH +  "v1/vaccounts/company/",
            GENERATE_PWD: API_PATH +  "v1/generate/password"

        },  
        TRAINING: {
            GET_TRAINING: API_PATH +  "v1/trainings",
            CREATE_TRAINING: API_PATH +  "v1/training/create",
            GET_TRAINING_SESSION: API_PATH +  "v1/trainingsession/training/{trainingSid}/course/{courseSid}",
            CREATE_SESSION: API_PATH +  "v1/trainingSession/create",
            SEARCH_TRAINER: API_PATH + "v1/trainings/",
            DELETE_TRAINER: API_PATH + "v1/delete/training/",
            DELETE_TRAIN_SESSION: API_PATH + "v1/delete/trainingsession/{trainingSesssionSid}"
        },
        INSTRUCTOR: {
            GET_INSTRUCTOR: API_PATH +  'v1/depatments'
        },
        ACCESS_LEVEL: [
            {key: "BATCH_MGMT",name: "Batch Mgmt"},
            {key: "COURSE_MGMT",name: "Batch Mgmt"},
            {key: "USER_MGMT",name: "User Mgmt"},
            {key: "INSTRUCTOR_MGMT",name: "Instructor Mgmt"},
            {key: "TRAINING_MGMT",name: "Training Mgmt"},

        ]
    }
export default GLOBELCONSTANT;