import React from 'react'
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';

const ButtonsOfProductPost = (props) => {

    const product = props.actualProduct;


    return (
        <CardActions sx={{justifyContent: 'center'}}>
            <Tooltip title="Ver en Mercado Libre">
                <IconButton color="primary" aria-label="go to mercado libre post" href={product.link} sx={{margin: '1rem'}}>
                    <LinkIcon fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Comprar">
                <IconButton color="primary" aria-label="add to shopping cart" sx={{margin: '1rem'}}>
                    <AddShoppingCartIcon fontSize='large'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Agregar a Favoritos">
                <IconButton color="primary" aria-label="add to favorites" sx={{margin: '1rem'}}>
                    <FavoriteIcon fontSize='large'/>
                </IconButton>
            </Tooltip>
        </CardActions>
  )
}

export default ButtonsOfProductPost
