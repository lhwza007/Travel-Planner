import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function LoginCard({switchToRegister}) {
  return (
    <Card className="m-5 shadow p-3 mb-5 bg-body rounded ">
      <Card.Body>
        <Row>
          <Col md={6} sm={12}>
            <Form>
              <div className="">
                <h1>Login</h1>
              </div>

              <Row className="g-3">
                {/* md={4} คือแสดง 3 ช่องในหน้าจอขนาดกลางขึ้นไป */}
                {/* sm={12} คือแสดง 1 ช่องเต็มในหน้าจอขนาดเล็ก */}
                <Col md={6} sm={12} className="px-3">
                  <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Enter User" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Col>
              </Row>
              <Col>
                
                <Button
                  type="submit"
                  className="m-1 mt-4"
                  style={{ backgroundColor: "#495A3A", border: "none" }}
                >
                  Submit
                </Button>

                <Button
                  type="submit"
                  className="m-1 mt-4"
                  style={{ backgroundColor: "#495A3A", border: "none" }}
                  onClick={switchToRegister}
                >
                  register ค่อยเปลี่ยนใช้แบบกดtext
                </Button>
              </Col>
            </Form>
          </Col>
          <Col
            md={6}
            sm={12}
            className="d-flex align-items-center justify-content-center "
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/70365/forest-sunbeams-trees-sunlight-70365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "500px",
              borderRadius: "10px",
            }}
          ></Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
