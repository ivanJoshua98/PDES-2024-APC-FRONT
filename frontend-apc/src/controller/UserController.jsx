import { authenticatedApiClient, notAuthenticatedApiClient } from "./BaseApi";

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

const getAllFavoriteProducts = (userId) => authenticatedApiClient().get('/apc/' + userId + '/favorite-products').then( 
    (response) => {
        return response;
});

const removeFavoriteProduct = (userId, productId) => authenticatedApiClient().put('/apc/' + userId + '/favorite-products/remove/' + productId).then(
    (response) => {
        return response;
});

const addFavoriteProduct = (userId, productId) => authenticatedApiClient().put('/apc/' + userId + '/favorite-products/add/' + productId).then(
    (response) => {
        return response;
});

const isFavoriteProduct = (userId, productId) => authenticatedApiClient().get('/apc/' + userId + '/is-favorite-product/' + productId).then(
    (response) => {
        return response;
});


export default {isLoggedIn, register, login, getAllFavoriteProducts, removeFavoriteProduct, addFavoriteProduct, isFavoriteProduct}