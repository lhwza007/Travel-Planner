import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import TestProfile from "../assets/testPfp.jpg";
import { useState , useEffect } from "react";
import axios from "axios";

export default function Messages() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const sender_id = userData.user_id; //id เจ้าของแอค


  const location = useLocation();
  const navigate = useNavigate();
  const { receiverData } = location.state;
  console.log("ข้อมูลที่ส่งมา:", receiverData);
  const receiver_id = receiverData.user_id;
  const receiver_name = receiverData.user_firstName + " " + receiverData.user_lastName;

  const [detailMessage,setDetailMessage]=useState([]);

  const fetchData = async()=>{
    try{
      const response = await axios.get("http://localhost:8800/api/getDataMessages/getDetailMessage",{ params: { sender_id: sender_id, receiver_id: receiver_id} });
      console.log("ข้อมูลข้อความ : " ,response.data)
      setDetailMessage(response.data);
      

    }catch(error){
      console.error("Error fetching Messages Data:", error);
    }
  }

  useEffect(()=>{
    fetchData();
  }, []);


  // ฟังชันปุ่มกลับ
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container style={{height:"80vh"}}>
      <Card style={{ width: "100%", backgroundColor: "#D7E7D1", height:"100%" }}>
        {/* Header ส่วนหัวของแชท พร้อมปุ่มย้อนกลับ */}
        <Card.Header
          className="text-white fw-bold py-3 px-4 d-flex align-items-center"
          style={{ backgroundColor: "#A0B98E" }}
        >
          <IoArrowBack
            size={24}
            className="me-3"
            style={{ cursor: "pointer" }}
            onClick={handleGoBack}
          />
          {/* ค่อยเปลีั่ยนเป็นรูปเจ้าของแอคเคาท์ */}
          <img
            src={TestProfile}
            className="me-2"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #688350",
            }}
          />
          {receiver_name}
        </Card.Header>
        
        {/* ส่วนแสดงข้อความ */}
        <div
          className="p-5"
          style={{ height: "100%", overflowY: "auto" }}
        >
          {detailMessage.map((msg) => (
            <div
              key={msg.message_id}
              className={`d-flex mb-3 ${
                msg.sender_id === sender_id
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded-3 ${
                  msg.sender_id === sender_id ? "text-white" : "text-dark"
                }`}
                style={{
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  backgroundColor:
                    msg.sender_id === sender_id ? "#A0B98E" : "#fff",
                }}
              >
                {msg.message_text}
              </div>
            </div>
          ))}
        </div>

        {/* ส่วนสำหรับพิมพ์และส่งข้อความ */}
        <div className="p-3 px-5  border-top">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="พิมพ์ข้อความ..."
              className="rounded-pill me-2"
              style={{ backgroundColor: "#fff" }}
            />
            <Button
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#A0B98E",
                border: "none",
              }}
            >
              <IoIosSend />
            </Button>
          </Form>
        </div>
      </Card>
    </Container>
  );
}
