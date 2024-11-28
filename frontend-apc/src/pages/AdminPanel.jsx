import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {

    const navigate = useNavigate();

    const adminPanelOption = (icon, link, textButton) => (
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
                                    fontWeight:'bold'}}>Panel de administrador</Typography>
            </Box>
            <Box margin='1rem' sx={{placeItems: 'center'}}>
                {adminPanelOption(
                    <SupervisorAccountIcon color='primary' sx={{fontSize: '40px', margin:'1rem'}}/>,
                    '/admin-panel/manage-users',
                    "Administración de usuarios"
                )}
                {adminPanelOption(
                    <BarChartIcon color='primary' sx={{fontSize: '40px', margin:'1rem'}}/>,
                    '/system-reports',
                    "Reportes del sistema"
                )}
            </Box>
        </Box>
    )
}

export default AdminPanel
