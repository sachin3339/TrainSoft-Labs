import axios from 'axios'
import { TokenService } from './storage.service'
const AxiosService = {

    init:(baseURL) => {
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.common["Authorization"] = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMDNEMDhFQjY5MkE0RDg5OEQ1NEUwNkM0NTc1QTA5NUM1MUJBQUEwNjYyQTQ4N0NBQjU2RTNGMUNFOTdGRTg0IiwiaWF0IjoxNjE1Mjc2MDUzLCJzdWIiOiJ7XCJjb21wYW55U2lkXCI6XCI1RDY2RUFCMDBCNDQ0NkM5QTdBREI4OThDNDNDMkMxMTk0NTZDNUU2Q0E0RDQ0OTlBRTIzNzgyMkUzQTQxQ0I3XCIsXCJ2aXJ0dWFsQWNjb3VudFNpZFwiOlwiMDgzREM5NDExQUQ1NEI4OUFBOTRDNEEwQTdBODc0M0YzODNDRERCQTJBQ0M0QTE3QTg0QjJCRDAxMUY1MDEyQlwiLFwidXNlclNpZFwiOlwiMTAzRDA4RUI2OTJBNEQ4OThENTRFMDZDNDU3NUEwOTVDNTFCQUFBMDY2MkE0ODdDQUI1NkUzRjFDRTk3RkU4NFwiLFwiZGVwYXJ0bWVudFNpZFwiOlwiQzIzRkM0MDJGMjdBNEE2ODkwOTJGMUY0Q0E0NDE3QzcyNzc0ODNBRjZFQzc0NkM5QUNFNTFGQTgxOTZDMjA1RFwiLFwiZGVwYXJ0bWVudFJvbGVcIjpcIklOU1RSVUNUT1JcIixcImNvbXBhbnlSb2xlXCI6XCJVU0VSXCIsXCJlbWFpbElkXCI6XCJrdW1hcmthbmhpeWEyMUBnbWFpbC5jb21cIn0iLCJpc3MiOiJrdW1hcmthbmhpeWEyMUBnbWFpbC5jb20iLCJleHAiOjE2MTY3NzYwNTN9.KYfr2QmDcRa8kB8Dz8H5g1h-E3PFld6W6kz-SheEqlk'
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