import { notAuthenticatedApiClient } from "./BaseApi";


const getProductAttributesByProductId = (productId) => notAuthenticatedApiClient.get('attributes/search/'.concat(productId));



export default {getProductAttributesByProductId};