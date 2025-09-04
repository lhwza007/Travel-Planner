import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import personpfp from "../assets/personTest.svg";
import money from "../assets/money.svg";
import comment from "../assets/comment.svg";
import star from "../assets/star.svg";
import share from "../assets/share.svg";
import "./PlanPost.css";
import axios from "axios";


export default function ProfilePlanPost({props}) {

  const userData = props; //รับ props มา

  const [plans, setPlans] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/getData/plansByUserId", {
        params: { user_id: userData.user_id },
      })
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));

    
  }, []);

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
