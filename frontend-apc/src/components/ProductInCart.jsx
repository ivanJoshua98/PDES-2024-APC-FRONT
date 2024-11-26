import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react'
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartController from '../controller/ShoppingCartController';
import { Context } from '../App';

const ProductInCart = (props) => {

    const product = props.product;

    const [shoppingCart, setShoppingCart] = useContext(Context);

    const removeJustOne = () => {
        ShoppingCartController.subtractProductOneTime(shoppingCart.id, product.id).then( response => {
            setShoppingCart(response.data);
            console.log("Se resto en uno la cantidad del producto");
        }).catch( (error) => {
            console.log("Error al restar en uno la cantidad del producto: ", error);
        });
    };

    const removeAll = () => {
        ShoppingCartController.removeProduct(shoppingCart.id, product.id).then( response => {
            setShoppingCart(response.data);
        }).catch( (error) => {
            console.log("Error al quitar el producto del carrito: ", error);
        });
    };

    const addJustOneToCart = () => {
        ShoppingCartController.addProductOneTime(shoppingCart.id, product.id).then( response => {
            setShoppingCart(response.data);
        }).catch( (error) => {
            console.log("Error al sumas en uno la cantidad del producto: ", error);
        });
    };

  return (
    <Box display='flex' alignItems='center' margin='1rem' key={product.id}>
        <img srcSet={product.picture}
                        src={product.picture}  
                        alt='product image'
                        loading="lazy" 
                        width='75px' 
                        height='75px'
                        style={{objectFit: 'scale-down', margin:'5px'}}/>
        <Grid container spacing={2} width='100%'>
            <Grid size={8} display='flex' alignSelf='end'>
                <Typography > {product.title} </Typography>
            </Grid>
            <Grid size={4}justifyItems='right'>
                <IconButton sx={{float:'right'}} onClick={removeAll}>
                    <DeleteIcon/>
                </IconButton>
            </Grid>
            <Grid size={8}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button sx={{fontWeight:'bold'}} onClick={removeJustOne}>-</Button>
                    <Button sx={{cursor: 'default'}}>{product.amount}</Button>
                    <Button sx={{fontWeight:'bold'}} onClick={addJustOneToCart}>+</Button>
                </ButtonGroup>
            </Grid>
            <Grid size={4} justifyItems='right'>
                <Typography fontWeight='bold'> ${Intl.NumberFormat().format(product.price * product.amount)} </Typography>
            </Grid>
        </Grid>
    </Box>
  )
}
export default ProductInCart
