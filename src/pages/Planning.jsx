import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./Planning.css";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

export default function Planning() {
  // State สำหรับชื่อแผนการท่องเที่ยวและรายละเอียด
  const [planName, setPlanName] = useState("");
  // State สำหรับกิจกรรมหลัก (array ของ objects ที่มี id และ name)
  const [mainActivities, setMainActivities] = useState([]);

  // เพิ่มกิจกรรมหลัก
  const addMainActivity = () => {
    setMainActivities([...mainActivities, { id: Date.now(), name: "" }]);
  };

  // ลบกิจกรรมหลัก
  const deleteActivity = (mainActivityId) => {
    setMainActivities(
      mainActivities.filter((activity) => activity.id !== mainActivityId)
    );
  };

  // อัปเดตชื่อกิจกรรมหลัก
  const updateMainActivity = (id, value) => {
    setMainActivities(
      mainActivities.map((activity) =>
        activity.id === id ? { ...activity, name: value } : activity
      )
    );
  };

  return (
    <>
      <Container>
        <div className="planningContainer">
          <h3 className="mb-3">ชื่ออุทยาน</h3>
          <div className="form">
            <form action="">
              {/* ฟอร์มชื่อแผนการท่องเที่ยว */}
              <Form.Group className="mb-3">
                <Form.Label>ชื่อแผนการท่องเที่ยว</Form.Label>
                <Form.Control
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="ชื่อแผนการท่องเที่ยว (เช่น เขาใหญ่ 2 วัน 1 คืน)"
                  style={{ borderRadius:"10px"}}
                />
              </Form.Group>

              <div className="activity">
                {mainActivities.map((mainActivity) => (
                  <div
                    key={mainActivity.id}
                    className="d-flex align-items-center mb-2"
                  >
                    <GoDotFill style={{ width: "30px", height: "30px", marginLeft:"10px" }}/>
                    <Form.Control
                      type="text"
                      value={mainActivity.name}
                      onChange={(e) =>
                        updateMainActivity(mainActivity.id, e.target.value)
                      }
                      placeholder="ชื่อกิจกรรม (เช่น ดูน้ำตก...)"
                      className="me-2"
                      style={{ whiteSpace: "nowrap", borderRadius:"10px" }} // ป้องกันการขึ้นบรรทัดใหม่
                    />
                    <FiMinusCircle
                      onClick={() => deleteActivity(mainActivity.id)}
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                ))}
              </div>
              {/* ปุ่มเพิ่มกิจกรรมหลัก */}
              <div className="addDel">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <FiPlusCircle
                    onClick={addMainActivity}
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "0px auto",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom:"10px" }}>
                  เพิ่มกิจกรรม
                </div>
              </div>
              <div className="submitBtn">
                <Button variant="success">
                  วางแผน
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
