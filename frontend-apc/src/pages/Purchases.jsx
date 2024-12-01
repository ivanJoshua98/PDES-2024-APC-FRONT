import React, { useEffect, useState } from 'react'
import ShoppingCartController from '../controller/ShoppingCartController';
import { Box, Typography } from '@mui/material';
import PurchasedCart from '../components/PurchasedCart';
import EmptyPurchasesList from '../components/EmptyPurchasesList';
import LoadingScreenOptionsSearch from '../components/LoadingScreenOptionsSearch';


const Purchases = () => {

    /*const [purchases, setPurchases] = useState([{
        totalAmountPurchase: 0,
        productsInCart: [],
        buyerId: "",
        id: "",
        cartState: ""
    }]); */

    const [purchases, setPurchases] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        ShoppingCartController.getAllPurchases().then( (response) => {
            setPurchases(response.data);
            setIsLoading(false);
        }).catch( (error) => {
            console.log("Error al obtener las compras realizadas: ", error);
        });
    }, [userId]);

    const isEmptyList = () => {
        return purchases.length === 0;
    }

    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Mis compras</Typography>
            </Box>
            <Box margin='1rem' sx={{placeItems: 'center'}}>
                {isLoading?
                    <LoadingScreenOptionsSearch />
                    :
                    isEmptyList()? 
                        <EmptyPurchasesList textTitle="No tienes compras realizadas" textBody="¡Busca productos y agregalos al carrito!"/> 
                        :
                        purchases.map( (cart) => (
                            <PurchasedCart cart={cart} key={cart.id}/>
                        ))
                }
            </Box>
        </Box>
    );
}


export default Purchases;            
