import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import TestProfile from "../assets/testPfp.jpg";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MessageCard.css";

export default function MessagesCard() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const sender_id = userData.user_id; //id เจ้าของแอค

  const location = useLocation();
  const navigate = useNavigate();
  const { receiverData } = location.state;
  //   console.log("ข้อมูลที่ส่งมา:", receiverData);

  const receiver_id = receiverData.user_id;
  const receiver_name =
    receiverData.user_firstName + " " + receiverData.user_lastName;

  const [detailMessage, setDetailMessage] = useState([]); //เอาไว้เก็บข้อมูลข้อความจากapi

  // อันพวกนี้ไม่รู้เรื่องว่ะมันเชื่อมโยงกับ useEffect ทั้ง2อัน ด้านล่าง เอาไว้เลื่อนหน้าแชท
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getDataMessages/getDetailMessage",
        { params: { sender_id: sender_id, receiver_id: receiver_id } }
      );
      // console.log("ข้อมูลข้อความ : ", response.data);
      setDetailMessage(response.data);
    } catch (error) {
      console.error("Error fetching Messages Data:", error);
    }
  };

  // ********************************************************************************************
  useEffect(() => {
    fetchData();

    // 3. Polling
    const initialScrollTimeout = setTimeout(() => {
      // 👈 ประกาศตัวแปร
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 10); //หน่วย ms

    // 3. Polling
    const intervalId = setInterval(() => {
      fetchData();
    }, 500);

    // 4. Cleanup function: หยุด Polling และ Timeout
    return () => {
      clearInterval(intervalId);
      clearTimeout(initialScrollTimeout); // 👈 ใช้งานตัวแปร
    };
  }, [sender_id, receiver_id]);
  // ********************************************************************************************

  // ฟังชันปุ่มกลับ
  const handleGoBack = () => {
    navigate(-1);
  };

  //เอาไว้เก็บข้อมูลข้อความที่พิม
  const [dataMessage, setDataMessage] = useState({
    sender_id: sender_id,
    receiver_id: receiver_id,
    message_text: "",
    message_type: 1, // 1 คือ ข้อความ  , 2 คือ share
    share_plan_id: null,
    share_plane_name: null,
    created_at: null
  });

  const handleChange = (e) => {
    setDataMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //   console.log("ข้อมูลข้อความที่พิม:", dataMessage);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (dataMessage.message_text.trim() === "") {
      console.log("Message is empty, preventing send.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8800/api/insertMessage/insertMessage",
        dataMessage
      );

      // รีเฟรชข้อมูลข้อความหลังส่ง
      setDataMessage((prev) => ({ ...prev, message_text: "" }));
      fetchData();
    } catch (error) {
      console.error("Error sending message:", error);
    }
    // console.log("ส่งข้อความ:", dataMessage);
  };

  // ********************************************************************************************
  useEffect(() => {
    const container = messageContainerRef.current;

    // เงื่อนไขสำหรับ "โหลดครั้งแรก"
    if (isInitialLoadRef.current && detailMessage.length > 0) {
      // 1. เลื่อนลงล่างสุดแบบทันที (auto)
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });

      // 2. ตั้งค่า Ref ให้เป็น false เพื่อไม่ให้ทำงานซ้ำอีก
      isInitialLoadRef.current = false;

      // หยุดการทำงานของ useEffect ตัวนี้เลย
      return;
    }

    // Logic Conditional Scroll เดิม (สำหรับข้อความที่เข้ามาใหม่)
    if (container && detailMessage.length > 0) {
      const distanceFromBottom =
        container.scrollHeight - (container.scrollTop + container.clientHeight);
      const threshold = 200;

      if (distanceFromBottom <= threshold) {
        // ใช้ smooth scroll สำหรับข้อความที่เข้ามาใหม่
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [detailMessage]);
  // ********************************************************************************************

  return (
    <Container style={{ height: "80vh" }}>
      <Card
        style={{ width: "100%", backgroundColor: "#D7E7D1", height: "100%" }}
      >
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
          className="p-5 message-container"
          style={{ height: "100%", overflowY: "auto" }}
          ref={messageContainerRef}
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
              {msg.message_type === 1 ? (
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
              ) : (
                <div
                  className={`rounded-3 shadow-sm overflow-hidden`} // เพิ่ม shadow-sm และ overflow-hidden
                  style={{
                    maxWidth: "75%",
                    backgroundColor: "#efededff", // พื้นหลังเป็นสีขาว
                    border: `1px solid ${
                      msg.sender_id === sender_id ? "#A0B98E" : "#D7E7D1" // ขอบสีอ่อนตามผู้ส่ง
                    }`,
                    wordWrap: "break-word",
                  }}
                >
                  {/* 1. ส่วนหัว: "แชร์แผนการเดินทาง" */}
                  <div
                    className="px-3 py-2 fw-bold text-white"
                    style={{ backgroundColor: "#A0B98E" }} // สีธีม
                  >
                    {msg.share_park_name}
                  </div>

                  {/* 2. ส่วนกลาง: ชื่อแผนการเดินทาง */}
                  <div className="p-3">
                    <p className="mb-0 fw-semibold text-dark">
                      {msg.share_plan_name}
                    </p>
                    
                  </div>

                  {/* 3. ส่วนล่าง: ปุ่มกดดู */}
                  <div className="p-3 pt-0">
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100"
                      style={{
                        backgroundColor: "#688350", // สีเขียวเข้มขึ้น
                        border: "none",
                      }}
                    >
                      ดูแผนการเดินทาง
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* ส่วนสำหรับพิมพ์และส่งข้อความ */}
        <div className="p-3 px-5  border-top">
          <Form className="d-flex" onSubmit={handleSendMessage}>
            <Form.Control
              type="text"
              placeholder="พิมพ์ข้อความ..."
              className="rounded-pill me-2"
              style={{ backgroundColor: "#fff" }}
              name="message_text"
              value={dataMessage.message_text}
              onChange={handleChange}
            />
            <Button
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#A0B98E",
                border: "none",
              }}
              type="submit"
            >
              <IoIosSend />
            </Button>
          </Form>
        </div>
      </Card>
    </Container>
  );
}
