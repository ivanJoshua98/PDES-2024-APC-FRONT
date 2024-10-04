import './App.css';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom"
import SearchResult from './pages/SearchResult';
import Product from './pages/Product';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/search-result/:keyWords' element={<SearchResult/>} />
        <Route path='/search-result/product/:productId' element={<Product/>} />
      </Routes>
      
    </div>
  );
}

export default App;
