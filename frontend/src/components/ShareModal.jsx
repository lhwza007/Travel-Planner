import React, { use } from "react";
import { Modal, Button ,ListGroup, Spinner, Alert} from "react-bootstrap"; // นำเข้า Modal และ Button
import { useState, useEffect } from "react";
import axios from "axios";
import {SweetalertSucc} from "./Sweetalert.jsx";



export default function ShareModal({ show, onHide, shareData }) {
  const [data, setData] = useState({
    sender_id: shareData.sender_id || "",
    receiver_id: null,
    message_type: 2, // 2 = share
    share_plan_id: shareData.share_plan_id || "",
    share_plan_name: shareData.share_plan_name || "",
    share_park_name: shareData.share_park_name || "",
  });

  const [listName, setListName] = useState([]);

  console.log("ข้อมูลที่จะส่งไป insert:", shareData);

  const fecthListName = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/getDataMessages/listName",{ params: { user_id: data.sender_id} }
      );
      setListName(response.data);
      console.log("รายชื่อผู้รับ:", response.data);

    } catch (error) {
      console.error("Error fetching name list for share:", error);
    }
  };
    const handleShare = async (receiver_id) => {

    //เพราะในฟังชั่นนี้ data.receiver_id มันเป็น null เลยต้องสร้าง payload ใหม่
    const payload = {
        ...data,
        receiver_id: receiver_id,
    };

    try {
        await axios.post(
        "http://localhost:8800/api/insertmessage/insertmessageshare",
        payload
        );
        SweetalertSucc("แชร์แผนการเดินทางเรียบร้อย");
    } catch (error) {
        console.log("Error sharing plan:", error);
    }
    };

  useEffect(() => {
    if (show) {
      
      fecthListName(); // ดึงข้อมูลรายชื่อผู้รับ
    }
  }, [show]);

 

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className="mb-0">แชร์ : {data.share_plan_name}</h5>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
         <ListGroup>
        {listName.length > 0 ? (
            listName.map((listName) => (
                <ListGroup.Item 
                    key={listName.user_id} 
                    className="d-flex justify-content-between align-items-center"
                >
                    
                    <span className="fw-bold" style={{color:"black"}}>
                        {listName.user_firstName} {listName.user_lastName}
                    </span>
                    
                    {/* ปุ่มแชร์ */}
                    <Button 
                        variant="outline-success" 
                        size="sm" 
                        onClick={() => handleShare(listName.user_id)}
                    >
                        แชร์
                    </Button>
                </ListGroup.Item>
            ))
        ) : (
            // แสดงข้อความเมื่อไม่มีรายชื่อ
            <ListGroup.Item className="text-center text-muted">
                ไม่มีผู้ติดต่อ
            </ListGroup.Item>
        )}
    </ListGroup>

</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          ปิด
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
}

