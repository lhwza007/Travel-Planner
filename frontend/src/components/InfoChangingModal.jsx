import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { SweetalertSucc, SweetalertErr } from "./Sweetalert.jsx";

export default function InfoChangingModal (props) {
  const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
  const user_id = userData.user_id;
  const [userInfo, setUserInfo] = useState();
  const [inputs, setInputs] = useState();
  const [isInputChanged, setIsInputChanged] = useState(false);

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:8800/api/getData/userInfo", {
        params: { user_id: user_id },
      })
      .then((res) => {
        setUserInfo(res.data);
        setInputs(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChangeImg = (e) => {
    setSelectedImg(URL.createObjectURL(e.target.files[0]));
  };

  // ฟังก์ชั่นอัพเดตข้อมูล และก็เช็คว่าข้อมูลเปลี่ยนรึเปล่า
  const handleChange = (e) => {
    setInputs((prev) => {
      let value = e.target.value;

      if (e.target.name === "user_age" || e.target.name === "user_income") {
        value = parseInt(value);
      }

      const updatedInputs = {
        ...prev,
        [e.target.name]: value,
      };

      inputCheck(updatedInputs); // ส่งค่า updatedInputs ไปตรวจสอบใน inputCheck
      return updatedInputs;
    });
  };

  // ฟังก์ชั่นเช็คว่าข้อมูลเปลี่ยนไปไหม
  const inputCheck = (updatedInputs) => {
    if (updatedInputs && userInfo) {
      if (JSON.stringify(updatedInputs) !== JSON.stringify(userInfo)) {
        setIsInputChanged(true);
      } else {
        setIsInputChanged(false);
      }
    }
  };

  // ฟังก์ชั่นดึงข้อมูลใหม่มาเก็บใน local storage
  const changeUserData = () => {
    const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
    const user_id = userData.user_id;

    axios
      .get("http://localhost:8800/api/getData/allUserInfo", {
        params: { user_id: user_id },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => console.error(err));
  }

  //ฟังก์ชั่นอัพเดตข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isInputChanged) return; // ถ้าไม่มีการเปลี่ยนแปลงข้อมูล ให้หยุดการทำงานของฟังก์ชั่น

    const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
    const user_id = userData.user_id;

    console.log("user id for update: ", user_id);

    axios
      .patch(`http://localhost:8800/api/updateData/updateUserProfile?user_id=${user_id}`, inputs)
      .then((res) => {
        if (res.data.success) {
          changeUserData();
          SweetalertSucc(res.data.message);
        } else {
          SweetalertErr(res.data.message);
          return;
        }
      })
      .catch((err) => {
        console.error(err)
        SweetalertErr(err);
      });
  };

  // console.log("new inputs: ", inputs);
  // console.log("info from db: ", userInfo);
  // console.log("isInputChanged: ", isInputChanged);

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

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="user_name"
              onChange={handleChange}
              defaultValue={userInfo && userInfo.user_name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="user_firstName"
              onChange={handleChange}
              defaultValue={userInfo && userInfo.user_firstName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="user_lastName"
              onChange={handleChange}
              defaultValue={userInfo && userInfo.user_lastName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="user_email"
              onChange={handleChange}
              defaultValue={userInfo && userInfo.user_email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                label="Male"
                name="user_gender"
                value="Male"
                id="male"
                onChange={handleChange}
                defaultChecked={userInfo && userInfo.user_gender === "Male"} // ตรวจสอบว่าค่า gender ใน userInfo คือ "Male"
              />
              <Form.Check
                type="radio"
                label="Female"
                name="user_gender"
                value="Female"
                id="female"
                onChange={handleChange}
                defaultChecked={userInfo && userInfo.user_gender === "Female"} // ตรวจสอบว่าค่า gender ใน userInfo คือ "Female"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              name="user_age"
              onChange={handleChange}
              defaultValue={userInfo && userInfo.user_age}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicIncome">
            <Form.Label>Income</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Income"
              name="user_income"
              onChange={handleChange}
              defaultValue={userInfo && userInfo.user_income}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your skill level</Form.Label>
            <Form.Check
              type="radio"
              label="Beginner"
              name="user_level"
              id="beginner"
              onChange={handleChange}
              value="Beginner"
              defaultChecked={userInfo && userInfo.user_level === "Beginner"} // ตรวจสอบว่าค่า user_level ใน userInfo คือ "Beginner"
            />
            <Form.Check
              type="radio"
              label="Intermediate"
              name="user_level"
              id="intermediate"
              onChange={handleChange}
              value="Intermediate"
              defaultChecked={
                userInfo && userInfo.user_level === "Intermediate"
              } // ตรวจสอบว่าค่า user_level ใน userInfo คือ "Intermediate"
            />
            <Form.Check
              type="radio"
              label="Experienced"
              name="user_level"
              id="experienced"
              onChange={handleChange}
              value="Experienced"
              defaultChecked={userInfo && userInfo.user_level === "Experienced"} // ตรวจสอบว่าค่า user_level ใน userInfo คือ "Experienced"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" disabled={!isInputChanged} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
