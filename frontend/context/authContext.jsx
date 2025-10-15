import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); // สร้าง Context สำหรับจัดการข้อมูล Authentication

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null// เริ่มต้นสถานะผู้ใช้จาก localStorage หรือ null ถ้าไม่มี
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login", // เรียก API login
      inputs, // ส่งข้อมูล inputs (username, password)
      { withCredentials: true } // อนุญาตการส่ง cookie หรือ credentials
    );
    setCurrentUser(res.data); // อัปเดตผู้ใช้จากข้อมูลที่ได้จาก API
  };

  useEffect(() => {
    if(currentUser){
      localStorage.setItem("user", JSON.stringify(currentUser)); // บันทึกผู้ใช้ลง localStorage เมื่อเปลี่ยนแปลง
    }
    
  }, [currentUser]); // ทำงานเมื่อ currentUser เปลี่ยน

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {/* ส่ง currentUser และ login ไปให้ component ลูกใช้งาน */}
      {children} 
    </AuthContext.Provider>
  );
};


