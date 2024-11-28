import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import SellIcon from '@mui/icons-material/Sell';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

const SystemReports = () => {

    const navigate = useNavigate();

    const reportOption = (icon, link, textButton) => (
        <Grid container spacing={2} width='60%' sx={{   padding: '5px',
                                                        margin: '1rem',
                                                        border:'2px solid #1976d2', 
                                                        borderRadius: '10px'}}>
            <Grid size={4} display='flex' justifyContent='left' alignItems='center'>
                {icon}      
            </Grid>
            <Grid size={8} display='flex' justifyContent='right' alignItems='center'>
                <Button sx={{fontWeight:'bold', padding:'5px',
                    border:'2px solid #1976d2', borderRadius: '10px', backgroundColor: '#1976d2',
                    color: 'white',marginRight:'10px' }} onClick={() => navigate(link)}>
                    {textButton}
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Reportes del sistema</Typography>
            </Box>
            <Box margin='1rem' sx={{placeItems: 'center'}}>
                {reportOption(
                    <QueryStatsIcon color='primary' sx={{fontSize: '40px', margin:'1rem'}}/>,
                    '/admin-panel/system-reports/users-with-most-purchases',
                    "Usuarios con mas compras"
                )}
                {reportOption(
                    <StarHalfIcon color='primary' sx={{fontSize: '40px', margin:'1rem'}}/>,
                    '/admin-panel/systemReports/favorite-products-top-five',
                    "Productos favoritos - Top 5"
                )}
                {reportOption(
                    <SellIcon color='primary' sx={{fontSize: '40px', margin:'1rem'}}/>,
                    '/admin-panel/systemReports/most-purchased-products',
                    "Productos mas comprados"
                )}
            </Box>
        </Box>
    )
}

export default SystemReports
