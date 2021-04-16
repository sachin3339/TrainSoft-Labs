
let HOSTNAME = window.location.origin; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1) || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    // HOSTNAME = "https://www.eservecloud.com"; 
    HOSTNAME = "http://52.66.232.107:8089"; // Local development sever will be used from now onwards.
export const API_PATH = HOSTNAME ;

let API_HOST = HOSTNAME +"/insled/v1/"

const GLOBELCONSTANT = {
        BASE_URL: API_HOST,
        GET_COUNT: API_HOST + "get/{classz}",
        ZOOM_PATH:  window.location.origin + '/zoom',
        VSCODE_PATH:  window.location.origin + '/vscode',

        AUTH: {
            LOGIN: API_HOST + "login",
            FORGOT: API_HOST + "forgot/password/",
            RESET: API_HOST + "reset/{token}",
            UPDATE_PWD: API_HOST + "update/password/token/{token}/user/{appUserSid}/pass/{password}",

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
            SEARCH_BATCHES: API_HOST + "batches/",
            BATCH_VALIDATION: API_HOST + "validate/batch/{batchName}",
            DELETE_BATCH_PARTICIPANT: API_HOST + "delete/batchparticipant/{batchSid}/{vASid}",
            ASSOCIATE_PARTICIPANT: API_HOST + "add/participants/batch/{batchSid}",
            GET_LEARNER: API_HOST + "batch/accounts/{batchSid}"
        },
        PARTICIPANT: {
            GET_PARTICIPANT_ID: API_HOST + "virtualaccount/{VASid}",
            GET_PARTICIPANT: API_HOST +  "list/participant",
            UPLOAD_PARTICIPANT: API_HOST +  "upload/list/participants",
            UPLOAD_USER_PARTICIPANT: API_HOST +  "upload/participants",
            CREATE_PARTICIPANT: API_HOST +  "user/create",
            ALL_USERS: API_HOST +  "vaccounts/",
            GENERATE_PWD: API_HOST +  "generate/password",
            SEARCH_USER: API_HOST + "user/{str}",
            STATUS_DELETE: API_HOST + "update/status/{status}/virtualAccount/{vASid}",
            UPDATE_ROLE: API_HOST + 'update/v/role/{role}/{virtualAccountSid}',
            UPDATE_PARTICIPANT: API_HOST + 'update/user',
            UPDATE_DEPARTMENT_ROLE: API_HOST + 'update/department/role/{role}/{departmentVASid}',
            GET_USER_COUNT: API_HOST + 'get/user/count/{type}',
            EMAIL_VALIDATION: API_HOST + "validate/email/{email}"
        },  
        TRAINING: {
            GET_TRAINING: API_HOST +  "trainings",
            CREATE_TRAINING: API_HOST +  "training/create",
            GET_TRAINING_SID:API_HOST +  "training/{trainingSid}",
            GET_TRAINING_SESSION: API_HOST +  "trainingsession/training/{trainingSid}/course/{courseSid}",
            CREATE_SESSION: API_HOST +  "trainingSession/create",
            SEARCH_TRAINER: API_HOST + "trainings/",
            DELETE_TRAINER: API_HOST + "delete/training/",
            DELETE_TRAIN_SESSION: API_HOST + "delete/trainingsession/{trainingSesssionSid}",
            EDIT_TRAINING: API_HOST + "training/update",
            UPDATE_TRAINING_SESSION: API_HOST + "update/trainingsession",
            SEARCH_TRAINING_SESSION: API_HOST + "trainingsessions/training/{trainingSid}/session/{name}",
            UPLOAD_ASSETS: API_HOST + "upload",
            UNSCHEDULE_SESSION: API_HOST + "update/session/{sessionSid}/{status}",
            GET_INSTRUCTOR_TRAINING: API_HOST +  "trainer/trainings/{pageNo}/{pageSize}",
            GET_LEARNER_TRAINING: API_HOST +  "learner/trainings"


        },
        INSTRUCTOR: {
            GET_INSTRUCTOR: API_HOST +  'depatments'
        },
        ACCESS_LEVEL: [
            {key: "ALL",name: "All"},
            {key: "BATCH_MGMT",name: "Batch Management"},
            {key: "COURSE_MGMT",name: "Course Management"},
            {key: "USER_MGMT",name: "User Management"},
            {key: "INSTRUCTOR_MGMT",name: "Instructor Management"},
            {key: "TRAINING_MGMT",name: "Training Management"},
        ],
        DEPARTMENT_ROLE: [
            {key: "LEARNER",name: "Learner"},
            {key: "INSTRUCTOR",name: "Instructor"},
            {key: "SUPERVISOR",name: "Supervisor"},
        ],
        ROLE:{
            SUPERVISOR:"SUPERVISOR",
            INSTRUCTOR:"INSTRUCTOR",
            LEARNER:"LEARNER",
        },
        SAMPLE_TEMPLATE: "https://sessionassests.s3.ap-south-1.amazonaws.com/User_Upload_template.xlsx",
        QUILL: {
                toolbar: [
                    [{ font: [] }, { 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ align: [] }], // 'direction'
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    // [{ script: 'super' }, { script: 'sub' }], // superscript/subscript
                    ['code-block', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // outdent/indent
                    ['link', 'image'], // embeds
                    ['emoji'],
                    // ['clean'] // remove formatting button
                ],
        },
    }

export default GLOBELCONSTANT;