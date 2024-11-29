import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserController from '../controller/UserController';
import SearchedUser from './SearchedUser';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const UserSearcher = () => {

    const [keyWords, setKeyWords] = useState(""); 

    const [user, setUser] = useState({});

    const [responseStatus, setResponseStatus] = useState(0);

    const [showResult, setShowResult] = useState(false);
    
    const handleSubmit = () => {
        setResponseStatus(0);
        UserController.getUserByEmailOrUserName(keyWords).then( response => {
            setUser(response.data);
            setShowResult(true);
            console.log("Respuesta de la busqueda: ", response.data);
        }).catch( error => {
            if(error.status === 404){
                setResponseStatus(error.status);
                setShowResult(true);
            } else {
                console.log("Error al buscar el usuario: ", error);
            }
        });
    };    


    const emptyResult = (
        <Box display='grid' justifyItems='center'>
            <SearchOffIcon color='primary' sx={{fontSize:'40px', marginY:'2rem' }}></SearchOffIcon>
            <Typography color='primary' fontWeight='bold'>No se encontró al usuario</Typography>
            <Typography color='primary' fontWeight='bold'>Prueba con otro mail o nombre de usuario</Typography>
        </Box>
    )

    return (
        <Box component="form" noValidate sx={{ width:'100%', textAlign:'center'}} >
            <TextField  id="user-searcher" variant="outlined" 
                        placeholder='Busca por email o nombre de usuario'
                        sx={{width:'30%'}}
                        onChange={(event) => setKeyWords(event.target.value)}
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleSubmit}>  
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                              ),
                            },
                        }}>
            </TextField>
            <Box width='80%' justifySelf='center'>
                {showResult ? 
                    (responseStatus === 404 ?
                    emptyResult
                    :
                    <SearchedUser user={user}/>)
                :
                <></>    
                }
            </Box>
        </Box>
    )
}

export default UserSearcher
