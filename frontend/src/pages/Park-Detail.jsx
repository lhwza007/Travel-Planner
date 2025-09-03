import React from 'react';
import { useLocation } from 'react-router-dom';
import ParkDetailCard from '../components/ParkDetailCard';
import PlanList from '../components/Plan-list';

export default function ParkDetail() {
  // ใช้ useLocation เพื่อเข้าถึงข้อมูลที่ถูกส่งมาใน state
  const location = useLocation();
  const parkData = location.state.parkData;

  // หากไม่มีข้อมูล ให้แสดงข้อความแจ้งเตือน หรือ redirect กลับ
  if (!parkData) {
    return <div>No park data found.</div>;
  }
  // console.log("Park ID", parkData.id); 
  return (
    <div>
      <ParkDetailCard  data={parkData}/>
      <hr style={{border: "1px solid #495A3A", margin:"40px 0px"}}/>
      <PlanList parkData={parkData}/>
    </div>



  );
}