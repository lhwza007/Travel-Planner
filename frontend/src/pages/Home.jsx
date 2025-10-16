import PlanPost from "../components/PlanPost";
import Search from "../components/Search"
import axios from "axios";
import { useEffect, useState } from "react";
import MyNav from "../components/Nav.jsx";

export default function Home() {

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/getData/plans")
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <MyNav />
      <Search/>
      {
        plans.map((plan) => (
          <PlanPost key={plan.plan_id} planData={plan} />
        ))
      }
    </>
  );
}
