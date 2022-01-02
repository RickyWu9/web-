import axios from 'axios'
import {message} from "ant-design-vue";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000 // request timeout
})

service.interceptors.request.use(
    config => {
        // do something before request is sent
        const token = localStorage.getItem('token')
        if (token) {
            // config.responseType='application/x-www-form-urlencoded;charset=utf-8'
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

var hasHandle401 = false;
service.interceptors.response.use(
    response => {
        const res = response.data
        const code = response.status
        // if the custom code is not 100, it is judged as an error.
        if (code !== 200) {
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            if(response.data.success == true){
                return res.content
            }else{
                return message.error(response.data.extendInfo)
            }
        }
    },
    error => {
        console.log('err' + error) // for debug
        if (!error.response) {
            return Promise.reject(error)
        }
        if (error.response.status === 401 && !hasHandle401) {
            hasHandle401 = true
        }
        return Promise.reject(error)
    }
)

export default service.request