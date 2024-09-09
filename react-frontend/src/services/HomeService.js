import axios from 'axios';
import { headers } from '../utils';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const apiAuthenticateUrl = process.env.REACT_APP_API_AUTHENTICATE_BASE_URL;

class HomeService {
    homeView(token){
        return axios.get(`${apiBaseUrl}/home`, {
          headers: headers(token)
        });
    }
    exportToYaml(token){
        return axios.get(`${apiBaseUrl}/home/downloadYaml`, {
          headers: headers(token)
        });
    }

    login(account,token){
        return axios.post(`http://localhost:8080/api/auth/login`, account,{
          headers: headers(token)
        });
    }

}

export default new HomeService()