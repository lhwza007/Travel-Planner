import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicExample from './components/Nav';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Favorite from './pages/Favorite';
import Register from "./pages/Register";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BasicExample />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div className="card p-4"><h1 className="card-title">404 ไม่พบหน้า</h1></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;