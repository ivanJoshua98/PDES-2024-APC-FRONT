import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import UserController from '../controller/UserController';
import ShoppingCartController from '../controller/ShoppingCartController';
import { useNavigate } from 'react-router-dom';


const SearchedUser = (props) => {

    const user = props.user;

    const [isAdmin, setIsAdmin] = useState(false);

    const [favoriteProductsIds, setFavoriteProductsIds] = useState([]);

    const [purchases, setPurchases] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        UserController.isAdmin(user.id).then( response => {
            setIsAdmin(response.data);
        }). catch(error => {
            console.log("Error al verificar si es admin: ", error);
        });
        UserController.getAllFavoriteProductsByUser(user.id).then( response => {
            setFavoriteProductsIds(response.data);
        }).catch(error => {
            console.log("Error al obtener los productos favoritos: ", error);
        })
        ShoppingCartController.getAllPurchasesByUser(user.id).then(response => {
            setPurchases(response.data);
        }).catch(error => {
            console.log("Error al obtener las compras: ", error);
        })
    }, [user]);


//------------------------------------MODAL SETTINGS--------------------------------------------------------------------------------------------
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

//--------------------------------MODAL CONFIRM ADD ADMIN --------------------------------------------------------------------------------------
    const [openModalAdd, setOpenModalAdd] = React.useState(false);

    const handleOpenModalAdd = () => setOpenModalAdd(true);

    const handleCloseModalAdd = () => setOpenModalAdd(false);

    const modalConfirmAdd = () => (
        <Modal  open={openModalAdd}
                onClose={handleCloseModalAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
            <Box sx={style} display='grid' justifyItems='center'>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
                    Se incluira a {user.userName} como administrador
                </Typography>
                <Box marginTop='1rem'>
                    <Button sx={{marginX:'5px', width:'85px'}}variant='outlined' onClick={handleCloseModalAdd}>Atras</Button>
                    <Button sx={{marginX:'5px', width:'85px'}} variant='contained' onClick={setUserToAdmin}>Confimar</Button>
                </Box>
            </Box>
        </Modal>
    );

    const setUserToAdmin = () => {
        UserController.addAdminRoleToUser(user.id).then( _ => {
            setIsAdmin(true)
        }).catch( error => {
            console.log("Error al agregar rol de admin: ", error);
        });
        handleCloseModalAdd();
    };
//-------------------------------MODAL CONFIRM REMOVE ADMIN---------------------------------------------------------------------------------------   

    const [openModalRemove, setOpenModalRemove] = React.useState(false);

    const handleOpenModalRemove = () => setOpenModalRemove(true);

    const handleCloseModalRemove = () => setOpenModalRemove(false);

    const modalConfirmRemove = () => (
        <Modal  open={openModalRemove}
                onClose={handleCloseModalRemove}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
            <Box sx={style} display='grid' justifyItems='center'>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
                    Se removera a {user.userName} como administrador
                </Typography>
                <Box marginTop='1rem'>
                    <Button sx={{marginX:'5px', width:'85px'}}variant='outlined' onClick={handleCloseModalRemove}>Atras</Button>
                    <Button sx={{marginX:'5px', width:'85px'}} variant='contained' onClick={removeAdminRoleToUser}>Confimar</Button>
                </Box>
            </Box>
        </Modal>
    );

    const removeAdminRoleToUser = () => {
        UserController.removeAdminRoleToUser(user.id).then( _ => {
            setIsAdmin(false)
        }).catch( error => {
            console.log("Error al quitar rol de admin: ", error);
        });
        handleCloseModalRemove();
    };


//----------------------------------------------------------------------------------------------------------------------------------------------

    const rowWithButton = (textKey, textValue, button) => (
        <Grid container spacing={2} sx={{ margin:'2rem'}}>
            <Grid size={6} display='flex' justifyContent='left' alignItems='center'>       
                <Box display='flex'>
                    <Typography fontWeight='bold' sx={{color:'#1976d2'}}>{textKey}</Typography> 
                    <Typography>{textValue}</Typography>
                </Box>
            </Grid>
            <Grid size={6} display='flex' justifyContent='right' alignItems='center'>
                {button}
            </Grid>
        </Grid>
    );

    return (
        <Box margin='1rem' textAlign='left'>
            {rowWithButton(
                "Nombre de usuario",
                ": " + user.userName,
                <></>
            )}
            {rowWithButton(
                "Correo de usuario",
                ": " + user.email,
                <></>
            )}
            {rowWithButton(
                "Es administrador",
                isAdmin? ": SI" : ": NO",
                isAdmin? 
                    <Button style={{fontWeight:'bold', textTransform:'none'}}
                            onClick={handleOpenModalRemove}
                            variant='outlined'>
                        Remover como administrador
                    </Button>
                    :
                    <Button style={{fontWeight:'bold', textTransform:'none'}}
                            onClick={handleOpenModalAdd}
                            variant='outlined'>
                        Agregar como administrador
                    </Button>
            )}
            {rowWithButton(
                "Productos favoritos",
                ": " + favoriteProductsIds.length,
                <Button style={{fontWeight:'bold', textTransform:'none'}}
                        onClick={() => navigate('/admin-panel/manage-users/favorite-products/'+ user.userName+ '/' + user.id)}
                        variant='outlined'>
                    Ver productos favoritos
                </Button>
            )}
            {rowWithButton(
                "Compras realizadas",
                ": " + purchases.length,
                <Button style={{fontWeight:'bold', textTransform:'none'}}
                        onClick={() => navigate('/admin-panel/manage-users/all-purchases/'+ user.userName+ '/' + user.id)}
                        variant='outlined'>
                    Ver compras realizadas
                </Button>
            )}
            {modalConfirmAdd()}
            {modalConfirmRemove()}
        </Box>
    )
}

export default SearchedUser
