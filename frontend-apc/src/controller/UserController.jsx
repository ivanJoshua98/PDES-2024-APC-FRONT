import { authenticatedApiClient, notAuthenticatedApiClient } from "./BaseApi";

const isLoggedIn = () => {
    return sessionStorage.getItem('token') != null;
}


const saveCredentials = (response) => {
    if (response.headers && response.headers.hasAuthorization) {
        const authToken = response.headers.getAuthorization();
        sessionStorage.setItem('token', authToken.toString());
        sessionStorage.setItem('userId', response.data.id);
        sessionStorage.setItem('userName', response.data.userName);
        isAdmin(response.data.id).then( response => {
            sessionStorage.setItem('isAdmin', response.data);
        }).catch(error => {
            console.log("Error al verificar si es admin: ", error);
        })
    } else {
        return Promise.reject("No Authorization header received in response");
    }
};

const register = (email, password, userName) => notAuthenticatedApiClient.post('/apc/register', {
        email,
        password,
        userName
    }).then( 
        (response) => {
            return response;
});

const login = (email, password) => notAuthenticatedApiClient.post('/apc/log-in', {email, password}).then(
    (response) => {
        saveCredentials(response);
        return response;
}).catch(
    (error) => {
        return error;
});


const getAllFavoriteProductsByUser = (userId) => authenticatedApiClient().get('/apc/admin/' + userId + '/favorite-products').then( 
    (response) => {
        return response;
});


const getAllFavoriteProducts = () => authenticatedApiClient().get('/apc/favorite-products').then( 
    (response) => {
        return response;
});

const removeFavoriteProduct = (productId) => authenticatedApiClient().put('/apc/favorite-products/remove/' + productId).then(
    (response) => {
        return response;
});

const addFavoriteProduct = (productId) => authenticatedApiClient().put('/apc/favorite-products/add/' + productId).then(
    (response) => {
        return response;
});

const isFavoriteProduct = (productId) => authenticatedApiClient().get('/apc/is-favorite-product/' + productId).then(
    (response) => {
        return response;
});


const isAdmin = (userId) => authenticatedApiClient().get('/apc/users/is-admin/'+ userId).then(
    (response) => {
        return response;
});

const addAdminRoleToUser = (userToBeAdmin) => authenticatedApiClient().put('/apc/admin/users/add-admin/' + userToBeAdmin).then(
    (response) => {
        return response;
});

const removeAdminRoleToUser = (userToRemoveAdmin) => authenticatedApiClient().put('/apc/admin/users/remove-admin/' + userToRemoveAdmin).then(
    (response) => {
        return response;
});

const getUserByEmailOrUserName = (search) => authenticatedApiClient().get('/apc/admin/users/search/' + search).then(
    (response) => {
        return response;
});

export default {isLoggedIn, 
                register, 
                login, 
                getAllFavoriteProducts,
                getAllFavoriteProductsByUser, 
                removeFavoriteProduct, 
                addFavoriteProduct, 
                isFavoriteProduct,
                isAdmin,
                addAdminRoleToUser,
                removeAdminRoleToUser,
                getUserByEmailOrUserName}