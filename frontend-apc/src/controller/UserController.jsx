import { notAuthenticatedApiClient } from "./BaseApi";

const isLoggedIn = () => {
    return localStorage.getItem('token') != null;
}


const saveCredentials = (response) => {
    if (response.headers && response.headers.hasAuthorization) {
        const authToken = response.headers.getAuthorization();
        localStorage.setItem('token', authToken.toString());
        localStorage.setItem('userId', response.data.id);
    } else {
        return Promise.reject("No Authorization header received in response");
    }
};

const register = (email, password, userName) => notAuthenticatedApiClient.post('/apc/register', {
        email,
        password,
        userName
    }).then((response) => {
    return response;
})

const login = (email, password) => {
    return notAuthenticatedApiClient.post('/apc/log-in', {email, password})
        .then((response) => {
            return saveCredentials(response);
        })
}


export default {isLoggedIn, register, login}