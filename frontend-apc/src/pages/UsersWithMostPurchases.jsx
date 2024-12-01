import { Box, Button, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import SystemReportController from '../controller/SystemReportController';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useNavigate } from 'react-router-dom';
import LoadingScreenOptionsSearch from '../components/LoadingScreenOptionsSearch';

const UsersWithMostPurchases = () => {

    const [ranking, setRanking] = useState([]);

    const colorEnabled = '#1976d2';

    const colorDisabled = '#bdbdbd';

    const [colorButton1, setColorButton1] = useState(colorEnabled);

    const [colorButton2, setColorButton2] = useState(colorDisabled);

    const [descriptionText, setDescriptionText] = useState(" compras realizadas");

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect( () => {
        SystemReportController.getUsersWithMostPurchases().then( response => {
            setRanking(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.log("Error al obtener los usuarios con mas compras: ", error);
        })
    }, [])

    const userRow = (user) => (
        <Grid container spacing={2} width='80%' sx={{   padding: '5px',
                                                        margin: '1rem',
                                                        border:'2px solid #1976d2', 
                                                        borderRadius: '10px'}}>
            <Grid size={8} display='flex' justifyContent='left'>
                <Box display='flex' alignItems='center'>
                    <Typography color='primary' fontWeight='bold' margin='1rem'>Nombre de usuario: </Typography>                 
                    <Typography fontWeight='bold' alignContent='center'> {user.userName}</Typography>
                    <Typography color='primary' fontWeight='bold' margin='1rem'>Email:</Typography>
                    <Typography fontWeight='bold' alignContent='center'> {user.email} </Typography> 
                </Box>
            </Grid>
            <Grid size={4} display='flex' justifyContent='right' alignItems='center'>
                <Typography fontWeight='bold' padding='5px' sx={{border:'2px solid #1976d2',
                                                                 borderRadius: '10px',
                                                                 backgroundColor: '#1976d2',
                                                                 color: 'white',
                                                                 marginRight:'10px'}}>
                    {user.purchases_count + descriptionText} 
                </Typography>
                <Button sx={{fontWeight:'bold'}} 
                        onClick={() => navigate('/admin-panel/manage-users/all-purchases/'+ user.userName+ '/' + user.id)}>Ver mas</Button>
            </Grid>
        </Grid>
    );

    const emptyResult = (
        <Box display='grid' justifyItems='center'>
            <SearchOffIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}></SearchOffIcon>
            <Typography color='primary' fontWeight='bold'>No se encontró nigun usuario</Typography>
            <Typography color='primary' fontWeight='bold'>Aun no hay compras realizadas</Typography>
        </Box>
    )

    const orderByProducts = () => {
        SystemReportController.getUsersWithMostPurchasedProducts().then( response => {
            setRanking(response.data);
            setColorButton1(colorDisabled);
            setColorButton2(colorEnabled);
            setDescriptionText(" productos comprados")
        }).catch(error => {
            console.log("Error al obtener los usuarios con mas compras: ", error);
        })
    }

    const orderByShoppingCarts = () => {
        SystemReportController.getUsersWithMostPurchases().then( response => {
            setRanking(response.data);
            setColorButton1(colorEnabled);
            setColorButton2(colorDisabled);
            setDescriptionText(" compras realizadas")
        }).catch(error => {
            console.log("Error al obtener los usuarios con mas compras: ", error);
        })
    }
    
    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Top 5 usuarios con mas compras</Typography>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' width='60%'>
                <Typography color='primary' fontWeight='bold' margin='1rem'>Ordenar por:</Typography>
                <Chip label="Carritos de compras finalizados" sx={{color:'white', margin:'1rem'}}
                        style={{backgroundColor: colorButton1}}
                        onClick={orderByShoppingCarts}/>
                <Chip label="Products comprados" sx={{color:'white', margin:'1rem'}}
                        style={{backgroundColor: colorButton2}}
                        onClick={orderByProducts}/> 
            </Box>
            <Box margin='1rem' sx={{placeItems: 'center'}}>
                {isLoading?
                    <LoadingScreenOptionsSearch />
                    :
                    ranking.length === 0 ?
                       emptyResult
                       :
                       ranking.map(userInTop => userRow(userInTop))
                }
            </Box>
        </Box>
    )

}

export default UsersWithMostPurchases
