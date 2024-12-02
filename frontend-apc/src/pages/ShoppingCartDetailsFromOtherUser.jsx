import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import ShoppingCartController from '../controller/ShoppingCartController';
import { useParams } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';

const ShoppingCartDetailsFromOtherUser = () => { 

    const [purchasedCart, setPurchasedCart] = useState({
        totalAmountPurchase: 0,
        productsInCart: [],
        buyerId: "",
        id: "",
        cartState: ""
    });

    let {cartId} = useParams();

    useEffect( () => {
        ShoppingCartController.getShoppingCartById(cartId).then( (response) => {
            setPurchasedCart(response.data);
        }).catch( (error) => {
            console.log("Error al obtener el carrito de compras: ", error);
        })
    }, [cartId]);

    const productsAmount = () => {
        var result = 0;
        purchasedCart.productsInCart.forEach(element => {
            result = result + element.amount;
        });
        return result;
    };

    const listElement = (product) => (
        <Box display='flex' alignItems='center' padding='1rem' key={product.id} sx={{borderBottom: 'outset'}}>
            <img srcSet={product.picture}
                         src={product.picture}  
                         alt='product image'
                         loading="lazy" 
                         width='75px' 
                         height='75px'
                         style={{objectFit: 'scale-down', margin:'5px', alignSelf:'end'}}/>
            <Grid container spacing={2} width='100%'>
                <Grid size={8} display='flex' alignSelf='end'>
                    <Typography > {product.title} </Typography>
                </Grid>
                <Grid size={4} justifyItems='right'>
                    <Tooltip title="Ver en Mercado Libre">
                        <IconButton color="primary" aria-label="go to mercado libre post" href={product.link} sx={{float: 'inline-end'}}>
                            <LinkIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid size={8}>
                    <Typography fontWeight='bold' padding='5px' sx={{border:'1px solid #1976d2',
                                                                     borderRadius: '10px',
                                                                     marginRight:'10px',
                                                                     width: 'fit-content'}}>
                        X {product.amount}
                    </Typography>
                </Grid>
                <Grid size={4} justifyItems='right'>
                    <Typography>Precio x unidad ${Intl.NumberFormat().format(product.price)} </Typography>
                    <Typography fontWeight='bold'>Total ${Intl.NumberFormat().format(product.price * product.amount)} </Typography>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box margin='1rem' marginTop='2rem'>
            {purchasedCart.productsInCart.map( product => (
                listElement(product)
            ))}
            <Box display='flex' marginTop='1rem' justifyContent='right'>
                <Typography fontWeight='bold' padding='5px' sx={{border:'2px solid #1976d2',
                                                                     borderRadius: '10px',
                                                                     backgroundColor: '#1976d2',
                                                                     color: 'white',
                                                                     marginRight:'10px',
                                                                     width: 'fit-content'}}>
                    {productsAmount()} productos
                </Typography>
                <Typography fontWeight='bold' padding='5px' sx={{border:'2px solid #1976d2',
                                                                     borderRadius: '10px',
                                                                     backgroundColor: '#1976d2',
                                                                     color: 'white',
                                                                     marginRight:'10px',
                                                                     width: 'fit-content'}}>
                    ${Intl.NumberFormat().format(purchasedCart.totalAmountPurchase)} gastados
                </Typography>
            </Box>
        </Box>
    )
}

export default ShoppingCartDetailsFromOtherUser;
