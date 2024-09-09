import axios from 'axios';
import { headers } from '../utils';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

class QueryService {

    getQueries(token){
        return axios.get(`${apiBaseUrl}/queries`,{
          headers: headers(token)
        });
    }

    createQuery(query,token){
        return axios.post(`${apiBaseUrl}/queries/test`, query,{
          headers: headers(token)
        });
    }

    getQueryById(queryId, token){
        return axios.get(`${apiBaseUrl}/queries/${queryId}`,{
          headers: headers(token)
        });
    }

    updateQuery(query, queryId, token){
        return axios.put(`${apiBaseUrl}/queries/${queryId}`, query,{
          headers: headers(token)
        });
    }

    deleteQuery(queryId, token){
        return axios.delete(`${apiBaseUrl}/queries/${queryId}`,{
          headers: headers(token)
        });
    }
}

export default new QueryService()