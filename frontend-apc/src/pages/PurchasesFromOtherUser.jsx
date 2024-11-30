import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ShoppingCartController from '../controller/ShoppingCartController';
import { Box, Typography } from '@mui/material';
import PurchasedCart from '../components/PurchasedCart';
import EmptyPurchasesList from '../components/EmptyPurchasesList';
import LoadingScreenOptionsSearch from '../components/LoadingScreenOptionsSearch';

const PurchasesFromOtherUser = () => {

    let {userId} = useParams();

    let{userName} = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        ShoppingCartController.getAllPurchasesByUser(userId).then( (response) => {
            setPurchases(response.data);
            setIsLoading(false);
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
                                    fontWeight:'bold'}}>Compras de {userName}</Typography>
            </Box>
            <Box margin='1rem' sx={{placeItems: 'center'}}>
                {isLoading?
                    <LoadingScreenOptionsSearch />
                    :
                    isEmptyList()? 
                        <EmptyPurchasesList textTitle={userName} textBody="No tiene compras realizadas" /> 
                        :
                        purchases.map( (cart) => (
                            <PurchasedCart cart={cart} key={cart.id}/>
                        ))
                }
            </Box>
        </Box>
    );

    
}

export default PurchasesFromOtherUser
