import { Box, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UserController from '../controller/UserController';
import ProductController from '../controller/ProductController';
import EmptyFavoritesList from '../components/EmptyFavoritesList';
import LoadingScreenOptionsSearch from '../components/LoadingScreenOptionsSearch';
import ProductList from '../components/ProductList';


const FavoriteProducts = () => {

    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const [loading, setLoading] = useState(true); 

    const userId = sessionStorage.getItem('userId');

    const groupBy = (amount, list) => {
        var result= [];
        for (var i = 0; i < list.length; i += amount) {
            result.push(list.slice(i, i + amount));
        }
        return result;
    }

    const getAllFavoriteProductsFromML = (idList) => {
        var groupBy20 = groupBy(20, idList);
        groupBy20.forEach( ids => {
            ProductController.getAllProductsById(ids.join()).then( mlProducts => {
                setFavoriteProducts(mlProducts.data);
                setLoading(false);
            }).catch( error => {
                console.log("Error al cargar los productos de ML: ", error);
            });
        });
    };

    useEffect( () => {
        UserController.getAllFavoriteProducts().then( response => {
            getAllFavoriteProductsFromML(response.data);
            if(response.data.length === 0){
                setLoading(false);
            };
        }).catch( error => {
            console.log("Error al obtener los productos favoritos: ", error);
        })
    }, [userId]);

    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                    <Typography sx={{   color:'#1976d2', 
                                        fontSize: '40px',
                                        fontWeight:'bold'}}>Mis favoritos</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {loading ? 
                    <LoadingScreenOptionsSearch/> 
                    :
                    favoriteProducts.length === 0 ? 
                        <EmptyFavoritesList textTitle="No tienes productos favoritos" textBody="¡Busca productos y agregalos!" /> 
                        :
                        <ProductList products={favoriteProducts}/>
                }
            </Box>
        </Box>
    )
}

export default FavoriteProducts;
