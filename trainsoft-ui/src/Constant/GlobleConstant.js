
let HOSTNAME = window.location.origin; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1) || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    // HOSTNAME = "https://www.eservecloud.com"; 
    HOSTNAME = "http://ec2-65-1-14-123.ap-south-1.compute.amazonaws.com:8089/insled/"; // Local development sever will be used from now onwards.
export const API_PATH = HOSTNAME;

const GLOBELCONSTANT = {
        BASE_URL: HOSTNAME,
        COURSE: {
            GET_COURSE: "v1/courses",
            CREATE_COURSE: "v1/course/create",
            GET_COURSE_SID : 'v1/course/',
            CREATE_SESSION : 'v1/create/coursesession',
            GET_COURSE_SESSION: '/v1/coursesession/course/',
        },  
        BATCHES: {
            GET_BATCH_SID: 'v1/batch/{batchSid}',
            GET_BATCH_LIST: 'v1/batches',
            CREATE_BATCHES: 'v1/batch/create'
        },
        PARTICIPANT: {
            GET_PARTICIPANT: "v1/list/participant",
            UPLOAD_PARTICIPANT: "v1/upload/list/participants"
        }  
    }
export default GLOBELCONSTANT;