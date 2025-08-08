import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ParkDetailCard({ data }) {

  const navigate = useNavigate();

  function handleClick(data) {
    navigate("/planning", { state: { parkData: data } });
  }


  return (
    <Card className="container  mt-4 planCard shadow p-3 mb-3  ">
      <Card.Body>
        <div className="park-detail-card">
          <h1>{data.name}</h1>
          <Row className="mb-3 mt-3">
            <Col md={4} sm={12}>
              <img
                src={"../public/" + data.imgPath}
                className="img-fluid rounded"
                style={{ marginBottom: "10px" }}
              />
            </Col>
            <Col md={4} sm={12}>
              <img
                src={"../public/" + data.imgPath}
                className="img-fluid rounded"
                style={{ marginBottom: "10px" }}
              />
            </Col>
            <Col md={4} sm={12}>
              <img
                src={"../public/" + data.imgPath}
                className="img-fluid rounded"
                style={{ marginBottom: "10px" }}
              />
            </Col>
          </Row>
          <p>
            <LuMapPin /> ที่อยู่: {data.address}
          </p>
          <p>
            <BsTelephone /> เบอร์โทร: {data.tel}
          </p>
          <p>
            <MdOutlineMailOutline /> อีเมล: {data.email}
          </p>
          <div className="d-flex justify-content-end">
            <button className="btn" style={{backgroundColor:"#495A3A", color:"white"}} onClick={()=> handleClick(data)}>เริ่มวางแผน</button>
          </div>
        </div>

    
      </Card.Body>
    </Card>
  );
}
