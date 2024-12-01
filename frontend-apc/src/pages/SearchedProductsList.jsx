import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ProductController from '../controller/ProductController';
import { useParams } from 'react-router-dom';
import LoadingScreenOptionsSearch from '../components/LoadingScreenOptionsSearch';
import ProductList from '../components/ProductList';

function SearchedProductsList() {

    let {keyWords} = useParams();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        ProductController.searchProductsByWords(keyWords).then(res => {
            setProducts(res.data);
            setLoading(false);
        }).catch(error => console.log('Error al buscar los productos:', error));
    }, [keyWords]);


  return (
    <Box sx={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>

      {loading ? 
        <LoadingScreenOptionsSearch/> 
        :
        <ProductList products={products}/>
      }
    </Box>
  );
}


export default SearchedProductsList
