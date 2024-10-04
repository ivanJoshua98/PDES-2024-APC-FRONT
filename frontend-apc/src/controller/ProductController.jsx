import { notAuthenticatedApiClient } from "./BaseApi";


const searchProductsByWords = (words) => notAuthenticatedApiClient.get('/products/search/'.concat(words));

const getProductByIdFromML = (productId) => notAuthenticatedApiClient.get('/products/search/item/'.concat(productId));


export default {searchProductsByWords, getProductByIdFromML};