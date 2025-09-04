import { useState, useEffect } from "react";
import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";
import axios from "axios";

export default function PlanList({ park_id }) {
  const [plans, setPlans] = useState([]);

  // ตรวจสอบค่า parkData ที่ได้รับมา
  // console.log("Park id:", parkData.id);

  useEffect(() => {
    // Fetch plans from the backend API
    axios
      .get("http://localhost:8800/api/getData/plansEachPark", {
        params: { park_id: park_id },
      })
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, []);

  // console.log("Plan data ทดสอบ:", plans);

  return (
    <>
      {plans.map((item) => (
        <div key={item.plan_id} className="container mt-4 planCard">
          <div className="planCardHeader">
            <div className="profile">
              <img src={personpfp} alt="pfp" style={{ width: "50px" }} />
              <p className="user_name">{item.user_name}</p>
            </div>
          </div>

          <div className="plan_name">{item.plan_name}</div>

          <div className="planBudget">
            <img
              src={money}
              alt="budget"
              style={{ width: "30px", marginRight: "10px" }}
            />
            test
          </div>

          <div className="activities">
            <ul>
              {item.activities.map((activity) => (
                <li key={activity.activity_id}>
                  <div className="activityDetails">
                    <div>{activity.activity_name}</div>
                    <div>
                      {activity.activity_start} - {activity.activity_end}
                    </div>
                  </div>
                </li>
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
