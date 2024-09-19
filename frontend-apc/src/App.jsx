import './App.css';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom"
import SearchResult from './pages/SearchResult';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
         {/* <Route path="/" element={<Home/>} />
                <Route path='/search-result/:keyWords' element={<SearchResult/>} */}
         <Route path="/home" element={<Home/>} />
         <Route path='/search-result/:keyWords' element={<SearchResult/>} />
         <Route path="/" element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;
