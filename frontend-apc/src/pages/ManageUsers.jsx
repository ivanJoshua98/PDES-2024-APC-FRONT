import { Box, Typography } from '@mui/material'
import React from 'react'
import UserSearcher from '../components/UserSearcher'

const ManageUsers = () => {
    return (
        <Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <Typography sx={{   color:'#1976d2', 
                                    fontSize: '40px',
                                    fontWeight:'bold'}}>Administracion de usuarios</Typography>
            </Box>
            <Box display='flex' justifyContent='center' margin='1rem'>
                <UserSearcher />
            </Box>
        </Box>
    )
}

export default ManageUsers
