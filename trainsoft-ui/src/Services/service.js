import RestService from "./api.service";


// get batches by sid
export const getPaginationCount = async (name,setCount) => {
    try {
        RestService.getCount(name).then(
            response => {
                setCount(response.data) 
            },
            err => { console.error(err) }
        )
    } catch (err) {
        console.error("error occur on getPaginationCount()", err)
    }
    
};

// get all course
export const getAllCourse = async (setCourse) => {
    try {
        RestService.getAllCourse().then(
            response => {
                setCourse(response.data)
            },
            err => { console.error(err) }
        )
    } catch (err) {
        console.error("error occur on getAllCourse()", err)
    }
};

// get all batch
export const getAllBatches = async (setBatches) => {
    try {
        RestService.getAllBatches().then(
            response => {
                setBatches(response.data)
            },
            err => { console.error(err) }
        )
    } catch (err) {
        console.error("error occur on getAllBatch()", err)
    }
};


