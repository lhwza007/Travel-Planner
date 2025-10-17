import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { SweetalertSucc, SweetalertErr, SweetalertErrNoReload } from "./Sweetalert.jsx";

export default function UploadPfpModal(props) {
  const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
  const user_id = userData.user_id;
  const [selectedImg, setSelectedImg] = useState();
  const [selectedImgFile, setSelectedImgFile] = useState(null);

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file)); // สำหรับ preview
      setSelectedImgFile(file); // สำหรับอัปโหลดจริง
    }
  };

  const handleSubmit = async () => {
    if (!selectedImgFile) {
      SweetalertErrNoReload("กรุณาเลือกรูปก่อนอัปโหลด");
      return;
    }

    const formData = new FormData();
    formData.append("pfp", selectedImgFile); // key ต้องตรงกับ multer.single("pfp")
    formData.append("user_id", user_id);

    try {
      const res = await axios.post(
        "http://localhost:8800/api/upload/uploadImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      SweetalertSucc("อัปโหลดรูปสำเร็จ!");
      props.onHide(); // ปิด modal
    } catch (err) {
      console.error(err);
      SweetalertErrNoReload("อัปโหลดไม่สำเร็จ");
    }
  };

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
            Change your profile picture...
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
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
