
import { db } from './connectDB.js'
import fs from "fs/promises";   // ใช้อ่านไฟล์ json

async function saveToDB() {

    //อ่านไฟล์ parks.json
    const data = await fs.readFile("parks.json", "utf-8");

    //แปลงเป็น object
    const parks = JSON.parse(data);
    // console.log(parks);


    parks.forEach(async (item) => {

      const sql = `
        INSERT INTO parks 
        (park_name, park_phone, park_location, park_email, park_activity, park_biome, park_animal, park_fee)
        VALUES (?,?,?,?,?,?,?,?) `
      ;

      await db.query(sql,[
        item.park_name,
        item.park_phone,
        item.park_location,
        item.park_email,
        item.park_activity,
        null,
        null,
        null
      ]);
    });

    await db.end();

}


saveToDB();




