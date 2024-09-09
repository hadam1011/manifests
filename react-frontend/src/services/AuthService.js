import axios from 'axios';
import { nonAuthorHeader } from '../const';

const apiAuthenticateUrl = process.env.REACT_APP_API_AUTHENTICATE_BASE_URL;

export const login = async (data) => {
    const response = await axios.post(`${apiAuthenticateUrl}/login`, data, {
        headers: nonAuthorHeader,
    })
    return response;
}

export const register = async (data) => {
    const response = await axios.post(`${apiAuthenticateUrl}/register`, data, {
        headers: nonAuthorHeader,
    })
    return response;
}
