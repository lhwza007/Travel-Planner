import React from 'react';
import { useLocation } from 'react-router-dom';
import ParkDetailCard from '../components/ParkDetailCard';
import PlanList from '../components/Plan-list';

export default function ParkDetail() {
  // ใช้ useLocation เพื่อเข้าถึงข้อมูลที่ถูกส่งมาใน state
  const location = useLocation();
  const park_id = location.state.park_id;
  // console.log("รับ park_id ผ่าน state:", park_id);
  // หากไม่มีข้อมูล ให้แสดงข้อความแจ้งเตือน หรือ redirect กลับ
  if (!park_id) {
    return <div>No park data found.</div>;
  }
  // console.log("Park ID", park_id.id); 
  return (
    <div>
      <ParkDetailCard  park_id={park_id}/>
      <hr style={{border: "1px solid #495A3A", margin:"40px 0px"}}/>
      <PlanList park_id={park_id}/>
    </div>



  );
}