// http.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // If the token is present, set the Authorization header
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Login function
async function login(loginForm) {
    const response = await instance.post('/api-token-auth/', loginForm);

    // Save the token to local storage
    const token = response.data.token;
    if (token) {
        localStorage.setItem('token', token);
        instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    return response;
}

export { login };

export default instance;