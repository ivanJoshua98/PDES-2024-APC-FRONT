import './App.css';
import Home from './pages/Home';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoutes from './pages/ProtectedRoutes';
import SearchedProductsList from './pages/SearchedProductsList';
import { createContext, useState } from 'react';


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
        </Route>
      </>
    )
  );

  const [cartContent, setCartContent] = useState([]);


  return (
    <Context.Provider value={[cartContent, setCartContent]}>
      <RouterProvider router={router}/>
    </Context.Provider>
    
  );
}

export default App;
