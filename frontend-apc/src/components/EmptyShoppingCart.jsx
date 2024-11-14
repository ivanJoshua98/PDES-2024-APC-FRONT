import { Box, Typography } from '@mui/material'
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const EmptyShoppingCart = () => {
  return (
    <Box display='grid' justifyItems='center'>
        <AddShoppingCartIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}></AddShoppingCartIcon>
        <Typography color='primary' fontWeight='bold'>Tu carrito esta vacio</Typography>
        <Typography color='primary' fontWeight='bold'>¡Agrega productos!</Typography>
    </Box>
  )
}

export default EmptyShoppingCart
