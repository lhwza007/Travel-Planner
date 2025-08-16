import "./PlanningCard.css";
import { Form, Button } from "react-bootstrap";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { format } from "date-fns";

export default function PlanningCard({ parkData }) {
  const [planName, setPlanName] = useState("");
  const [mainActivities, setMainActivities] = useState([]);
  const [planRange, setPlanRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleRangeChange = (selectedDates) => {
    const formatDate1 = format(selectedDates[0], "yyyy-MM-dd");
    const formatDate2 = format(selectedDates[1], "yyyy-MM-dd");
    setPlanRange({ startDate: formatDate1, endDate: formatDate2 });
  };

  const addMainActivity = () => {
    setMainActivities([
      ...mainActivities,
      { id: Date.now(), name: "", startTime: null, endTime: null },
    ]);
  };

  const deleteActivity = (mainActivityId) => {
    setMainActivities(
      mainActivities.filter((activity) => activity.id !== mainActivityId)
    );
  };

  // ฟังก์ชันสำหรับอัปเดตชื่อกิจกรรมหลัก
  const updateMainActivity = (id, value) => {
    setMainActivities(
      mainActivities.map((activity) =>
        activity.id === id ? { ...activity, name: value } : activity
      )
    );
  };

  // ฟังก์ชันสำหรับอัปเดตเวลาใน activity
  const updateActivityTime = (id, field, value) => {
    setMainActivities(
      mainActivities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  // ฟังชั่นสำหรับอัปเดทวันใน activity
  const updateActivityDate = (id, value) => {
    setMainActivities(
      mainActivities.map((activity) =>
        activity.id === id ? { ...activity, date: value } : activity
      )
    );
  }

  console.log(planRange);
  console.log(mainActivities);

  return (
    <div className="planningContainer">
      <h3 className="mb-3">{parkData.name}</h3>
      <div className="form">
        <form action="">
          <Form.Label>ชื่อแผนการท่องเที่ยว</Form.Label>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Form.Control
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={
                "ชื่อแผนการท่องเที่ยว (เช่น " + parkData.name + " 2 วัน 1 คืน)"
              }
              style={{
                borderRadius: "10px",
                width: "80%",
                marginRight: "15px",
              }}
            />
            <Flatpickr
              options={{
                minDate: "today",
                dateFormat: "Y-m-d",
                mode: "range",
              }}
              style={{ width: "20%" }}
              onClose={handleRangeChange}
            />
          </div>

          <div className="activity">
            {mainActivities.map((mainActivity) => (
              <div key={mainActivity.id} className="d-flex my-3">
                <div className="">
                  <GoDotFill
                    style={{
                      width: "38px",
                      height: "38px",
                      marginLeft: "10px",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <div style={{ marginBottom: "5px" }}>
                    <Form.Control
                      type="text"
                      value={mainActivity.name}
                      onChange={(e) =>
                        updateMainActivity(mainActivity.id, e.target.value)
                      }
                      placeholder="ชื่อกิจกรรม (เช่น ดูน้ำตก...)"
                      className="me-2"
                      style={{
                        whiteSpace: "nowrap",
                        borderRadius: "10px",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div style={{}}>
                    <Flatpickr
                      style={{ marginRight: "10px" }}
                      options={{
                        minDate: planRange.startDate,
                        maxDate: planRange.endDate,
                        dateFormat: "Y-m-d",
                      }}
                      onClose={(selectedDates) => {
                        updateActivityDate(
                          mainActivity.id,
                          format(selectedDates[0], "yyyy-MM-dd")
                        );
                      }}
                    />
                    <Flatpickr
                      style={{ width: "60px", margin: "0px 5px" }}
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                        time_24hr: true,
                        minTime: mainActivities[mainActivities.length-2]?.endTime || null,
                      }}
                      onClose={(selectedDates) => {
                        console.log(selectedDates);
                        updateActivityTime(
                          mainActivity.id,
                          "startTime",
                          format(selectedDates[0], "HH:mm")
                        );
                      }}
                    />
                    -
                    <Flatpickr
                      style={{ width: "60px", margin: "0px 5px" }}
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i",
                        time_24hr: true,
                        minTime: mainActivities[mainActivities.length-1]?.startTime || null,
                      }}
                      onClose={(selectedDates) =>
                        updateActivityTime(
                          mainActivity.id,
                          "endTime",
                          format(selectedDates[0], "HH:mm")
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FiMinusCircle
                      onClick={() => deleteActivity(mainActivity.id)}
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        color: "#f55b5b",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

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
