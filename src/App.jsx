import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicExample from './components/Nav';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Favorite from './pages/Favorite';
import Register from "./pages/Register";
import ParkDetail from './pages/Park-Detail';
import Planning from './pages/Planning.jsx'
import Profile from './pages/Profile.jsx'
import Inbox from './pages/Inbox.jsx'
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
            <Route path="/park-detail" element={<ParkDetail />} />
            <Route path="/planning" element={<Planning />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/inbox" element={<Inbox />}/>
            <Route path="*" element={<div className="card p-4"><h1 className="card-title">404 ไม่พบหน้า</h1></div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;