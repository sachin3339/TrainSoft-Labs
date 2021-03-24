import axios from 'axios'
import { TokenService } from './storage.service'
const AxiosService = {

    init:(baseURL,jwtToken) => {
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.common["Authorization"] =`${jwtToken}` 
    },
    // setHeader:()=> axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`,
    removeHeader:()=> axios.defaults.headers.common = {},
    get:(resource)=>  axios.get(resource),
    post:(resource, data, params, headers)=> {
        const config = {
            headers: headers
        }
        return axios.post(resource, data, config)
    },
    put:(resource, data) => axios.put(resource, data),
    delete:(resource) => axios.delete(resource),
    uploadMultiPart:(resource, formData)=>  axios.post(resource, formData, { headers: { 'Content-Type': 'multipart/form-data'}})
    
}

export default AxiosService