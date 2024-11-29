import React from 'react'
import { Box, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const EmptyPurchasesList = (props) => {

    const textTitle = props.textTitle;

    const textBody = props.textBody;

    return (
        <Box display='grid' justifyItems='center'>
            <AddShoppingCartIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}></AddShoppingCartIcon>
            <Typography color='primary' fontWeight='bold'>{textTitle}</Typography>
            <Typography color='primary' fontWeight='bold'>{textBody}</Typography>
        </Box>
      )
}

export default EmptyPurchasesList
