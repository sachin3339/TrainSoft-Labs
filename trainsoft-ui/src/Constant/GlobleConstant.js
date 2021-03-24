
let HOSTNAME = window.location.origin; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1) || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    // HOSTNAME = "https://www.eservecloud.com"; 
    HOSTNAME = "http://52.66.232.107:8089"; // Local development sever will be used from now onwards.
export const API_PATH = HOSTNAME ;

let API_HOST = HOSTNAME +"/insled/v1/"

const GLOBELCONSTANT = {
        BASE_URL: API_HOST,
        GET_COUNT: API_HOST + "get/{classz}",
        AUTH: {
            LOGIN: API_HOST + "login",
        },
        COURSE: {
            GET_COURSE: API_HOST + "courses",
            CREATE_COURSE: API_HOST + "course/create",
            DELETE_COURSE:  API_HOST + 'delete/course/',
            UPDATE_COURSE: API_HOST + 'update/course',
            SEARCH_COURSE: API_HOST + 'courses/',
            GET_COURSE_SID :  API_HOST +  'course/',
            CREATE_SESSION : API_HOST +  'create/coursesession',
            GET_COURSE_SESSION:  API_HOST + 'coursesession/course/',
            UPDATE_COURSE_SESSION:  API_HOST + "update/coursesession",
            DELETE_COURSE_SESSION:  API_HOST + "delete/coursesession/",
            SEARCH_SESSION:  API_HOST + "coursesessions/",
            COURSE_SESSION_PAGE: API_HOST + "coursesession/course/{courseSid}/{pageNo}/{pageSize}",
            COURSE_BY_PAGE:  API_HOST + "course/{pageNo}/{pageSize}",

        },  
        BATCHES: {
            GET_BATCH_SID: API_HOST +  'batch/{batchSid}',
            GET_BATCH_LIST: API_HOST +  'batches/',
            CREATE_BATCHES: API_HOST +  'batch/create',
            GET_BATCH_PARTICIPANT: API_HOST +  'participants/batch/{batchSid}',
            DELETE_BATCHES: API_HOST +  'delete/batch/',
            EDIT_BATCHES: API_HOST +  'update/batch',
            SEARCH_BATCHES: API_HOST + "batches/"
        },
        PARTICIPANT: {
            GET_PARTICIPANT: API_HOST +  "list/participant",
            UPLOAD_PARTICIPANT: API_HOST +  "upload/list/participants",
            CREATE_PARTICIPANT: API_HOST +  "user/create",
            ALL_USERS: API_HOST +  "vaccounts/",
            GENERATE_PWD: API_HOST +  "generate/password",
            SEARCH_USER: API_HOST + "user/{str}",
            STATUS_DELETE: API_HOST + "update/status/{status}/virtualAccount/{vASid}"

        },  
        TRAINING: {
            GET_TRAINING: API_HOST +  "trainings",
            CREATE_TRAINING: API_HOST +  "training/create",
            GET_TRAINING_SID:API_HOST +  "training/{trainingSid}",
            GET_TRAINING_SESSION: API_HOST +  "trainingsession/training/{trainingSid}/course/{courseSid}",
            CREATE_SESSION: API_HOST +  "trainingSession/create",
            SEARCH_TRAINER: API_HOST + "trainings/",
            DELETE_TRAINER: API_HOST + "delete/training/",
            DELETE_TRAIN_SESSION: API_HOST + "delete/trainingsession/{trainingSesssionSid}"
        },
        INSTRUCTOR: {
            GET_INSTRUCTOR: API_HOST +  'depatments'
        },
        ACCESS_LEVEL: [
            {key: "ALL",name: "All"},
            {key: "BATCH_MGMT",name: "Batch Mgmt"},
            {key: "COURSE_MGMT",name: "Course Mgmt"},
            {key: "USER_MGMT",name: "User Mgmt"},
            {key: "INSTRUCTOR_MGMT",name: "Instructor Mgmt"},
            {key: "TRAINING_MGMT",name: "Training Mgmt"},
        ],
        DEPARTMENT_ROLE: [
            {key: "LEARNER",name: "Learner"},
            {key: "INSTRUCTOR",name: "Instructor"},
        ]
    }
export default GLOBELCONSTANT;