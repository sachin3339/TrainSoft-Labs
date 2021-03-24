import RestService from "./api.service";


// get batches by sid
export const getPaginationCount = async (name) => {
    let count = 0
    try {
        RestService.getCount(name).then(
            response => {
                count = response.data
            },
            err => { console.error(err) }
        )
    } catch (err) {
        console.error("error occur on getPaginationCount()", err)
    }
    return count
};