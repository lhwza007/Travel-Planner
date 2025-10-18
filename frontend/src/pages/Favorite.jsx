import Search from '../components/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PlanPost from '../components/PlanPost';
import MyNav from "../components/Nav.jsx";
export default function Favorite() {
  const [plans, setPlans] = useState([]);
  //--------------------------------------------------------------Search
  const [searchTerm, setSearchTerm] = useState("");
  // ฟังก์ชันกรองข้อมูล
  const filterPlans = (plansData, term) => {
    if (!term.trim()) return plansData; // ถ้าว่าง = แสดงทั้งหมด
    
    return plansData.filter(plan => 
      plan.plan_name?.toLowerCase().includes(term.toLowerCase()) ||
      plan.park_name?.toLowerCase().includes(term.toLowerCase())

    );
  };

  // ฟังก์ชันรับค่าจาก Search Component
  const handleSearchInput = (value) => {
    setSearchTerm(value);
  };
  // แสดงข้อความเมื่อไม่มีผลลัพธ์
  const noResults = plans.length === 0 && searchTerm.trim();
  // console.log(noResults)
//--------------------------------------------------------------

  useEffect(() => {
    axios
      .post("http://localhost:8800/api/favorite/getFavoritePlans", {
        user_id: JSON.parse(localStorage.getItem("user")).user_id
      })
      .then((res) => {
          const allPlans = res.data;
          const filteredPlans = filterPlans(allPlans, searchTerm);//ก่อนที่จะแสดงplan ทั้งหมด เรียกใช้fกรองก่อน
          setPlans(filteredPlans);
        })
      .catch((err) => console.error(err));
  }, [searchTerm]);
  // console.log("plandata",plans);

  return (
    <>
      <MyNav />
      <Search onSearchChange={handleSearchInput}/>

      {noResults?
        (
          <div className="container my-5 text-center">
          <h4>ไม่พบข้อมูล</h4>
          </div>
        ):(
            <>
              {
                plans.map((plan) => (
                  <PlanPost key={plan.plan_id} planData={plan} />
                ))
              }
            </>
          )

      }
      
    </>
  );
}