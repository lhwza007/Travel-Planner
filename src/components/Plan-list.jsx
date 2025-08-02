import { useState } from "react";
import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";

export default function PlanList({parkData}) {
  // อันนี้คือข้อมูลทดสอบตอนเรียกใช้การ์ดนะ
  //   เพิ่ม parkID นะ
 
  const [data, setData] = useState([
    {
      id: 1,
      name: "Aphidech Phonwen",
      planName: "ไปเขาใหญ่ 5 วัน 4 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
      parkID: 1,
    },
    {
      id: 2,
      name: "John Doe",
      planName: "ไปดอยอินทนนท์ 3 วัน 2 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
      parkID: 2,
    },
    {
      id: 3,
      name: "Jane Smith",
      planName: "ไปอุทยานแห่งชาติภูกระดึง 2 วัน 1 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
      parkID: 3,
    },
    {
      id: 4,
      name: "Alice Johnson",
      planName: "ไปเกาะสิมิลัน 3 วัน 2 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
      parkID: 4,
    },
    {
      id: 5,
      name: "Bob Brown",
      planName: "ไปอุทยานแห่งชาติเขาใหญ่ 2 วัน 1 คืน",
      planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
      budget: 99,
      parkID: 1,
    },
  ]);
  // เพิ่มเงื่อนไขตรวจสอบว่า parkData มีค่าหรือไม่
  if (!parkData) {
    // สามารถ return null หรือแสดง loading message ได้
    return <div>Loading...</div>;
  }
  
  // ใช้ parkData.id ที่ส่งเข้ามาจริง ๆ ในการ filter
  const filteredData = data.filter((item) => item.parkID === parkData.id);

  console.log("Park ID ทดสอบ:", parkData.id);
  return (
    <>
      {filteredData
        .map((item) => (
        console.log(item.parkID),
          <div key={item.id} className="container mt-4 planCard">
            <div className="planCardHeader">
              <div className="profile">
                <img src={personpfp} alt="pfp" style={{ width: "50px" }} />
                <p className="userName">{item.name}</p>
              </div>
            </div>

            <div className="planName">{item.planName}</div>

            <div className="planBudget">
              <img
                src={money}
                alt="budget"
                style={{ width: "30px", marginRight: "10px" }}
              />
              {item.budget}
            </div>

            <div className="planDetails">
              <ul>
                {item.planDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <hr />

            <div className="actionBar">
              <div className="group">
                <img src={star} alt="favorite" />
                Favorite
              </div>
              <div className="group">
                <img src={comment} alt="comment" />
                <img src={share} alt="share" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
