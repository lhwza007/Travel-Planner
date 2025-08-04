import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import TestProfile from "../assets/testPfp.jpg";

export default function Messages() {
  const location = useLocation();
  const navigate = useNavigate();
  const { messages } = location.state;

  // สมมติว่าผู้ใช้คนปัจจุบันมี senderID คือ messages.senderID
  const currentUserId = messages.senderID;

  // ตัวอย่างข้อมูลในแชทว่าคุยไรกันบ้าง
  const detailMessage = [
    {
      detailMessageId: 1,
      senderId: currentUserId, // ผู้ส่งคือผู้ใช้ปัจจุบัน
      receiverId: messages.receiverId,
      message: "สวัสดีครับ",
      timestamp: "2025-08-01T10:00:00",
    },
    {
      detailMessageId: 2,
      senderId: messages.receiverId, // ผู้ส่งคืออีกฝ่าย
      receiverId: currentUserId,
      message: "ว่าไงครับ",
      timestamp: "2025-08-01T10:00:10",
    },
    {
      detailMessageId: 3,
      senderId: currentUserId,
      receiverId: messages.receiverId,
      message: "ทานข้าวยังครับ",
      timestamp: "2025-08-01T10:01:00",
    },
    {
      detailMessageId: 4,
      senderId: messages.receiverId,
      receiverId: currentUserId,
      message: "เรียบร้อยแล้วครับ",
      timestamp: "2025-08-01T10:01:30",
    },
  ];

  // ฟังชันปุ่มกลับ
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container >
      <Card style={{ width: "100%", backgroundColor: "#D7E7D1" }}>
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
          {messages.receiverName}
        </Card.Header>

        {/* ส่วนแสดงข้อความ */}
        <div
          className="p-5"
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
        >
          {detailMessage.map((msg) => (
            <div
              key={msg.detailMessageId}
              className={`d-flex mb-3 ${
                msg.senderId === currentUserId
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded-3 ${
                  msg.senderId === currentUserId ? "text-white" : "text-dark"
                }`}
                style={{
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  backgroundColor:
                    msg.senderId === currentUserId ? "#A0B98E" : "#fff",
                }}
              >
                {msg.message}
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
