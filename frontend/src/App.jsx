import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicExample from "./components/Nav";
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import Favorite from "./pages/Favorite";
import ParkDetail from "./pages/Park-Detail";
import Planning from "./pages/Planning.jsx";
import Profile from "./pages/Profile.jsx";
import Inbox from "./pages/Inbox.jsx";
import Messages from "./pages/Messages.jsx";
import Login from "./pages/Login.jsx";
import "./App.css";
import Quotes from "./Quotes.jsx";
import { AuthContextProvider } from "../context/authContext.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <BasicExample />
          <div className="container mt-4">
            <Routes>
              {/* Plubic */}
              <Route path="/" element={<Home />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/park-detail" element={<ParkDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              

              {/* Private */}
              <Route path="/favorite" element={
                <PrivateRoute>
                  <Favorite />
                </PrivateRoute>
                } />
              
              <Route path="/planning" element={
                <PrivateRoute>
                  <Planning />
                </PrivateRoute> 
              }/>


              <Route path="/profile" element={
                <PrivateRoute>
                <Profile />
                </PrivateRoute>
                } />


              <Route path="/inbox" element={
                <PrivateRoute>
                <Inbox />
                </PrivateRoute>
                } />

              <Route path="/messages" element={
                <PrivateRoute>
                <Messages />
                </PrivateRoute>
                } />

              
              {/* <Route path="/test" element={<Quotes />} /> */}

              
              <Route
                path="*"
                element={
                  <div className="card p-4">
                    <h1 className="card-title">404 ไม่พบหน้า</h1>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
