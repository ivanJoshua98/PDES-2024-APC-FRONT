import './App.css';
import Home from './pages/Home';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import ShoppingCartDetails from './pages/ShoppingCartDetails';
import ProtectedRoutes from './pages/ProtectedRoutes';
import SearchedProductsList from './pages/SearchedProductsList';
import { createContext, useState } from 'react';
import Purchases from './pages/Purchases';


export const Context = createContext();

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/sign-in' element={<Login/>} />
        <Route path='/sign-up' element={<Register/>} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="home" element={<Home/>} />
          <Route path='search-result/:keyWords' element={<SearchedProductsList/>} />
          <Route path='search-result/product/:productId' element={<Product/>} />
          <Route path='all-purchases' element={<Purchases/>} />
          <Route path='all-purchases/shopping-cart/:cartId' element={<ShoppingCartDetails/>} />
        </Route>
      </>
    )
  );

  const [shoppingCart, setShoppingCart] = useState({
    totalAmountPurchase: 0,
    productsInCart: [],
    buyerId: "",
    id: "",
    cartState: ""
  });


  return (
    <Context.Provider value={[shoppingCart, setShoppingCart]}>
      <RouterProvider router={router}/>
    </Context.Provider>
    
  );
}

export default App;
