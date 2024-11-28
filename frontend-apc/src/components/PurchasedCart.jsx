import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const PurchasedCart = (props) => {

    const cart = props.cart;

    const navigate = useNavigate();

    const amountOfProducts = () => {
        var amount = 0;
        console.log("Este es el carrito que me llego: ", cart);
        cart.productsInCart.forEach(element => {
            amount = amount + element.amount;
        });
        return amount;
    }

    const navigateToCart = () => {
        navigate('/all-purchases/shopping-cart/' + cart.id);
    };

    return (
        <Grid container spacing={2} width='80%' sx={{   padding: '5px',
                                                        margin: '1rem',
                                                        border:'2px solid #1976d2', 
                                                        borderRadius: '10px'}}>
            <Grid size={8} display='flex' justifyContent='left' alignItems='center'>
                <ShoppingCartCheckoutIcon color='primary' sx={{fontSize: '40px', margin:'1rem'}}/>            
                <Button sx={{fontWeight:'bold'}} onClick={navigateToCart}>Ver mas</Button>
                <Typography fontWeight='bold' margin='1rem'>{amountOfProducts()} productos comprados </Typography>        
            </Grid>
            <Grid size={4} display='flex' justifyContent='right' alignItems='center'>
                <Typography fontWeight='bold' padding='5px' sx={{border:'2px solid #1976d2',
                                                                 borderRadius: '10px',
                                                                 backgroundColor: '#1976d2',
                                                                 color: 'white',
                                                                 marginRight:'10px'}}>
                    ${Intl.NumberFormat().format(cart.totalAmountPurchase)} gastados
                 </Typography>
            </Grid>
        </Grid>
    )
}

export default PurchasedCart;
