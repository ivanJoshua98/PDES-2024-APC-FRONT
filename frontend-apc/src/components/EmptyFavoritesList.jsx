import React from 'react'
import { Box, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';


const EmptyFavoritesList = (props) => {

    const textTitle = props.textTitle;

    const textBody = props.textBody;

    return (
    <Box display='grid' justifyItems='center'>
        <FavoriteIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}/>
        <Typography color='primary' fontWeight='bold'>{textTitle}</Typography>
        <Typography color='primary' fontWeight='bold'>{textBody}</Typography>
    </Box>
    )
}

export default EmptyFavoritesList;
