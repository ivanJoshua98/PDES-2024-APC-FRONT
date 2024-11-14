import React, { useContext } from 'react'
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import { Context } from '../App';

const ButtonsOfProductPost = (props) => {

    const product = props.actualProduct;

    const [cartContent, setCartContent] = useContext(Context);

    const addToCart = () => {
        var data = [];
        data.push(product);
        data = data.concat(cartContent);
        setCartContent(data);
    }


    return (
        <CardActions sx={{justifyContent: 'center'}}>
            <Tooltip title="Ver en Mercado Libre">
                <IconButton color="primary" aria-label="go to mercado libre post" href={product.link} sx={{margin: '1rem'}}>
                    <LinkIcon fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Agregar al carrito">
                <IconButton color="primary" aria-label="add to shopping cart" sx={{margin: '1rem'}}
                            onClick={addToCart}>
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
