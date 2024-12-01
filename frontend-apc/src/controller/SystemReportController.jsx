import { authenticatedApiClient } from "./BaseApi";


const getUsersWithMostPurchases = () => authenticatedApiClient().get('/apc/admin/reports/users-with-most-purchases-by-shopping-carts').then(
    (response) => {
        return response
});

const getUsersWithMostPurchasedProducts = () => authenticatedApiClient().get('/apc/admin/reports/users-with-most-purchases-by-products-amount').then(
    (response) => {
        return response
});

const getTopFiveFavoriteProducts = () => authenticatedApiClient().get('/apc/admin/reports/products-most-times-chosen-favorite').then(
    (response) => {
        return response;
});

const getTopFivePurchasedProducts = () => authenticatedApiClient().get('/apc/admin/reports/most-purchased-products').then(
    (response) => {
        return response;
});

export default {getUsersWithMostPurchases,
                getUsersWithMostPurchasedProducts,
                getTopFiveFavoriteProducts,
                getTopFivePurchasedProducts};