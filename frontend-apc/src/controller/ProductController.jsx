import { authenticatedApiClient } from "./BaseApi";


const searchProductsByWords = (words) => authenticatedApiClient().get('/products/search/'.concat(words));

const getProductByIdFromML = (productId) => authenticatedApiClient().get('/products/search/item/'.concat(productId));


export default {searchProductsByWords, getProductByIdFromML};