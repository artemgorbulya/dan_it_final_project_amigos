import axios from "axios";

// const refreshToken = async (token) => {
//     const { data } = await axios.post('/api/auth/refreshToken', {token});

//     return data;
// };

axios.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('token');

    return config;
});

// axios.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;
//         const token = localStorage.getItem('token');

//         if (error.response.status === 403 && !originalRequest._retry && token) {
//             originalRequest._retry = true;

//             try {
//                 const { data: tokenNew } = await refreshToken(token);

//                 axios.defaults.headers.common['Authorization'] = tokenNew;
//                 localStorage.setItem('token', tokenNew);

//                 return axios(originalRequest);
//             } catch (e) {
//                 return Promise.reject(e);
//             }
//         }

//         return Promise.reject(error);
//     }
// );