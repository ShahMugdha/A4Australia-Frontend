import axios from 'axios';
const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:5000/api/v1`
    : '';

const request = axios.create({
  baseURL: SERVER_URL,
  // time out on 10000 milliseconds
  timeout: 10000,
});
request.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers['authorization'] = `${localStorage.getItem(
        'token'
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;