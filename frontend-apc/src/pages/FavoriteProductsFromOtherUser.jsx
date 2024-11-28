import { Box, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import UserController from '../controller/UserController';
import ProductController from '../controller/ProductController';
import EmptyFavoritesList from '../components/EmptyFavoritesList';
import LoadingScreenProductSearch from '../components/LoadingScreenProductSearch';
import ProductList from '../components/ProductList';
import { useParams } from 'react-router-dom';


const FavoriteProductsFromOtherUser = () => {

    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const [loading, setLoading] = useState(true); 

    let {userId} = useParams();

    let{userName} = useParams();

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
            }).catch( error => {
                console.log("Error al cargar los productos de ML: ", error);
            });
        });
        setLoading(false);
    };

    useEffect( () => {
        UserController.getAllFavoriteProducts(userId).then( response => {
            getAllFavoriteProductsFromML(response.data);
        }).catch( error => {
            console.log("Error al obtener los productos favoritos: ", error);
        })
    }, [userId]);

    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                    <Typography sx={{   color:'#1976d2', 
                                        fontSize: '40px',
                                        fontWeight:'bold'}}>Favoritos de {userName}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {loading ? 
                    <LoadingScreenProductSearch/> 
                    :
                    favoriteProducts.length === 0 ? 
                        <EmptyFavoritesList textTitle={userName} textBody={"no tiene productos favoritos"} /> 
                        :
                        <ProductList products={favoriteProducts}/>
                }
            </Box>
        </Box>
    )

}

export default FavoriteProductsFromOtherUser