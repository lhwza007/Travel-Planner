import { Container } from "react-bootstrap"
import ProfileCard from "../components/ProfileCard"
import { useEffect, useState } from "react"
import axios from "axios"
import PlanPost from "../components/PlanPost";
import { useSearchParams } from "react-router-dom";

export default function Profile() {
    const [plans, setPlans] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [searchParams] = useSearchParams();
    const user_id = searchParams.get("user_id");
    const count = plans.length;

    const getPlansByUserId = async () => {
      await axios
          .get("http://localhost:8800/api/getData/plansByUserId", {
            params: { user_id: user_id },
          })
          .then((res) => setPlans(res.data))
          .catch((err) => console.error(err));
    }

    const getUserInfoById = async () => {
      await axios
          .get("http://localhost:8800/api/getData/allUserInfo", {
            params: { user_id: user_id },
          })
          .then((res) => setUserInfo(res.data))
          .catch((err) => console.error(err));
    }

    useEffect(() => {
        getPlansByUserId();
        getUserInfoById();
      }, []);
    
    return (
        <>
        <Container>

            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <ProfileCard propsData={userInfo} propsCount={count} />

            {/* map plans ด้วยการ query ตาม user id */}
            {
              plans.map((plan) => (
                <PlanPost key={plan.plan_id} planData={plan} />
              ))
            }
            
        </Container>
        </>
    )
}