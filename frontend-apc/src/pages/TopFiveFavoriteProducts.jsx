import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SystemReportController from '../controller/SystemReportController';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import LinkIcon from '@mui/icons-material/Link';
import LoadingScreenOptionsSearch from '../components/LoadingScreenOptionsSearch';

const TopFiveFavoriteProducts = () => {

    const navigate = useNavigate();

    const [favoriteProducts, setFavoriteProducts] = useState([]);

    useEffect( () => {
        SystemReportController.getTopFiveFavoriteProducts().then( response => {
            setFavoriteProducts(response.data);
        }).catch( error => {
            console.log("Error al obtener los productos favoritos: ", error);
        })
    }, []);

    const listElement = (product) => (
        <Box display='flex' alignItems='center' padding='1rem' key={product.productId} sx={{borderBottom: 'outset'}}>
            <img srcSet={product.picture}
                         src={product.picture}  
                         alt='product image'
                         loading="lazy" 
                         width='75px' 
                         height='75px'
                         style={{objectFit: 'scale-down', margin:'5px', alignSelf:'end'}}/>
            <Grid container spacing={2} width='100%'>
                <Grid size={8} display='flex' alignSelf='end'>
                    <Typography > {product.title} </Typography>
                </Grid>
                <Grid size={4} justifyItems='right'>
                    <Tooltip title="Ver detalles">
                        <IconButton color="primary" aria-label="go to mercado libre post"  sx={{float: 'inline-end'}}
                            onClick={() => navigate('/search-result/product/' + product.productId)}>
                            <LinkIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid size={8}>
                    <Typography fontWeight='bold' padding='5px' sx={{border:'1px solid #1976d2',
                                                                     borderRadius: '10px',
                                                                     marginRight:'10px',
                                                                     width: 'fit-content'}}>
                         {product.timesChosenFavorite > 1 ?  product.timesChosenFavorite + ' veces marcado como favorito' : product.timesChosenFavorite + ' vez marcado como favorito'} 
                    </Typography>
                </Grid>
                <Grid size={4} justifyItems='right'>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box sx={{placeItems:'center'}}>
            <Box margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Top 5 - Productos Favoritos</Typography>
            </Box>
            <Box sx={{marginBottom:'2rem', width:'90%'}}>
                {favoriteProducts.length === 0 ? 
                    <LoadingScreenOptionsSearch />
                    :
                    favoriteProducts.map(product => listElement(product))
                }
            </Box>
        </Box>
    )
}

export default TopFiveFavoriteProducts
