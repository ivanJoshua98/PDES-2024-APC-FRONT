import { Box, Typography } from '@mui/material'
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const EmptyShoppingCart = () => {
  return (
    <Box display='grid' justifyItems='center' id='empty-shopping-cart'>
        <AddShoppingCartIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}></AddShoppingCartIcon>
        <Typography color='primary' fontWeight='bold' id='empty-shpcar-alert-1'>Tu carrito está vacío</Typography>
        <Typography color='primary' fontWeight='bold' id='empty-shpcar-alert-2'>¡Agrega productos!</Typography>
    </Box>
  )
}

export default EmptyShoppingCart
