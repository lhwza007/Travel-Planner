import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoPerson } from "react-icons/io5"; //เดี๋ยวค่อยเปลี่ยนเป็นรูปโปรไฟล์จริง
import { checkAuth } from "../../context/checkAuth"; // Assuming you have an API function to check authentication
import { MdOutlineLogout } from "react-icons/md";

function MyNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  async function verify() {
    const result = await checkAuth();
    setIsAuthenticated(result);
    // console.log("Authentication status:", result);
  }
  verify();

  const handleLogout = async (e) => {
    // Handle logout logic here, e.g., clear user data, redirect to login page
    const res = await axios.post(
      "http://localhost:8800/api/auth/logout",
      {},
      {
        withCredentials: true, // ส่ง cookies ไปด้วย};
      }
    );
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };


  return (
    <>
    
    <Navbar
      expand="lg"
      className="custom-navbar p-3"
      style={{ backgroundColor: "#495A3A",marginBottom:"20px" }}
    >
      <div className="container ">
        <Navbar.Brand href="/">
          <img
            src={logo}
            style={{ width: "100px", height: "auto", marginRight: "10px" }}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />

        <Navbar.Collapse id="basic-navbar-nav" style={{display:"flex",textAlign:"center"}} >
          <Nav className="me-auto " style={{display:"flex",textAlign:"left"}} >
            <Nav.Link as={Link} to="/">
              หน้าหลัก
            </Nav.Link>
            <Nav.Link as={Link} to="/plan">
              วางแผน
            </Nav.Link>
            {
              isAuthenticated && (
                <Nav.Link as={Link} to="/favorite">
                  ถูกใจ
                </Nav.Link>
              )
            }

          </Nav>

          <Nav className="ms-auto">
            {
              isAuthenticated && (
                <Nav.Link as={Link} to="/inbox">
              <FaFacebookMessenger
                style={{ color: "white", fontSize: "2rem" }}
              />
            </Nav.Link>
              )
            }
            {
              isAuthenticated && (
                <Nav.Link as={Link} to={`/profile?user_id=${JSON.parse(localStorage.getItem("user"))?.user_id}`}> 
              <IoPerson style={{ color: "white", fontSize: "2rem" }} />
            </Nav.Link>
              )
            }
            
            
            {isAuthenticated ? (
              <Nav.Link as="button" onClick={handleLogout} >
                <MdOutlineLogout style={{ color: "white", fontSize: "2rem"  }} />
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                ลงชื่อเข้าใช้
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    </>
  );
  
}

export default MyNav;
