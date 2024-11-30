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
import FavoriteProducts from './pages/FavoriteProducts';
import ProtectedAdminRoutes from './pages/ProtectedAdminRoutes';
import AdminPanel from './pages/AdminPanel';
import ManageUsers from './pages/ManageUsers';
import PurchasesFromOtherUser from './pages/PurchasesFromOtherUser';
import FavoriteProductsFromOtherUser from './pages/FavoriteProductsFromOtherUser';
import SystemReports from './pages/SystemReports';
import UsersWithMostPurchases from './pages/UsersWithMostPurchases';
import TopFiveFavoriteProducts from './pages/TopFiveFavoriteProducts';
import MostPurchasedProducts from './pages/MostPurchasedProducts';


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
          <Route path='favorite-products' element={<FavoriteProducts/>} />
          <Route path="/" element={<ProtectedAdminRoutes />}>
            <Route path='admin-panel' element={<AdminPanel />} />
            <Route path='admin-panel/manage-users' element={<ManageUsers />} />
            <Route path='admin-panel/manage-users/all-purchases/:userName/:userId' element={<PurchasesFromOtherUser/>} />
            <Route path='admin-panel/manage-users/favorite-products/:userName/:userId' element={<FavoriteProductsFromOtherUser />} />
            <Route path='admin-panel/system-reports' element={<SystemReports />} />
            <Route path='admin-panel/system-reports/users-with-most-purchases' element={<UsersWithMostPurchases />} />
            <Route path='admin-panel/system-reports/favorite-products-top-five' element={<TopFiveFavoriteProducts />} />
            <Route path='admin-panel/system-reports/most-purchased-products' element={<MostPurchasedProducts />} />
          </Route>
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
