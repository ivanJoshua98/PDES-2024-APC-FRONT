import React, { useEffect, useState } from 'react'
import ShoppingCartController from '../controller/ShoppingCartController';
import { Box, Typography } from '@mui/material';
import PurchasedCart from '../components/PurchasedCart';
import EmptyPurchasesList from '../components/EmptyPurchasesList';


const Purchases = () => {

    const [purchases, setPurchases] = useState([{
        totalAmountPurchase: 0,
        productsInCart: [],
        buyerId: "",
        id: "",
        cartState: ""
    }]);

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        ShoppingCartController.getAllPurchasesByUser(userId).then( (response) => {
            console.log("Carritos encontrados: ", response.data);
            setPurchases(response.data);
            console.log("Se actualizo la lista: ", purchases);
        }).catch( (error) => {
            console.log("Error al obtener las compras realizadas")
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
                {isEmptyList()? <EmptyPurchasesList textTitle="No tienes compras realizadas" textBody="¡Busca productos y agregalos al carrito!"/> :
                    purchases.map( (cart) => (
                        <PurchasedCart cart={cart} key={cart.id}/>
                    ))
                }
            </Box>
        </Box>
    );
}


export default Purchases;            
