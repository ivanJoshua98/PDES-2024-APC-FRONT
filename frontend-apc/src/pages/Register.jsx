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


const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');

  const [showDifferentPasswordError, setShowDifferentPasswordError] = useState(false);

  const [displayError, setDisplayError] = useState(false);

  const samePassword = (password1, password2) => password1 === password2;

  const [showPassword, setShowPassword] = useState(false);

  const [showDataError, setShowDataError] = useState(false);

  const [dataError, setDataError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if(samePassword(password, repeatPassword)) {
      UserController.register(email, password, userName)
      .then((res) => {
        console.log('response:', res);
        navigate('/sign-in');
      })
      .catch((error) => handleErrors(error));
    } else {
        setShowDifferentPasswordError(true);
    }
  }


  const handleErrors = (error) => {
    console.log('error:', error);
    if(error.code === "ERR_NETWORK") {
      setDisplayError(true)
    }
    if(error.code === "ERR_BAD_REQUEST" && error.response.data.hasOwnProperty('password')){
      setDataError(error.response.data.password);
      setShowDataError(true);
    }
    if((error.code === "ERR_BAD_REQUEST") && !(error.response.data.hasOwnProperty('password'))){
      setDataError(error.response.data);
      setShowDataError(true);
    }
  }

  const changeEmailValue = (event) => {
    setShowDataError(false);
    setEmail(event.target.value);
  }

  const changeUserNameValue = (event) => {
    setShowDataError(false);
    setUserName(event.target.value);
  }

  const changePasswordValue = (functionSet, newPasswordEvent) => {
    setShowDifferentPasswordError(false);
    setShowDataError(false);
    functionSet(newPasswordEvent.target.value);
  }

  const passwordField = ({fieldId, label, password, functionSet}) => (
    <TextField
        error={showDifferentPasswordError}
        required
        fullWidth
        name={fieldId}
        label={showDifferentPasswordError ? "Las constraseñas deben ser iguales" : label}
        type={showPassword ? 'text' : 'password'}
        id={fieldId}
        autoComplete="new-password"
        value={password}
        onChange={(newPasswordEvent) => changePasswordValue(functionSet, newPasswordEvent)}
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
            <Typography variant="h4" noWrap component="a" 
                      sx={{ mr: 2, fontWeight: 'bold', letterSpacing: '.3rem',
                            textDecoration: 'none', color: '#1976d2'}}>
              APC
            </Typography>
            <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#1976d2', fontSize: 40 }} />
          </Box>
          

          <TextField  id="outlined-user-email-input"
                      label="Correo electronico"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(newEmailEvent) => changeEmailValue(newEmailEvent)}/>

          <TextField  id="outlined-user-name-input"
                      label="Nombre de usuario"
                      required
                      autoComplete="userName"
                      value={userName}
                      onChange={(newUserNameEvent) => changeUserNameValue(newUserNameEvent)}/>

          {passwordField({fieldId: "password", 
                          label: "Contraseña", 
                          password: password,
                          functionSet: setPassword})}

          {passwordField({fieldId: "repeat-password", 
                          label: "Repetir contraseña", 
                          password: repeatPassword,
                          functionSet: setRepeatPassword})}
              
          <Alert severity="error" sx={{display: showDataError? 'flex' : 'none'}}>{dataError}</Alert>

          <Button color='primary' type="submit" fullWidth variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: 'x-large', fontWeight: 'bold' }}>
              Registrarse
          </Button>
          <Box marginBottom={'2em'} textAlign={'center'}>
            <Link href="/sign-in" variant="body2">
              ¿Ya tienes una cuenta? Inicia sesión
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

export default Register
