import React from "react";
import Nav from "../components/Nav";
import "./Home.css";
import { useState } from "react";
import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";
import search from "../assets/search.svg"
import filter from "../assets/filter.svg"

export default function Home() {
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

  console.log("Home is rendering");

  return (
    <>
      <div className="container mt-4 searchBarContainer">
        Search
        <form action="">
          <input type="text" />
          <input
            type="image"
            src={search}
            alt="Submit"
            style={{ width: "40px" }}
          />
        </form>
        <img src={filter} alt="filter" style={{width: "40px"}}/>
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
