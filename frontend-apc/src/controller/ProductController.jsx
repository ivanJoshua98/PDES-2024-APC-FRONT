import { notAuthenticatedApiClient } from "./BaseApi";


const searchProductsByWords = (words) => notAuthenticatedApiClient.get('/products/search/'.concat(words));


export default {searchProductsByWords}