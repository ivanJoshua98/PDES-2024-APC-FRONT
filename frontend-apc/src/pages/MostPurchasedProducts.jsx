import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SystemReportController from '../controller/SystemReportController';
import ProductController from '../controller/ProductController';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import LinkIcon from '@mui/icons-material/Link';

const MostPurchasedProducts = () => {

    const navigate = useNavigate();

    const [purchasedProducts, setPurchasedProducts] = useState([]);

    const [timesPurchased, setTimesPurchased] = useState([]);

    const getPurchasedProductsFromML = (idList) => {
        ProductController.getAllProductsById(idList.join()).then( response => {
            setPurchasedProducts(response.data);
        }).catch( error => {
            console.log("Error al cargar los productos de ML: ", error);
        });
    };

    useEffect( () => {
        SystemReportController.getTopFivePurchasedProducts().then( response => {
            var idList = response.data.map(element => element.productId);
            setTimesPurchased(response.data);
            getPurchasedProductsFromML(idList);
        }).catch( error => {
            console.log("Error al obtener los productos comprados: ", error);
        })
    }, []);

    const getTimesPurchased = (product) => {
        var id = product.id;
        var found = timesPurchased.find(element => element.productId === id);
        return found.timesPurchased;
    }

    const listElement = (product, timesPurchased) => (
        <Box display='flex' alignItems='center' padding='1rem' key={product.id} sx={{borderBottom: 'outset'}}>
            <img srcSet={product.pictures[0]}
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
                            onClick={() => navigate('/search-result/product/' + product.id)}>
                            <LinkIcon/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid size={8}>
                    <Typography fontWeight='bold' padding='5px' sx={{border:'1px solid #1976d2',
                                                                     borderRadius: '10px',
                                                                     marginRight:'10px',
                                                                     width: 'fit-content'}}>
                         {timesPurchased > 1 ?  timesPurchased + ' veces comprado' : timesPurchased + ' vez comprado'} 
                    </Typography>
                </Grid>
                <Grid size={4} justifyItems='right'>
                    <Typography>Precio x unidad ${Intl.NumberFormat().format(product.price)} </Typography>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Top 5 - Productos vendidos</Typography>
            </Box>
            <Box sx={{display: 'grid', justifyContent: 'center', alignItems: 'center', marginBottom:'2rem'}}>
                {
                    purchasedProducts.reverse().map(product => (
                        listElement(product, getTimesPurchased(product))    
                    ))
                }
            </Box>
        </Box>
    )
}

export default MostPurchasedProducts
