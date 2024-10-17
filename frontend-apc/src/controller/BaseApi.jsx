import axios from "axios"

const BASE_URL = "http://localhost:8080/"

export const notAuthenticatedApiClient = axios.create({
    baseURL: BASE_URL,
})


export const authenticatedApiClient = () => {
    const token = localStorage.getItem('token');
    if (token){
        const client = axios.create({
            baseURL: BASE_URL,
        });
        client.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        })
        return client;
    } else {
        throw Error('Cannot build Authenticated Api Client without logged in user');
    }
}