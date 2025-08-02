import personpfp from "../assets/personTest.svg";
{
  /* icon คน */
}
import money from "../assets/money.svg";
{
  /* icon เงิน */
}
import { LuMapPinned } from "react-icons/lu";
{
  /* icon ตำแหน่ง  เอามาจากReact-icon*/
}
import { IoIosStar } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";

export default function FavoriteCard() {
  // อันนี้คือข้อมูลทดสอบตอนเรียกใช้การ์ดนะ
  const [data, setData] = useState([
    {
      id: 1,
      name: "Aphidech Phonwen",
      planName: "ดอยหลวงเชียงดาว 2 วัน 1 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
    },
    {
      id: 2,
      name: "John Doe",
      planName: "ดอยอินทนนท์ 3 วัน 2 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
    },
    {
      id: 3,
      name: "Jane Smith",
      planName: "อุทยานแห่งชาติแม่ปิง 2 วัน 1 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
    },
    {
      id: 4,
      name: "Alice Johnson",
      planName: "อุทยานแห่งชาติห้วยน้ำดัง 4 วัน 3 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
    },
    {
      id: 5,
      name: "Bob Brown",
      planName: "อุทยานแห่งชาติแม่แจ่ม 2 วัน 1 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
    },
  ]);

  return (
    <>
      {data.map((item) => (
        <div key={item.id} className="container  mt-4 planCard shadow p-3 mb-3  ">
          <div className="planCardHeader d-flex align-items-center justify-content-between">
            <LuMapPinned className="mapIcon" size={"50px"} color="#A9A9A9" />
            <p className="userName">{item.planName}</p>
            <IoIosStar
              className="starIcon"
              size={"30px"}
              color="#F0D883"
              stroke="black"
              strokeWidth="10"
            />
          </div>

          <div className="planBudget">
            <img
              src={money}
              alt="budget"
              style={{ width: "30px", marginRight: "10px" }}
            />
            {item.budget}
          </div>
          <div className="profile d-flex align-items-center justify-content-between">
            <div className="prof ileDetails d-flex align-items-center">
            <img src={personpfp} alt="pfp" style={{ width: "30px" }} />
            <p className="userName">{item.name}</p>
            </div>
            
            <IoEyeSharp className="eyeIcon" size={"20px"} color="#A9A9A9"/>
          </div>
        </div>
      ))}
    </>
  );
}
