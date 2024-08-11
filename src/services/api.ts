import axios from "axios";

const api = axios;

api.defaults.baseURL = "https://interview.t-alpha.com.br/api"
api.defaults.headers.head["Content-Type"] = "application/json";


export default api;