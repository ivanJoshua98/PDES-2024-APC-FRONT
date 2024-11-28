import { authenticatedApiClient } from "./BaseApi";


const getUsersWithMostPurchases = () => authenticatedApiClient().get('/apc/reports/users-with-most-purchases-by-shopping-carts').then(
    (response) => {
        return response
});

const getUsersWithMostPurchasedProducts = () => authenticatedApiClient().get('/apc/reports/users-with-most-purchases-by-products-amount').then(
    (response) => {
        return response
});

export default {getUsersWithMostPurchases,
                getUsersWithMostPurchasedProducts};