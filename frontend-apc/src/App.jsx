import './App.css';
import Home from './pages/Home';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import SearchResult from './pages/SearchResult';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/sign-in' element={<Login/>} />
        <Route path='/sign-up' element={<Register/>} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home/>} />
          <Route path='/search-result/:keyWords' element={<SearchResult/>} />
          <Route path='/search-result/product/:productId' element={<Product/>} />
        </Route>
      </>
    )
  );


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
