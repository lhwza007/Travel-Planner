import "./PlanningCard.css";
import { Form, Button } from "react-bootstrap";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { format } from "date-fns";

export default function PlanningCard({ parkData }) {
  // State สำหรับชื่อแผนการท่องเที่ยวและรายละเอียด
  const [planName, setPlanName] = useState("");
  // State สำหรับกิจกรรมหลัก (array ของ objects ที่มี id และ name)
  const [mainActivities, setMainActivities] = useState([]);
  const [planRange, setPlanRange] = useState({startDate: null, endDate: null});

  const handleRangeChange = (instance) => {
    const formatDate1 = format(instance[0], "yyyy-MM-dd")
    const formatDate2 = format(instance[1], "yyyy-MM-dd")
    setPlanRange({startDate: formatDate1, endDate: formatDate2});
  };

  console.log(planRange);

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
    <div className="planningContainer">
      <h3 className="mb-3">{parkData.name}</h3>
      <div className="form">
        <form action="">
          <Form.Label>ชื่อแผนการท่องเที่ยว</Form.Label>
          <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            {/* ฟอร์มชื่อแผนการท่องเที่ยว */}
            <Form.Control
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={
                "ชื่อแผนการท่องเที่ยว (เช่น " + parkData.name + " 2 วัน 1 คืน)"
              }
              style={{ borderRadius: "10px", width: "80%" }}
            />
            <Flatpickr
              options={{
                minDate: "today",
                dateFormat: "Y-m-d",
                mode: "range",
                time_24hr: true,
                enableSeconds: true,
              }}
              style={{ width: "20%" }}
              onClose={handleRangeChange}
            />
          </div>

          <div className="activity">
            {mainActivities.map((mainActivity) => (
              <div
                key={mainActivity.id}
                className="d-flex align-items-center mb-2"
              >
                <GoDotFill
                  style={{ width: "30px", height: "30px", marginLeft: "10px" }}
                />
                <Form.Control
                  type="text"
                  value={mainActivity.name}
                  onChange={(e) =>
                    updateMainActivity(mainActivity.id, e.target.value)
                  }
                  placeholder="ชื่อกิจกรรม (เช่น ดูน้ำตก...)"
                  className="me-2"
                  style={{ whiteSpace: "nowrap", borderRadius: "10px" }}
                />
                <Flatpickr
                  options={{
                    mode: "range",
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                    minDate: planRange.startDate,
                    maxDate: planRange.endDate,
                  }}
                />
                <FiMinusCircle
                  onClick={() => deleteActivity(mainActivity.id)}
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              เพิ่มกิจกรรม
            </div>
          </div>
          <div className="submitBtn">
            <Button variant="success">วางแผน</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
