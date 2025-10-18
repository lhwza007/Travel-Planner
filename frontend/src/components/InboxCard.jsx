import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { FaFacebookMessenger } from "react-icons/fa";

import { FaUserFriends } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TestProfile from "../assets/testPfp.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function mInboxCard() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_id = userData.user_id;
  const [listName,setListName]=useState([]);
  

  const fetchData = async()=>{
    try{
      const response = await axios.get("http://localhost:8800/api/getDataMessages/listName",{ params: { user_id: user_id} });
      setListName(response.data);
    }catch(error){
      console.error("Error fetching List name in inbox:", error);
    }

  }

  useEffect(()=>{
    fetchData();
  },[]);
  
  
  const navigate = useNavigate();
  function handleCardClick(item) {
    // console.log("คลิกๆ", item);
    navigate("/messages", { state: { receiverData: item } });
  }

  return (
    <>
      <Container >
        <Card style={{ backgroundColor: "#D7E7D1", borderRadius:"10px" ,border:"none" }}>
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
            {listName.map((item) => (
              <Card
                key={item.user_id}
                className="m-3 shadow-sm mb-3"
                style={{
                  backgroundColor: "#F7F9F6",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  className="d-flex align-items-center p-2 "
                  onClick={() => handleCardClick(item)}
                >
                  {/* ค่อยเปลีั่ยนเป็นรูปเจ้าของแอคเคาท์ */}
                  <img
                    src={`http://localhost:8800/uploads/${item.user_pfp}`}
                    className="me-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "2px solid #688350",
                    }}
                  />

                  <span className="fw-bold">{item.user_firstName}  {item.user_lastName}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Container>
    </>
  );
}
