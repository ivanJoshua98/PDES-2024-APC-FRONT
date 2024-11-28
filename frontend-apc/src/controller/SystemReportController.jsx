import { authenticatedApiClient } from "./BaseApi";


const getUsersWithMostPurchases = () => authenticatedApiClient().get('/apc/reports/users-with-most-purchases').then(
    (response) => {
        return response
});

export default {getUsersWithMostPurchases};