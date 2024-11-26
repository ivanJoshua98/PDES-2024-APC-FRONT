import React from 'react'
import { Box, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const EmptyPurchasesList = () => {

    return (
        <Box display='grid' justifyItems='center'>
            <AddShoppingCartIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}></AddShoppingCartIcon>
            <Typography color='primary' fontWeight='bold'>No tienes compras realizadas</Typography>
            <Typography color='primary' fontWeight='bold'>¡Busca productos y agrégalos al carrito!</Typography>
        </Box>
      )
}

export default EmptyPurchasesList
