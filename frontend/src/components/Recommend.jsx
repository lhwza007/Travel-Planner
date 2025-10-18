import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Recommend.css";
import ParkDetail from "../pages/Park-Detail";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { DotLoader} from "react-spinners";
// import { Box } from '@mui/material';


export default function Recommend() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user")); //ดึงข้อมูลจาก local storage เป็น object
  // console.log(userData);
  // console.log("user_level:", userData.user_level);
  // console.log("user_age:", userData.user_age);

  const [parkData, setParkData] = useState([]);
  const[wait,setWait]=useState(true);


  const stored = localStorage.getItem("dataLLM");

  const fetchData = async () => {
    // console.log("ข้อมูลของตัวแปร stored:",stored);
    if(stored ){
      setWait(false);
      try{
        const response = await axios.get(
          "http://localhost:8800/api/recommend/recommendBylocalstorage",{ params: { list_park_id:stored} }
        );
        setParkData(response.data);
      }catch(error){
        console.error("Error fetching park data:", error);
      }

    }else{
      try {
        const response = await axios.get(
          "http://localhost:8800/api/recommend/recommendByLLM",{ params: { user_level: userData.user_level ,user_age:userData.user_age} }
        );
        setParkData(response.data);
        

        
        console.log("เกียมข้อมูล:", response.data);
        const parkIds = Array.isArray(response.data) ? response.data.map(p => p.park_id) : [];
        localStorage.setItem("dataLLM", JSON.stringify(parkIds)); 
        console.log("park_id from LLM:",parkIds);


        setWait(false);
      } catch (error) {
        console.error("Error fetching park data:", error);
      }
    }


  };

  useEffect(() => {
      fetchData();
    }, [wait]);

  // console.log(parkData);


  function handleCardClick(park_id) {
    // console.log("Card Clicked! Navigating with data:", park);
    navigate("/park-detail", { state: { park_id: park_id } });
  }

  return (
    <>
      <Container>
        {wait?(
          <div className="d-flex mb-3" >
          <h5>โปรดรอ ระบบกำลังสร้างคำแนะนำให้คุณ </h5> &nbsp;&nbsp;&nbsp;&nbsp;<DotLoader color="#495A3A" size={30} />
          </div>
        ):(
          <div className="mb-3">
          <h5>คำแนะนำสำหรับคุณด้วย AI...</h5>
          </div>
        )

        }
        <div className="head">{wait}</div>
        <Row>
          {parkData.map((park) => (
            
            <Col md={3} sm={6} key={park.park_id}>
              <div
                className="recommendCard"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,0,0,0) 0%, rgba(255,0,0,0) 60%, rgba(0, 0, 0, 1)), url('/park_image/${park.parkImg_src}')`,
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(park.park_id)}
              >
                <div className="cardDetails">
                  <div style={{ marginRight: "10px" }}>{park.park_name}</div>
                  <div style={{ whiteSpace: "nowrap" }}>
                    {park.plan_count} {park.plan_count > 1 ? "Plans" : "Plan"}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <hr style={{ marginBottom: "30px" }} />
      </Container>
    </>
  );
}
