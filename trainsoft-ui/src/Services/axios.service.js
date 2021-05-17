import axios from 'axios'
import { TokenService } from './storage.service'

const AxiosService = {

    init:(baseURL,authToken) => {
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.common["Authorization"] = authToken;
    },
    // setHeader:()=> axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`,
    removeHeader:()=> axios.defaults.headers.common = {},
    get:(resource)=>  axios.get(resource),
    post:(resource, data, params, headers)=> {
        const config = {
            headers: headers,
            params: params
        }
        return axios.post(resource, data, config)
    },
    put:(resource, data) => axios.put(resource, data),
    delete:(resource,payload) => axios.delete(resource,{data:payload}),
    uploadMultiPart:(resource, formData)=>  axios.post(resource, formData, { headers: { 'Content-Type': 'multipart/form-data'}})
    
}

export default AxiosService