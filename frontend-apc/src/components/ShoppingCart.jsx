import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from '@mui/material';
import { Context } from '../App';
import ProductInCart from './ProductInCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EmptyShoppingCart from './EmptyShoppingCart';
import Modal from '@mui/material/Modal';
import PurchaseController from '../controller/PurchaseController';


const ShoppingCart = () => {

    const [cartContent, setCartContent] = useContext(Context);

    const existsIdInList = (list, id) => {
      let exists = false;
      list.forEach((element) => {
        exists = exists || (element.id === id);
      });
      return exists;
    }

    const removeRepeatedItems = (list) => {
      let result = [];
      list.forEach((element) => {
          if (!existsIdInList(result, element.id)) {
              result.push(element);
          }
      });
      return result;
    }

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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const finishPurchase = () => {
    let salePrice = 0;
    cartContent.forEach( (element) => {salePrice = salePrice + element.price });
    let productsIds = cartContent.map( (element) => element.id);
    let buyerId = localStorage.getItem('userId');

    PurchaseController.finishPurchase(salePrice, productsIds, buyerId)
    .then((result) => {
      console.log('response: ', result);
      handleClose();
      setCartContent([]);
    })
    .catch(err => {
      console.log('error:', err);
     });
  }


  const modal = () => (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display='grid' justifyItems='center'>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign='center'>
            Finalizaras la operacion y compraras los productos
          </Typography>
          <Box marginTop='1rem'>
            <Button sx={{marginX:'5px', width:'85px'}}variant='outlined' onClick={handleClose}>Atras</Button>
            <Button sx={{marginX:'5px', width:'85px'}} variant='contained' onClick={finishPurchase}>Comprar</Button>
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

            <Typography marginRight='1rem' sx={{color:'white'}}>CARRITO DE COMPRAS</Typography>
          </Box>
          
          {isEmptyCart()? <EmptyShoppingCart/> : removeRepeatedItems(cartContent).map(
            (product) => <ProductInCart key={product.id} product={product}/>
          )}

          {isEmptyCart()? <></> : <Box display='flex' justifyContent='center' marginTop='1rem'>
            <Button variant='contained' onClick={handleOpen}>Finalizar Compra</Button>
          </Box>}
        </Box>
      );
    
      const isEmptyCart = () => {
        return cartContent.length <= 0;
      }



      return (
        
        <Box>
            <IconButton aria-label="cart" onClick={toggleDrawer("right", true)} sx={{marginRight:'1rem'}}>
                <Badge badgeContent={cartContent.length} color="error">
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
               {modal()}
              </Drawer>
            </React.Fragment>
        </Box>
      );
}

export default ShoppingCart;
