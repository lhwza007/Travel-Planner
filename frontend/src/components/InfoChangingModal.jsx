import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function InfoChangingModal(props) {
  const [inputs, setInput] = useState({
    email: null,
    username: null,
    first_name: null,
    last_name: null,
    age: null,
    income: null,
    skill_level: null,
  });

  // Preview image logic from youtube
  const [selectedImg, setSelectedImg] = useState();
  const handleChangeImg = (e) => {
    setSelectedImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    setInput((prev) => {
      let value = e.target.value;

      if (e.target.name === "age" || e.target.name === "income") {
        value = parseInt(value);
      }

      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  console.log(inputs);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change your info...
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <div
              className="profile-img"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "200px",
                height: "200px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedImg && (
                <img
                  src={selectedImg}
                  alt="Preview image"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              )}
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChangeImg}
              />
            </Form.Group>
          </div>

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
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleChange}
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
              type="number"
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success">Save</Button>
          <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
