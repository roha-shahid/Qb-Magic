import axios from "axios";

// const BASE_URL = process.env.REACT_APP_ROOT_URL || 'http://192.168.100.4:8000';

const BASE_URL = import.meta.env.VITE_APP_ROOT_URL || 'http://192.168.100.4:8000';


const invoke = ({ url, method = 'POST', headers = {}, data, baseURL = BASE_URL, ...rest }) => {
  return axios({
    baseURL,
    url,
    method,
    headers,
    data,
    ...rest
  });
};

export default invoke;
