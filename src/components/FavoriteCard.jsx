 import personpfp from "../assets/personTest.svg"; {/* icon คน */}
import money from "../assets/money.svg"; {/* icon เงิน */}
import star from "../assets/star.svg"; {/* icon ดาว */}
import { LuMapPinned } from "react-icons/lu";{/* icon ตำแหน่ง  เอามาจากReact-icon*/}
import {use, useState} from 'react';



export default function FavoriteCard() {
    // อันนี้คือข้อมูลทดสอบตอนเรียกใช้การ์ดนะ
      const [data, setData] = useState([
        {
          id: 1,
          name: "Aphidech Phonwen",
          planName: "testtesttesttest",
          planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
          budget: 99,
        },
        {
          id: 2,
          name: "John Doe",
          planName: "testtesttesttest",
          planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
          budget: 99,
        },
        {
          id: 3,
          name: "Jane Smith",
          planName: "testtesttesttest",
          planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
          budget: 99,
        },
        {
          id: 4,
          name: "Alice Johnson",
          planName: "testtesttesttest",
          planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
          budget: 99,
        },
        {
          id: 5,
          name: "Bob Brown",
          planName: "testtesttesttest",
          planDetails: ["ไป a", "ไป b", "ไป c", "ไป d"],
          budget: 99,
        },
      ]);

    return(
        <>
           {data.map((item) => (
                   <div key={item.id} className="container mt-4 planCard">
                     <div className="planCardHeader d-flex align-items-center">
                        <LuMapPinned className="mapIcon" style={{ width: "100px" }}/>
                        <p className="userName">{item.name}</p>
                        <img src={star} alt="favorite"  />
                       
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
           
                   </div>
                 ))}
        </>
    )
}