import axios from "axios";

const  axiosPrivate = axios.create({
    withCredentials: true,
    baseURL: '/',
    headers: {'Content-Type': 'application/json'},
})

axiosPrivate.interceptors.request.use((config) => {
    if(localStorage.getItem('accessToken')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
    }
    return config;
}, (err) => {
    console.log(err);
    return Promise.reject(err);
})

axiosPrivate.interceptors.response.use((config) => {
    return config;
}, async (err) => {
    try {
        const origRequest = err.config;
        if(err.response.status === 401 && err.config && !err.config._isRetry) {
            origRequest._isRetry = true;
            const res = await axios.get(
                '/users/refresh',
                {withCredentials: true}
            );
            localStorage.setItem('accessToken', res.data.accessToken);
            return axiosPrivate(origRequest);
        }
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        return Promise.reject(error.response.data);
    }
    return Promise.reject(err.response.data);
})


export default axiosPrivate;