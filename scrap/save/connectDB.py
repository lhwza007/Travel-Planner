#pip install mysql-connector-python
import mysql.connector

# สร้างการเชื่อมต่อ
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="northtrek"
)

# สร้าง cursor สำหรับ query
cursor = db.cursor()

# ทดลอง query
cursor.execute("SELECT DATABASE();")
print("Connected to:", cursor.fetchone()[0])

# ปิดการเชื่อมต่อ
cursor.close()
db.close()
