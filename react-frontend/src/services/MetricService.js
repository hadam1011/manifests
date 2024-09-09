import axios from 'axios';
import { headers } from '../utils';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

class MetricService {

    getMetrics(token){
        return axios.get(`${apiBaseUrl}/metrics`,{
          headers: headers(token)
      });
    }

    createMetric(metric, token){
        return axios.post(`${apiBaseUrl}/metrics`, metric,{
          headers: headers(token)
      });
    }

    getMetricById(metricId, token){
        return axios.get(`${apiBaseUrl}/metrics/${metricId}`,{
          headers: headers(token)
      });
    }

    updateMetric(metric, metricId, token){
        return axios.put(`${apiBaseUrl}/metrics/${metricId}`, metric,{
          headers: headers(token)
      });
    }

    deleteMetric(metricId, token){
        return axios.delete(`${apiBaseUrl}/metrics/${metricId}`,{
          headers: headers(token)
      });
    }
}

export default new MetricService()