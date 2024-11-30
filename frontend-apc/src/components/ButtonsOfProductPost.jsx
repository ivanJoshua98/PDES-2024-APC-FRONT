import React, { useContext, useEffect, useState } from 'react'
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import { Context } from '../App';
import ShoppingCartController from '../controller/ShoppingCartController';
import UserController from '../controller/UserController';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ButtonsOfProductPost = (props) => {

    const product = props.actualProduct;

    const [shoppingCart, setShoppingCart] = useContext(Context);

    const [isFavorite, setIsFavorite] = useState(false);

    const userId = sessionStorage.getItem('userId');

    useEffect( () => {
        UserController.isFavoriteProduct(product.id).then( response => {
            setIsFavorite(response.data);
        }).catch( error => {
            console.log("Error al verificar si es producto favorito: ", error);
        })
    }, [userId]);

    const getUpdateCartContent = (element) => {
        var mercadoLibreId = element.id;
        var amount = 1;
        var picture = element.pictures[0];
        var link = element.link;
        var title = element.title;
        var categoryId = element.categoryId;
        var price = element.price;
        var condition = element.condition;
        return [{mercadoLibreId, amount, picture, link, title, categoryId, price, condition}];
    };

    const createShoppingCartWithProduct = (newProduct) => {
        ShoppingCartController.createShoppingCart(getUpdateCartContent(newProduct), userId).then( response => {
            setShoppingCart(response.data);
        }).catch( (error) => {
            console.log("Error al crear el carrito de compras: ", error);
        });
    };


    const getProductInCartFromMLId = (anyProduct) => {
        return shoppingCart.productsInCart.find(element => element.mercadoLibreId === anyProduct.id);
    }

    const productExistsInCart = (anyProduct) => {
        return shoppingCart.productsInCart.includes(getProductInCartFromMLId(anyProduct));
    }

    const addProductOneTime = () => {
        if(productExistsInCart(product)){
            ShoppingCartController.addProductOneTime(getProductInCartFromMLId(product).id).then( response => {
                setShoppingCart(response.data);
            }).catch( (error) => {
                console.log("Error al sumar la cantidad del producto: ", error);
            });
        } else {
            ShoppingCartController.addNewProduct(   product.id,
                                                    1,
                                                    product.pictures[0],
                                                    product.link,
                                                    product.title,
                                                    product.categoryId,
                                                    product.price,
                                                    product.condition).then( response => {
                setShoppingCart(response.data);
            }).catch( (error) => {
                console.log("Error al agregar un producto nuevo al carrito: ", error);
            });  
        };
    }


    const addToCart = () => {
        if(shoppingCart.productsInCart.length === 0){
            createShoppingCartWithProduct(product);
        } else {
            addProductOneTime();
        }
    };

    const addToFavorites = () => {
        UserController.addFavoriteProduct(userId, product.id).then( _ => {
            setIsFavorite(true);   
        }).catch( error => {
            console.log("Error al agregar producto a favoritos: ", error);
        });
    };

    const removeToFavorites = () => {
        UserController.removeFavoriteProduct(userId, product.id).then( _ => {
            setIsFavorite(false);
        }).catch( error => {
            console.log("Error al eliminar de favoritos: ", error);
        });
    };


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
            {isFavorite? 
                <Tooltip title="Eliminar de Favoritos">
                    <IconButton color="primary" aria-label="remove to favorites" sx={{margin: '1rem'}}
                                onClick={removeToFavorites}>
                        <FavoriteIcon fontSize='large'/>
                    </IconButton>
                </Tooltip> 
                :
                <Tooltip title="Agregar a Favoritos">
                    <IconButton color="primary" aria-label="add to favorites" sx={{margin: '1rem'}}
                                onClick={addToFavorites}>
                        <FavoriteBorderIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
            }
        </CardActions>
  )
}

export default ButtonsOfProductPost
