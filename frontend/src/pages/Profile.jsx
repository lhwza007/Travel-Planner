import { Container } from "react-bootstrap"
import ProfileCard from "../components/ProfileCard"
import ProfilePlanPost from "../components/ProfilePlanPost"
import {useLocation} from 'react-router-dom'
export default function Profile() {

    const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
    // console.log(userData.user_id);
    
    return (
        <>
        <Container>

            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <ProfileCard propsData={userData} />

            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <ProfilePlanPost  props={userData} />
            
        </Container>
        </>
    )
}