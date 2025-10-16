import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import PlanningCard from '../components/PlanningCard'
import MyNav from "../components/Nav.jsx";

export default function Planning() {

  // ใช้ useLocation เพื่อเข้าถึงข้อมูลที่ถูกส่งมาใน state
  const location = useLocation();
  const parkData = location.state.parkData;

  // หากไม่มีข้อมูล ให้แสดงข้อความแจ้งเตือน หรือ redirect กลับ
  if (!parkData) {
    return <div>No park data found.</div>;
  }

  return (
    <>
      <MyNav />
      <Container>
        <PlanningCard parkData = {parkData}/>
      </Container>
    </>
  );
}
