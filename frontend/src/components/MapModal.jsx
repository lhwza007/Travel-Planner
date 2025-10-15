import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ShowMapForSelect from "./MapForSelect.jsx";

export default function MapModal(props) {
  const [selectedPlace, setSelectedPlace] = useState(null); // state เก็บค่าที่เลือก

  // ฟังก์ชันรับค่าจาก ShowMap
  const handleSelectPlace = (place) => {
    console.log("Selected marker:", place);
    setSelectedPlace(place);
  };

  const handleConfirm = () => {
    if (selectedPlace && props.onSelectPlace) {
      // ส่งกลับไปยัง PlanningCard
      props.onSelectPlace(props.activityId, selectedPlace);
      props.onHide();
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select location...
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ShowMapForSelect park_id={props.park_id} onSelectPlace={handleSelectPlace} />
        </Modal.Body>

        <Modal.Footer>
          <div style={{ marginRight: "auto" }}>
            {selectedPlace ? (
              <div>
                <strong>เลือก: {selectedPlace.parkplace_name}</strong>
              </div>
            ) : (
              <div style={{ color: "gray" }}>ยังไม่ได้เลือกจุด</div>
            )}
          </div>

          <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              if (selectedPlace) {
                handleConfirm();
                console.log("Selected:", selectedPlace);
              }
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
