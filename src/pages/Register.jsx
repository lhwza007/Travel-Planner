import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register() {
  return (
    <div className="card p-4 px-5 d-flex ">
    <Form>
        
      <h1>Register</h1>
      <div
        className="container mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="box1">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>User </Form.Label>
            <Form.Control type="User" placeholder="Enter User" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicVerifyPassword">
            <Form.Label>VerifyPassword</Form.Label>
            <Form.Control type="Verifypassword" placeholder="VerifyPassword" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>FirstName</Form.Label>
            <Form.Control type="FirstName" placeholder="FirstName" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>LastName</Form.Label>
            <Form.Control type="LastName" placeholder="LastName" />
          </Form.Group>

            <FormGroup>
                <Form.Label>Gender</Form.Label>
                <div className="dasd" style={{display:"flex"}}>
                <Form.Check
                    type="radio"
                    label="Male"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                />
                <Form.Check
                    type="radio"
                    label="Female"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                />

                </div>
            </FormGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>

        <div className="box2">
          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="Age" placeholder="Enter Age" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicIncome">
            <Form.Label>Income</Form.Label>
            <Form.Control type="Income" placeholder="Enter Income" />
          </Form.Group>
            <FormGroup>
                <Form.Label>Your skill level</Form.Label>
                
                <Form.Check
                    type="radio"
                    label="Beginer"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                />
                <Form.Check
                    type="radio"
                    label="Intermediate"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                />
                <Form.Check
                    type="radio"
                    label="Experinced"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                />

                
            </FormGroup>
          
        </div>

        <div className="box3" >
          <img src="https://images.pexels.com/photos/70365/forest-sunbeams-trees-sunlight-70365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Placeholder" style={{ borderRadius: "10px", width:"100%"} }/>
        </div>
      </div>
    </Form>
    </div>
  );
}

export default Register;
