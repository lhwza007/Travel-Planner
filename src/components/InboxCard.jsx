import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5"; //ค่อยเปลีั่ยนเป็นรูปเจ้าของแอคเคาท์
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function InboxCard() {
  const messages = [
    {
      messageId:123,
      senderId: 1,
      senderName: "Mark",
      message: "hello",
      receiverId: 2,
    },
    {
        messageId:124,
      senderId: 2,
      senderName: "fah",
      message: "hi",
      receiverId: 1,
    },
    {
        messageId:125,
      senderId: 3,
      senderName: "Peter",
      message: "how are you?",
      receiverId: 4,
    },
    
  ];
  const navigate = useNavigate();
  function handleCardClick(item) {
    console.log("คลิกๆ", item);
    navigate("/messages", { state: { messages: item } });
  }

  return (
    <>
      <Container className="p-3">
        <Card
          className=""
          style={{ backgroundColor: "#D7E7D1", border: "none" }}
        >
          <div
            className="d-flex align-items-center py-3 px-4"
            style={{
              backgroundColor: "#A0B98E",
              borderBottom: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex align-items-center me-auto">
              <FaFacebookMessenger size={50} style={{ color: "#fff" }} />
            </div>
            <div className="flex-grow-1 mx-3 position-relative">
              <Form>
                <div className="position-relative d-flex align-items-center">
                  <FaUserFriends
                    size={20}
                    className="position-absolute start-0 ms-3"
                    style={{ color: "#888" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="ค้นหาเพื่อน"
                    style={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "20px",
                      paddingLeft: "45px", // เพิ่ม padding ด้านซ้าย
                      paddingRight: "45px", // เพิ่ม padding ด้านขวา
                    }}
                  />
                  <IoSearchOutline
                    size={20}
                    className="position-absolute end-0 me-3"
                    style={{ color: "#888", cursor: "pointer" }}
                  />
                </div>
              </Form>
            </div>
          </div>

          <div
            className="p-3"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {messages.map((message) => (
              <Card
                key={message.messageId}
                className="m-2 shadow-sm mb-3"
                style={{
                  backgroundColor: "#F7F9F6",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div className="d-flex align-items-center p-2 " onClick={() => handleCardClick(message)}>
                  <IoPersonCircleOutline
                    size={50}
                    className="me-2"
                    style={{ color: "#A0B98E" }}
                  />
                  <span className="fw-bold">{message.senderName}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Container>
    </>
  );
}
