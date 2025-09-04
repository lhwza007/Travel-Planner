import { Container } from "react-bootstrap"
import ProfileCard from "../components/ProfileCard"
import ProfilePlanPost from "../components/ProfilePlanPost"
import {useLocation} from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
export default function Profile() {
    const [plans, setPlans] = useState([]);
    const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
    const count = plans.length;

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
        <Container>

            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <ProfileCard propsData={userData} propsCount={count} />

            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <ProfilePlanPost  propsPlans={plans}/>
            
        </Container>
        </>
    )
}