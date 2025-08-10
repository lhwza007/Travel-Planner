import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function LoginCard({ switchToRegister }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      // เปลี่ยนเส้นทางไป home
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <Container className="d-flex justify-content-center ">
      <Card
        className="shadow p-3 justify-content-center "
        style={{ width: "980px" }}
      >
        <Card.Body style={{ height: "75vh" }}>
          <Row style={{ height: "100%" }}>
            <Col
              md={7}
              sm={12}
              className="d-none d-md-block d-flex align-items-center justify-content-center "
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/70365/forest-sunbeams-trees-sunlight-70365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "500px",
                borderRadius: "10px",
              }}
            ></Col>
            <Col
              md={5}
              sm={12}
              className="d-flex justify-content-center align-items-center px-5"
            >
              <Form>
                <h1>Login</h1>

                <Form.Group className="mb-3 mt-3 " controlId="formBasicUser">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>
                {err && err}
                <Col>
                  <Button
                    className=" mt-2"
                    onClick={handleLogin}
                    style={{
                      backgroundColor: "#495A3A",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "5px",
                    }}
                  >
                    Sign up
                  </Button>
                  <p>
                    Have an account?
                    <span
                      onClick={switchToRegister}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      register
                    </span>
                  </p>
                </Col>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginCard;
