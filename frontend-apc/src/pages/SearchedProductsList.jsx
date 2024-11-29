import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ProductController from '../controller/ProductController';
import { useParams } from 'react-router-dom';
import LoadingScreenProductSearch from '../components/LoadingScreenProductSearch';
import ProductList from '../components/ProductList';

function SearchedProductsList() {

    let {keyWords} = useParams();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        ProductController.searchProductsByWords(keyWords).then(res => {
            setProducts(res.data);
            setLoading(false);
        }).catch(error => console.log('error:', error));
    }, [keyWords]);


  return (
    <Box sx={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>

      {loading ? 
        <LoadingScreenProductSearch/> 
        :
        <ProductList products={products}/>
      }
    </Box>
  );
}


export default SearchedProductsList
