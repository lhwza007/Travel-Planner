import { useLocation } from "react-router-dom";

export default function Messages() {
  const location = useLocation();
  const { messages } = location.state;

  return (
    <div>
      <h1>ข้อความจาก {messages.senderName}</h1>
      <p>ID ข้อความ: {messages.messageId}</p>
      <p>ข้อความ: {messages.message}</p>
    </div>
  );
}