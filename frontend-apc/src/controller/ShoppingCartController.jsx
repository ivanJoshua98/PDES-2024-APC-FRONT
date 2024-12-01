import { authenticatedApiClient } from "./BaseApi";


const createShoppingCart = (productsInCart, buyerId) => authenticatedApiClient().post('/apc/shopping-cart/new-shopping-cart', {
    productsInCart,
    buyerId,
}).then( (response) => {
    return response;
});


const finishPurchase = () => authenticatedApiClient().put('/apc/shopping-cart/inprogress/finish-purchase').then(
    (response) => {
        return response;
});


const addProductOneTime = (productId) => authenticatedApiClient().put('apc/shopping-cart/inprogress/add-product-one-time/' + productId).then( (response) => {
    return response;
});


const addNewProduct = (mercadoLibreId, amount, picture, link, title, categoryId, price, condition) => authenticatedApiClient().put('/apc/shopping-cart/inprogress/add-product', {
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


const removeProduct = (productId) => authenticatedApiClient().put('/apc/shopping-cart/inprogress/remove-roduct/' + productId).then( (response) => {
    return response;
});


const subtractProductOneTime = (productId) => authenticatedApiClient().put('/apc/shopping-cart/inprogress/subtract-product-one-time/'+ productId).then( (response) => {
    return response;
});


const deleteShoppingCart = () => authenticatedApiClient().delete('/apc/shopping-cart/inprogress/delete-shopping-cart').then(
    (response) => { 
        return response 
});


const getShoppingCartInProgress = () => authenticatedApiClient().get('/apc/shopping-cart/inprogress').then(
    (response) => {
        return response;
}).catch(
    (error) => {
        return error;
});


const getShoppingCartById = (shoppingCartId) => authenticatedApiClient().get('/apc/admin/shopping-cart/' + shoppingCartId).then(
    (response) => {
        return response;
});



const getAllPurchasesByUser = (userId) => authenticatedApiClient().get('apc/admin/shopping-cart/all-purchases/' + userId).then (
    (response) => {
        return response;
    }
) 


const getAllPurchases = (userId) => authenticatedApiClient().get('apc/shopping-cart/all-purchases').then (
    (response) => {
        return response;
    }
) 


export default {deleteShoppingCart, 
                subtractProductOneTime, 
                removeProduct, 
                addProductOneTime, 
                addNewProduct, 
                createShoppingCart, 
                finishPurchase,
                getShoppingCartById,
                getShoppingCartInProgress,
                getAllPurchasesByUser,
                getAllPurchases};