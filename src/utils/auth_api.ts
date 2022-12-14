import axios from 'axios';
import { BACKEND_URL } from './constants';

axios.defaults.baseURL = BACKEND_URL

interface ResponseInterface {
    status: number
    data: any
}

export const login = async(email: string, password: string): Promise<ResponseInterface> => {
    try {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
        const bodyContent = `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
        const reqOptions = {
            url: "/api/v1/user/token",
            method: "POST",
            headers: headers,
            data: bodyContent,
        }

        let result = await axios.request(reqOptions)

        return {
            status: result.status,
            data: result.data
        }

    } catch (err: any) {

        return {
            status: err.response.status,
            data: err.response.data
        }
    }
}

export const getUserDetails = async(token: string): Promise<ResponseInterface> => {
    try {
        const headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const reqOptions = {
            url: "/api/v1/user/details",
            method: "GET",
            headers: headers,
        }

        let result = await axios.request(reqOptions)

        return {
            status: result.status,
            data: result.data
        }

    } catch (err: any) {

        return {
            status: err.response.status,
            data: err.response.data
        }
    }
}

export const updateEmail = async(token: string, new_email: string): Promise<ResponseInterface> => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const bodyContent = {
            "email": new_email
        }
        const reqOptions = {
            url: "/api/v1/user/update-email",
            method: "PUT",
            headers: headers,
            data: JSON.stringify(bodyContent),
        }

        let result = await axios.request(reqOptions)

        return {
            status: result.status,
            data: result.data
        }

    } catch (err: any) {

        return {
            status: err.response.status,
            data: err.response.data
        }
    }
}

export const confirmEmailUpdate = async(id: string): Promise<ResponseInterface> => {
    try {
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        const reqOptions = {
            url: `/api/v1/user/confirm-email/${id}` ,
            method: "PUT",
            headers: headers,
        }

        let result = await axios.request(reqOptions)

        return {
            status: result.status,
            data: result.data
        }

    } catch (err: any) {

        return {
            status: err.response.status,
            data: err.response.data
        }
    }
}
