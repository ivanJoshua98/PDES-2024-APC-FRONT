import { authenticatedApiClient } from "./BaseApi";


const searchProductsByWords = (words) => authenticatedApiClient().get('/products/search/'.concat(words));

const getProductByIdFromML = (productId) => authenticatedApiClient().get('/products/search/item/'.concat(productId));

const getAllProductsById = (ids) => authenticatedApiClient().get('/products/search/items/'+ ids).then(
    (response) => {
        return response;
});


export default {searchProductsByWords, getProductByIdFromML, getAllProductsById};