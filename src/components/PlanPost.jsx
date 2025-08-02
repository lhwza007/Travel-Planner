import { useState } from "react";
import Form from "react-bootstrap/Form";

import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";


export default function PlanPost() {
  // อันนี้คือข้อมูลทดสอบตอนเรียกใช้การ์ดนะ
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
 

  return (
    <>
      <div className="container mt-4 searchBarContainer">
        <div className="searchGroup">
          SEARCH
          <Form style={{ width: "100%", display: "flex" }}>
            <Form.Group className="w-100" style={{ margin: "0px 10px" }}>
              <Form.Control
                type="text"
                placeholder="Search Here..."
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>
            <input
              type="image"
              src={search}
              alt="Submit"
              style={{ width: "40px" }}
            />
          </Form>
          <img src={filter} alt="filter" style={{ width: "40px" }} />
        </div>
      </div>

      {data.map((item) => (
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
