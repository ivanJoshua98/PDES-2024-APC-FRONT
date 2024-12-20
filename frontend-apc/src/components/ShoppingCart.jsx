import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from '@mui/material';
import ProductInCart from './ProductInCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EmptyShoppingCart from './EmptyShoppingCart';
import Modal from '@mui/material/Modal';
import ShoppingCartController from '../controller/ShoppingCartController';
import { Context } from '../App';


const ShoppingCart = () => {

    const [shoppingCart, setShoppingCart] = useContext(Context);

    const [hasShoppingCartInprogress, setHasShoppingCartInprogress] = useState(false);
  
    useEffect(() => {
      ShoppingCartController.getShoppingCartInProgress().then( response => {
        switch (response.status) {
          case 404:
            setHasShoppingCartInprogress(false);
            break;
          
          case 200:
            setShoppingCart(response.data);
            setHasShoppingCartInprogress(true);
            break;
          
          default:
            console.log("Error al obtener carrito en progreso: ", response);
        }
      })
    }, [setShoppingCart]);


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });


      const toggleDrawer = (anchor, open) => (event) => {
       if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

//------------------------------------MODAL SETTINGS----------------------------------------------------//
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


  const finishPurchase = () => {
    ShoppingCartController.finishPurchase(shoppingCart.id).then( response => {
      handleCloseModalFinishPurchase();
      setShoppingCart({
        totalAmountPurchase: 0,
        productsInCart: [],
        buyerId: "",
        id: "",
        cartState: ""
      });
    }).catch( (error) => {
      console.log('Error al finalizar carrito de compras:', error);
     });
  };


  const deleteShoppingCart = () => {
    ShoppingCartController.deleteShoppingCart().then( response => {
      handleCloseModalDeleteCart();
      setShoppingCart({
        totalAmountPurchase: 0,
        productsInCart: [],
        buyerId: "",
        id: "",
        cartState: ""
      });
    }).catch( error => {
      console.log("Error al eliminar el carrito: ", error);
    });
  };

  const [openModalFinishPurchase, setOpenModalFinishPurchase] = React.useState(false);

  const handleOpenModalFinishPurchase = () => setOpenModalFinishPurchase(true);

  const handleCloseModalFinishPurchase = () => setOpenModalFinishPurchase(false);

  const modalFinishPurchase = () => (
    <div>
      <Modal
        open={openModalFinishPurchase}
        onClose={handleCloseModalFinishPurchase}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display='grid' justifyItems='center'>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
            Finalizaras la operacion y compraras los productos
          </Typography>
          <Box marginTop='1rem'>
            <Button sx={{marginX:'5px', width:'85px'}}variant='outlined' onClick={handleCloseModalFinishPurchase}>Atras</Button>
            <Button sx={{marginX:'5px', width:'85px'}} variant='contained' onClick={finishPurchase}>Comprar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );


  const [openModalDeleteCart, setOpenModalDeleteCart] = React.useState(false);

  const handleOpenModalDeleteCart = () => setOpenModalDeleteCart(true);

  const handleCloseModalDeleteCart = () => setOpenModalDeleteCart(false);


  const modalDeleteCart = () => (
    <div>
      <Modal
        open={openModalDeleteCart}
        onClose={handleCloseModalDeleteCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display='grid' justifyItems='center'>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
            ¿Seguro que quieres vaciar el carrito?
          </Typography>
          <Box marginTop='1rem'>
            <Button sx={{marginX:'5px', width:'85px'}}variant='outlined' onClick={handleCloseModalDeleteCart}>Atras</Button>
            <Button sx={{marginX:'5px', width:'85px'}} variant='contained' onClick={deleteShoppingCart}>Vaciar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );


//------------------------------------------------------------------------------------------------------// 
    
      const list = (anchor) => (
        <Box  role="presentation"
              onKeyDown={toggleDrawer(anchor, false)}>
          <Box display='flex' alignItems='center' sx={{backgroundColor:'#1976d2'}}>
            <IconButton onClick={toggleDrawer(anchor, false)}>
              <ChevronLeftIcon fontSize='large' sx={{color:'white'}} />
            </IconButton>

            <Typography id='shopping-cart-banner' marginRight='1rem' sx={{color:'white'}}>CARRITO DE COMPRAS</Typography>
          </Box>
          
          {hasShoppingCartInprogress || shoppingCart.productsInCart.length > 0? 
            shoppingCart.productsInCart.map(
              (product) => <ProductInCart key={product.id} product={product} />
            )
            :
            <EmptyShoppingCart/> 
          }

          {hasShoppingCartInprogress || shoppingCart.productsInCart.length > 0?
            <Box display='grid' justifyContent='right' marginRight='1rem'>
              <Typography fontWeight='bold'> Total en el carrito: ${Intl.NumberFormat().format(shoppingCart.totalAmountPurchase)}</Typography>
              <Button variant='text' sx={{justifyContent:'right'}} onClick={handleOpenModalDeleteCart}>Vaciar carrito</Button>
            </Box>
            :
            <></>
          }

          {hasShoppingCartInprogress || shoppingCart.productsInCart.length > 0?
            <Box display='flex' justifyContent='center' marginTop='1rem'>
              <Button variant='contained' onClick={handleOpenModalFinishPurchase}>Finalizar Compra</Button>
            </Box>
            :
            <></>
          }
        </Box>
      );


      const amountProductsInCart = () => {
        var result = 0;
        shoppingCart.productsInCart.forEach(element => {
          result = result + element.amount;
        });
        return result;
      }


      return (
        
        <Box>
            <IconButton id='open-shopping-cart' aria-label="cart" onClick={toggleDrawer("right", true)} sx={{marginRight:'1rem'}}>
                <Badge badgeContent={amountProductsInCart()} color="error">
                    <AddShoppingCartIcon sx={{color:'white'}}/>
                </Badge>
            </IconButton>
            <React.Fragment key={"right"}>
              <Drawer
                anchor="right"
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
               {list("right")}
               {modalFinishPurchase()}
               {modalDeleteCart()}
              </Drawer>
            </React.Fragment>
        </Box>
      );
}

export default ShoppingCart;
