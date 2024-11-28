import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import SystemReportController from '../controller/SystemReportController';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const UsersWithMostPurchases = () => {

    const [ranking, setRanking] = useState([]);

    useEffect( () => {
        SystemReportController.getUsersWithMostPurchases().then( response => {
            setRanking(response.data);
        }).catch(error => {
            console.log("Error al obtener los usuarios con mas compras: ", error);
        })
    }, [])

    const userRow = (user) => (
        <Grid container spacing={2} width='80%' sx={{   padding: '5px',
                                                        margin: '1rem',
                                                        border:'2px solid #1976d2', 
                                                        borderRadius: '10px'}}>
            <Grid size={8} display='flex' justifyContent='left' alignItems='center'>
                <Box display='flex'>
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
                    {user.purchases_count} compras realizadas
                 </Typography>
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
    
    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Top 5 usuarios con mas compras</Typography>
            </Box>
            <Box margin='1rem' sx={{placeItems: 'center'}}>
                {ranking.length === 0 ?
                    emptyResult
                    :
                    ranking.map(userInTop => userRow(userInTop))
                }
            </Box>
        </Box>
    )

}

export default UsersWithMostPurchases
