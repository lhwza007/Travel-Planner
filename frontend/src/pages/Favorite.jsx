import Search from '../components/Search';
import FavoriteCard from '../components/FavoriteCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PlanPost from '../components/PlanPost';

export default function Favorite() {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8800/api/favorite/getFavoritePlans", {
        user_id: JSON.parse(localStorage.getItem("user")).user_id
      })
      .then((res) => setPlans(res.data))
      .catch((err) => console.error(err));
  }, []);


  return (
    <>
      <Search />
      {
        plans.map((plan) => (
          <PlanPost key={plan.favorite_id} planData={plan}/>
        ))
      }
    </>
  );
}