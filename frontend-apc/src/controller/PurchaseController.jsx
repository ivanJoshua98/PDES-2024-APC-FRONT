import { authenticatedApiClient } from "./BaseApi";



const finishPurchase = (salePrice, soldProductsIds, buyerId) => authenticatedApiClient().post('apc/purchase/buy', {
    salePrice,
    soldProductsIds,
    buyerId,
}).then( (response) => {
    return response
});

export default {finishPurchase}