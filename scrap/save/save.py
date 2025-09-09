import json
import mysql.connector

def save_to_db():
    # 1. อ่านไฟล์ parks.json
    with open("../parks.json", "r", encoding="utf-8") as f:
        parks = json.load(f)

    # 2. สร้างการเชื่อมต่อ MySQL
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="northtrek"
    )
    cursor = db.cursor()

    # 3. SQL template
    sql = """
        INSERT INTO parks
        (park_name, park_phone, park_location, park_email, park_activity, park_biome, park_animal, park_fee)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    # 4. loop insert
    for item in parks:
        cursor.execute(sql, (
            item.get("park_name"),
            item.get("park_phone"),
            item.get("park_location"),
            item.get("park_email"),
            item.get("park_activity"),
            item.get("park_biome"),
            item.get("park_animal"),
            item.get("park_fee"),
        ))

    # 5. commit + close
    db.commit()
    cursor.close()
    db.close()

if __name__ == "__main__":
    save_to_db()
