import { Container } from "react-bootstrap"
import ProfileCard from "../components/ProfileCard"
import PlanPost from "../components/PlanPost"
export default function Profile() {
    return (
        <>
        <Container>
            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <ProfileCard />
            {/* ส่ง props เป็น id ของเจ้าของโปรไฟล์ */}
            <PlanPost/>
        </Container>
        </>
    )
}