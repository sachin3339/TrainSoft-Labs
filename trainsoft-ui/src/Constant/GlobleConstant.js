
let HOSTNAME = window.location.origin; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1) || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    // HOSTNAME = "https://www.eservecloud.com"; 
    HOSTNAME = "http://ec2-65-1-14-123.ap-south-1.compute.amazonaws.com:8089/insled/"; // Local development sever will be used from now onwards.
export const API_PATH = HOSTNAME;

const GLOBELCONSTANT = {
        BASE_URL: HOSTNAME,
        COURSE: {
            GET_COURSE: BASE_URL + "v1/courses",
            CREATE_COURSE: BASE_URL + "v1/course/create",
            GET_COURSE_SID :  BASE_URL +  'v1/course/',
            CREATE_SESSION : BASE_URL +  'v1/create/coursesession',
            GET_COURSE_SESSION:  BASE_URL + '/v1/coursesession/course/',
        },  
        BATCHES: {
            GET_BATCH_SID: BASE_URL +  'v1/batch/{batchSid}',
            GET_BATCH_LIST: BASE_URL +  'v1/batches',
            CREATE_BATCHES: BASE_URL +  'v1/batch/create',
            GET_BATCH_PARTICIPANT: BASE_URL +  '/v1/participants/batch/'
        },
        PARTICIPANT: {
            GET_PARTICIPANT: BASE_URL +  "v1/list/participant",
            UPLOAD_PARTICIPANT: BASE_URL +  "v1/upload/list/participants",
            CREATE_PARTICIPANT: BASE_URL +  "/v1/user/create",
            ALL_USERS: BASE_URL +  "/v1/vaccounts/company/",
            GENERATE_PWD: BASE_URL +  "/v1/generate/password"

        },  
        TRAINING: {
            GET_TRAINING: BASE_URL +  "v1/trainings",
            CREATE_TRAINING: BASE_URL +  "v1/training/create",
            GET_TRAINING_SESSION: BASE_URL +  "/v1/trainingsession/training/",
            CREATE_SESSION: BASE_URL +  "/v1/trainingSession/create"
        },
        INSTRUCTOR: {
            GET_INSTRUCTOR: BASE_URL +  '/v1/depatments'
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