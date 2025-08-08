import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



export default function RegisterCard({switchToLogin}) {
  

  return (
    <Card className=" shadow p-3 mb-5 bg-body rounded">
      <Card.Body>
        <Row>
        <Col md={8} sm={12}>
          <Form>
            
            <h1 className="mb-3">Register</h1>
            <Row className="g-3">
              {/* md={4} คือแสดง 3 ช่องในหน้าจอขนาดกลางขึ้นไป */}
              {/* sm={12} คือแสดง 1 ช่องเต็มในหน้าจอขนาดเล็ก */}
              <Col md={6} sm={12} className="px-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUser">
                  <Form.Label>User</Form.Label>
                  <Form.Control type="text" placeholder="Enter User" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicVerifyPassword"
                >
                  <Form.Label>Verify Password</Form.Label>
                  <Form.Control type="password" placeholder="Verify Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>

                  <div className="d-flex gap-3">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      id="male"
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      id="female"
                    />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6} sm={12} className="px-3">
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" placeholder="Enter Age" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicIncome">
                  <Form.Label>Income</Form.Label>
                  <Form.Control type="text" placeholder="Enter Income" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Your skill level</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Beginner"
                    name="skillLevel"
                    id="beginner"
                  />
                  <Form.Check
                    type="radio"
                    label="Intermediate"
                    name="skillLevel"
                    id="intermediate"
                  />
                  <Form.Check
                    type="radio"
                    label="Experienced"
                    name="skillLevel"
                    id="experienced"
                  />
                </Form.Group>
              </Col>

              {/* <Col
                md={4}
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
              ></Col> */}
            </Row>
            <Button  type="submit" className=" my-2 " style={{backgroundColor:"#495A3A", border:"none"}}>
              Confirm
            </Button>
            <p >
                    Already have an account?
                    <span
                      onClick={switchToLogin}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      Login
                    </span>
                  </p>
            
            
          </Form>
        </Col>
        <Col md={4} sm={12} className="d-none d-md-block d-flex align-items-center justify-content-center  "
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/70365/forest-sunbeams-trees-sunlight-70365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "500px",
                  borderRadius: "10px",
                }}>
        
        
        </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
