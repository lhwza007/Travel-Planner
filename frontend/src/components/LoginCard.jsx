import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function LoginCard({ switchToRegister }) {
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
                  <Form.Label>User</Form.Label>
                  <Form.Control type="text" placeholder="Enter User" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Col>
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

                  <Button
                    type="submit"
                    className=" mt-2"
                    style={{
                      backgroundColor: "#495A3A",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Sign up
                  </Button>
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
