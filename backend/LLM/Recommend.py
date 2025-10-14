# pip install pdfplumber mysql-connector-python google-genai python-dotenv pydantic
import pdfplumber
import mysql.connector
from dotenv import load_dotenv
from google import genai
import os
from pydantic import BaseModel
from google.genai import types
import json
import sys


def Recommend(user_level,user_age):
    parks = [] #เก็บ id และ name ของอุทยาน กำหนดไว้ก่อนให้มันเป็นโกลบ้อล

    # ดึงค่าบริการจาก PDF ------------------------------------------------
    base_dir = os.path.dirname(__file__)
    pdf_path = os.path.join(base_dir, "form-cb.pdf")
    all_text = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            all_text.append(text)

    case_text = "\n".join(all_text) # plain text ของ PDF Case Base



    # เชื่อมต่อฐานข้อมูล ---------------------------------------
    try:
        connection = mysql.connector.connect(
            host="localhost",       # หรือ 127.0.0.1
            user="root",            # user DB ของคุณ
            password="root",        # password DB ของคุณ
            database="northtrek"    # ชื่อ DB ของคุณ
        )

        cursor = connection.cursor()

    # Query ข้อมูล park_id, park_name -----------------------------
        cursor.execute("SELECT park_id, park_name FROM parks")

        rows = cursor.fetchall()

        
        for row in rows:
            park_id, park_name = row
            parks.append({
                "park_id": park_id,
                "park_name": park_name
            })
    
        
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
    import sys
    sys.stderr.write(f"DEBUG: Parks data before LLM: {parks}\n")

    # LLM -------------------------------------------------
    load_dotenv()
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    class List(BaseModel):
        list_park_id: str

    response = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=f"""
                    คุณเป็นผู้แนะนำอุทยานที่เหมาะสมที่สุดให้กับนักท่องเที่ยวและไม่แนะนำแบบมั่ว ๆ แต่คุณใช้หลักการ Case-Base Reasoning ในการแนะนำ และคุณจะแนะนำเป็น id ของอุทยานเท่านั้น
                    โดยพิจารณาข้อมูลจาก Case Base ด้านล่างนี้
                    ----[Case Base]----
                    {case_text}
                    ----[สิ้นสุด]----

                    และนี่ข้อมูลของผู้ใช้ที่คุณต้องแนะนำอุทยานให้เหมาะสมที่สุด
                    ----[ข้อมูลผู้ใช้]----
                    user_level: {user_level},
                    user_age: {user_age}
                    ----[สิ้นสุด]----

                    และนี่คือ id ของแต่ละอุทยานที่คุณสามารถเลือกแนะนำได้ 
                    ----[id ของแต่ละอุทยาน เลือกแนะนำ id จากส่วนนี้เท่านั้นห้ามเดามั่ว]----
                    {parks}
                    ----[สิ้นสุด]----

                    ให้คุณวิเคราะห์ข้อมูลผู้ใช้และเปรียบเทียบกับข้อมูลใน Case Base เพื่อหาค่าเฉลี่ยของความต้องการ
                    จากนั้นให้คุณเลือกอุทยานที่มีข้อมูลใกล้เคียงกับค่าเฉลี่ยนั้นที่สุดจากรายชื่ออุทยานที่มีให้
                    โดยให้คุณพิจารณาแค่ข้อมูลที่อยู่ใน Case Base เท่านั้น ห้ามเดาจากความรู้ภายนอก
                    และให้คุณส่งกลับเป็น JSON ที่มีคีย์: list_park_id

                    รูปแบบการส่งกลับต้องเป็น JSON เท่านั้น ห้ามมีข้อความอื่นใดนอกจาก JSON
                    โดยให้คุณส่งกลับเป็นค่าเป็น id เท่านั้น ไม่เอาชื่อ เอาแค่ id ของอุทยานที่คุณเลือกแนะนำที่เหมาะสมที่สุดจำนวน 4 อุทยาน ให้ตอบเป็นแพลทเทิร์นนี้ "id1,id2,id3,id4" โดยไม่มีช่องว่าง
                    """,
        config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                        response_schema=List,
        ),
        )

    data = json.loads(response.text)
    return data


# if __name__ == "__main__":
#     user_level = sys.argv[1]
#     user_age = sys.argv[2]
    
#     result_data = Recommend(user_level, user_age)
    
#     # ห่อหุ้มด้วย 'result' เพื่อให้ Node.js parse ได้สำเร็จ
#     final_output = {"result": result_data}
    
#     # พิมพ์ JSON ที่สมบูรณ์ออกไป
#     print(json.dumps(final_output)) 

if __name__ == "__main__":
    user_level = sys.argv[1]
    user_age = sys.argv[2]
    
    try:
        result_data = Recommend(user_level, user_age)
        #result_data = Recommend("beginer", 19)
    
        final_output = result_data
    
    except Exception as e:
        sys.stderr.write(f"result err naja: {e}")
        
        final_output = {"list_park_id_err": "0,0,0,0",} # ส่ง JSON err
        
    print(json.dumps(final_output))


    