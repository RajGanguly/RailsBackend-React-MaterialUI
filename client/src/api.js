import axios from 'axios';

const axiosInstance =  axios.create({
  baseURL: `http://localhost:3001/api/v1/`
});

let authInterceptor
let tokenInterceptor

export function setupInterceptor (token) {
  axiosInstance.interceptors.request.eject(authInterceptor)
  authInterceptor = axiosInstance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = 'Bearer ' + token
    return config
  })

  tokenInterceptor = axiosInstance.interceptors.response.use(response => {
    return response
  })
}

export default axiosInstance;
