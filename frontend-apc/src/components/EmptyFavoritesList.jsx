import React from 'react'
import { Box, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';


const EmptyFavoritesList = () => {

    return (
    <Box display='grid' justifyItems='center'>
        <FavoriteIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}/>
        <Typography color='primary' fontWeight='bold'>No tienes productos favoritos</Typography>
        <Typography color='primary' fontWeight='bold'>¡Busca productos y márcalos como favoritos!</Typography>
    </Box>
    )
}

export default EmptyFavoritesList;
