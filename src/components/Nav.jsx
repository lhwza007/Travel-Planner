import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoPerson } from "react-icons/io5"; //เดี๋ยวค่อยเปลี่ยนเป็นรูปโปรไฟล์จริง


function BasicExample() {
  return (
    <Navbar
      expand="lg"
      className="custom-navbar p-3"
      style={{ backgroundColor: "#495A3A" }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            style={{ width: "100px", height: "auto", marginRight: "10px" }}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/plan">
              Plan
            </Nav.Link>
            <Nav.Link as={Link} to="/favorite">
              Favorite
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/inbox">
              <FaFacebookMessenger
                style={{ color: "white", fontSize: "2rem" }}
              />
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              <IoPerson style={{ color: "white", fontSize: "2rem" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
