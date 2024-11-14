import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searcher from './Searcher';
import {useNavigate} from "react-router-dom";
import ShoppingCart from './ShoppingCart';

function Navbar(props) {

  const [cantProductsInCart, setCantProductsInCart] = React.useState(0);

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const {window} = props;

  const path = window !== undefined ? window().location.href : "";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseSesion = () => {
    handleCloseUserMenu();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/sign-in');
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingCartIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem key='Inicio' onClick={() => navigate('/home')}>
                  <Typography sx={{ textAlign: 'center' }}>Inicio</Typography>
              </MenuItem>
              <MenuItem key='Favoritos' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Favoritos</Typography>
              </MenuItem>
              <MenuItem key='Compras' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Compras</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button key='Inicio'
                    onClick={() => navigate('/home')}
                    sx={{ my: 2, color: 'white', display: 'block' }}> Inicio </Button>
            <Button key='Favoritos'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}> Favoritos </Button>
            <Button key='Compras'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}> Compras </Button>
          </Box>

          <Box sx={{width:'70%', display:'flex', justifyContent:'right', alignItems:'center', marginBottom:'1rem', marginTop:'1rem'}}>
              {path.includes("/home")? <></> : <Searcher/>}
          </Box>

          <Box sx={{ flexGrow: 0, display:'flex' }}>
            
            <ShoppingCart cantProducts={cantProductsInCart} />

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key="mi-perfil" onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Mi perfil</Typography>
                </MenuItem>
                <MenuItem key="ajustes" onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Ajustes</Typography>
                </MenuItem>
                <MenuItem key="cerrar-sesion" onClick={handleCloseSesion}>
                  <Typography sx={{ textAlign: 'center' }}>Cerrar sesión</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;