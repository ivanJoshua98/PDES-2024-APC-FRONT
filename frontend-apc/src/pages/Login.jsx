import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { TextField, Snackbar, Alert, Button, Link, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserController from '../controller/UserController';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [showDataError, setShowDataError] = useState(false);

  const [dataError, setDataError] = useState('');

  const [displayError, setDisplayError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const changePasswordValue = (newPasswordEvent) => {
    setShowDataError(false);
    setPassword(newPasswordEvent.target.value);
  }

  const changeEmailValue = (event) => {
    setShowDataError(false);
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    UserController.login(email, password).then((response) => {
      switch (response.status) {
        case 200:
          navigate('/home');
          break;

        case 400:
          handleErrorsBadRequest(response)
          break;

        case 404:
          handleErrorNotFound(response)
          break;

        default:
          handleErrorNetwork();
          console.log('Error al iniciar sesion: ', response)
      }
    });
  };

  const handleErrorNetwork = (error) => {
      setDataError("Hubo un error. Intentelo mas tarde");
      setDisplayError(true)
  }

  const handleErrorsBadRequest = (error) => {
    if(error.response.data.includes("password")){
      setDataError("La contraseña ingresada no es correcta");
      setShowDataError(true);
    }
  }
    
  const handleErrorNotFound = (error) => {
    if(error.response.data.includes("email")){
      setDataError("El correo ingresado no existe");
      setShowDataError(true);
    }
  }

  const passwordField = ({fieldId, label, password}) => (
    <TextField
        required
        fullWidth
        name={fieldId}
        label={label}
        type={showPassword ? 'text' : 'password'}
        id={fieldId}
        autoComplete="new-password"
        value={password}
        onChange={(newPasswordEvent) => changePasswordValue(newPasswordEvent)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                 <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}/>
  );

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>     
        <Box  component="form" noValidate onSubmit={handleSubmit}
            sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, 
            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8}}>
          
          <Box display='flex'>
            <Typography variant="h4" noWrap component="a" id='login-banner'
                      sx={{ mr: 2, fontWeight: 'bold', letterSpacing: '.3rem',
                            textDecoration: 'none', color: '#ffa726'}}>
              APC
            </Typography>
            <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#ffa726', fontSize: 40 }} />
          </Box>

          <TextField  id="outlined-user-email-input"
                      label="Correo electronico"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(newEmailEvent) => changeEmailValue(newEmailEvent)}/>

          {passwordField({fieldId: "password", label: "Contraseña", password: password})}
          {showDataError? <Alert severity="error" id='login-error'>{dataError}</Alert> : <></>}

          <Button color='primary' type="submit" fullWidth variant="contained" id="login-button"
                  sx={{ mt: 3, mb: 2, fontSize: 'x-large', fontWeight: 'bold' }}>
              Iniciar Sesion
          </Button>
          <Box marginBottom={'2em'} textAlign={'center'}>
            <Link href="/sign-up" variant="body2">
              ¿No tienes una cuenta? Registrate
            </Link>
          </Box>
        </Box>
        <Snackbar open={displayError} autoHideDuration={6000} onClose={() => setDisplayError(false)}>
            <Alert
                sx={{ width: '100%' }}
                severity="error"
                onClose={() => setDisplayError(false)}
            > Algo salio mal </Alert>
        </Snackbar>
          
    </Box>
  )
}

export default Login
