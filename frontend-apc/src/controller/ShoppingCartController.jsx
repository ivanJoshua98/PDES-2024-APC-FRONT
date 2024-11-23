import { authenticatedApiClient } from "./BaseApi";


const createShoppingCart = (productsInCart, buyerId) => authenticatedApiClient().post('/apc/shoppingCart/newShoppingCart', {
    productsInCart,
    buyerId,
}).then( (response) => {
    return response;
});


const finishPurchase = (shoppingCartId) => authenticatedApiClient().put('/apc/shoppingCart/' + shoppingCartId + '/finishPurchase').then(
    (response) => {
        return response;
});


const addProductOneTime = (shoppingCartId, productId) => authenticatedApiClient().put('apc/shoppingCart/' + shoppingCartId + '/addProductOneTime/' + productId).then( (response) => {
    return response;
});


const addNewProduct = (shoppingCartId, mercadoLibreId, amount, picture, link, title, categoryId, price, condition) => authenticatedApiClient().put('/apc/shoppingCart/' + shoppingCartId + '/addProduct', {
    mercadoLibreId, 
    amount,
    picture,
    link,
    title, 
    categoryId,
    price,
    condition,
}).then( (response) => {
    return response;
});


const removeProduct = (shoppingCartId, productId) => authenticatedApiClient().put('/apc/shoppingCart/' + shoppingCartId + '/removeProduct/' + productId).then( (response) => {
    return response;
});


const subtractProductOneTime = (shoppingCartId, productId) => authenticatedApiClient().put('/apc/shoppingCart/' + shoppingCartId + '/subtractProductOneTime/'+ productId).then( (response) => {
    return response;
});


const deleteShoppingCart = (shoppingCartId) => authenticatedApiClient().delete('/apc/shoppingCart/' + shoppingCartId + '/deleteShoppingCart').then(
    (response) => { 
        return response 
});


const getShoppingCart = (shoppingCartId) => authenticatedApiClient().get('/apc/shoppingCart/' + shoppingCartId).then(
    (response) => {
        return response;
});


const getShoppingCartInProgress = (userId) => authenticatedApiClient().get('apc/shoppingCart/inprogress/' + userId).then(
    (response) => {
        return response;
});


export default {deleteShoppingCart, 
                subtractProductOneTime, 
                removeProduct, 
                addProductOneTime, 
                addNewProduct, 
                createShoppingCart, 
                finishPurchase,
                getShoppingCart,
                getShoppingCartInProgress};