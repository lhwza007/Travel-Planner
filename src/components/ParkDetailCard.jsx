import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";

export default function ParkDetailCard({ data }) {
  return (
    <Card className="m-5 shadow p-3 mb-5 bg-body rounded">
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
            <button className="btn btn-primary ">เริ่มวางแผน</button>
          </div>
        </div>

    
      </Card.Body>
    </Card>
  );
}
