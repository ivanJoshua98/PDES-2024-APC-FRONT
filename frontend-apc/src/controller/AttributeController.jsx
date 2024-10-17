import { authenticatedApiClient } from "./BaseApi";


const getProductAttributesByProductId = (productId) => authenticatedApiClient().get('attributes/search/'.concat(productId));



export default {getProductAttributesByProductId};