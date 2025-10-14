import { db } from "../connect.js";

export const InsertParkPlaces = async (req, res) => {
  const park_id = req.body.park_id;
  const parkplace_lat = req.body.parkplace_lat;
  const parkplace_lng = req.body.parkplace_lng;
  const parkplace_name = req.body.parkplace_name;
  const parkplace_description = req.body.parkplace_description;
  const parkplaces_center = JSON.stringify(req.body.parkplaces_center);

  try {
    
    const q =
      "INSERT INTO parkplaces(park_id, parkplace_lat, parkplace_lng, parkplace_name, parkplace_description, parkplaces_center) VALUES(?, ?, ?, ?, ?, ?)";

    await db
      .promise()
      .query(q, [park_id, parkplace_lat, parkplace_lng, parkplace_name, parkplace_description, parkplaces_center]);

    return res.status(200).json(`ParkPlaces has been created.: ${parkplace_name}`); 
  } catch (error) {
    return res.status(500).json({ error: "Insertion error", details: error.message });
  }
};
