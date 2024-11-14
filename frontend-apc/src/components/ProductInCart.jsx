import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../App';

const ProductInCart = (props) => {

    const [cartContent, setCartContent] = useContext(Context);

    const product = props.product;

    const repetitionsNumber = () => {
        var result = 0;
        cartContent.forEach(element => {
            if(element.id == product.id){
                result ++;
            }
        });
        return result;
    }

    const [cant, setCant] = useState(repetitionsNumber());

    const [price, setPrice] = useState(product.price * repetitionsNumber());


    const removeJustOne = () => {
        var index = cartContent.indexOf(product);
        if (index > -1 && cant > 1 && cartContent[index].id === product.id) {
            setCartContent(cartContent.toSpliced(index, 1));
            setCant(cant - 1);
            setPrice(price  - product.price);
        }
    }

    const removeAll = () => {
        setCartContent(cartContent.filter(element => element.id !== product.id ));
    }


    const existsIdInList = (list, id) => {
        let exists = false;
        list.forEach((element) => {
          exists = exists || (element.id === id);
        });
        return exists;
      }


    const addToCart = () => {
        var index = 0;
        if (existsIdInList(cartContent, product.id)){
            index = cartContent.indexOf(product);
        };
        setCartContent(cartContent.toSpliced(index, 0, product));
        setCant(cant + 1);
        setPrice(price + product.price);
    }


  return (
    <Box display='flex' alignItems='center' margin='1rem' key={product.id}>
        <img srcSet={`${product.pictures[0]}`}
                        src={`${product.pictures[0]}`}  
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
                    <Button sx={{cursor: 'default'}}>{cant}</Button>
                    <Button sx={{fontWeight:'bold'}} onClick={addToCart}>+</Button>
                </ButtonGroup>
            </Grid>
            <Grid size={4} justifyItems='right'>
                <Typography fontWeight='bold'> ${Intl.NumberFormat().format(price)} </Typography>
            </Grid>
        </Grid>
    </Box>
  )
}
export default ProductInCart
