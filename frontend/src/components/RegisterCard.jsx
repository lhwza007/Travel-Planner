import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {SweetalertSucc,SweetalertErr} from '../components/Sweetalert'

export default function RegisterCard({ switchToLogin }) {
  const navigate = useNavigate();

  const [inputs, setInput] = useState({
    email: "",
    username: "",
    password: "",
    verify_password: "",
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    income: "",
    skill_level: "",
  });
  const isButtonDisabled =
    !inputs.email ||
    !inputs.username ||
    !inputs.password ||
    !inputs.verify_password ||
    !inputs.first_name ||
    !inputs.last_name ||
    !inputs.gender ||
    !inputs.age ||
    !inputs.income ||
    !inputs.skill_level ||
    inputs.password !== inputs.verify_password;

  const [passwordError, setPasswordError] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "verify_password") {
      if (inputs.password !== e.target.value) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
  };
  console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      const msg = "successfully";
      SweetalertSucc(msg)
      switchToLogin();

    } catch (err) {
      setErr(err.response.data);
      SweetalertErr(err.response.data)
      
    }
  };

  console.log(err);

  return (
    <Card className=" shadow p-3 mb-5 bg-body rounded">
      <Card.Body>
        <Row>
          <Col md={8} sm={12}>
            <Form onSubmit={handleClick}>
              <h1 className="mb-3">Register</h1>
              <Row className="g-3">
                {/* md={4} คือแสดง 3 ช่องในหน้าจอขนาดกลางขึ้นไป */}
                {/* sm={12} คือแสดง 1 ช่องเต็มในหน้าจอขนาดเล็ก */}
                <Col md={6} sm={12} className="px-3">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter User"
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
                      isInvalid={!!passwordError}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicVerifyPassword"
                  >
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Verify Password"
                      name="verify_password"
                      onChange={handleChange}
                      isInvalid={!!passwordError}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>

                    <div className="d-flex gap-3">
                      <Form.Check
                        type="radio"
                        label="Male"
                        name="gender"
                        value="Male"
                        id="male"
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Female"
                        name="gender"
                        value="Female"
                        id="female"
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="px-3">
                  <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Age"
                      name="age"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicIncome">
                    <Form.Label>Income</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Income"
                      name="income"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Your skill level</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Beginner"
                      name="skill_level"
                      id="beginner"
                      onChange={handleChange}
                      value="Beginner"
                    />
                    <Form.Check
                      type="radio"
                      label="Intermediate"
                      name="skill_level"
                      id="intermediate"
                      onChange={handleChange}
                      value="Intermediate"
                    />
                    <Form.Check
                      type="radio"
                      label="Experienced"
                      name="skill_level"
                      id="experienced"
                      onChange={handleChange}
                      value="Experienced"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                disabled={isButtonDisabled}
                type="submit"
                className=" my-2 "
                style={{ backgroundColor: "#495A3A", border: "none" }}
              >
                Confirm
              </Button>
              <p>
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
          <Col
            md={4}
            sm={12}
            className="d-none d-md-block d-flex align-items-center justify-content-center  "
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
