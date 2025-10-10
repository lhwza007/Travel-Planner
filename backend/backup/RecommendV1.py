# ติดตั้งตามนี้
# pip install requests beautifulsoup4 python-dotenv pydantic pdfplumber
# pip install google-genai
import json
import os
import requests
from bs4 import BeautifulSoup
from google import genai
from google.genai import types
from pydantic import BaseModel
from dotenv import load_dotenv
import pdfplumber

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class Park(BaseModel):
    park_name: str
    park_phone: str
    park_location: str
    park_email: str
    park_activity: str
    park_biome: str
    park_animal: str
    park_fee: str





# ดึงค่าบริการจาก PDF
pdf_path = "form-case.pdf"
all_text = []
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text() or ""
        all_text.append(text)

case_text = "\n".join(all_text) # plain text ของ PDF


results = [] #ไว้เก็บผลลัพธ์แต่ละอันที่ ai เจน

            #ส่งข้อความให้ Gemini
response = client.models.generate_content(
    model="gemini-2.0-flash-lite",
    contents=f"""
                คุณเป็นผู้ช่วยสกัดข้อมูลภาษาไทยที่ระมัดระวังมาก
                ใช้เฉพาะข้อมูลที่อยู่ใน "ข้อความหน้าเว็บ" ด้านล่าง ห้ามเดาจากความรู้ภายนอก (ยกเว้นในส่วนของค่าเข้าอุทยาน(park_fee) ที่อนุญาตให้ค้นหาความรู้จากภายนอกได้)

                ----[ข้อความหน้าเว็บ]----
    
                ----[สิ้นสุด]----

                สกัดออกมาเป็น JSON ที่มีคีย์:
                - park_name: เอาชื่ออุทยาน (ภาษาไทย ชื่ออย่างเดียวเช่น อุทยาน....)
                - park_phone: เบอร์โทรศัพท์ที่ระบุในหน้า
                - park_location: อยู่หลังคำว่าสถานที่ติดต่อ
                - park_email: อีเมลที่ระบุในหน้า 
                - park_activity: กิจกรรมภายในอุทยาน มักจะขึ้นต้นด้วย "ทางเดินศึกษาธรรมชาติ" และคั่นด้วย ⇔
                                ให้แทน ⇔ ด้วย , แล้วส่งกลับเป็นข้อความเดียว
                - park_biome: เช่น ป่าดิบชื้น, ป่าดิบแล้ง, ป่าเบญจพรรณ, ป่าสนเขา, ทุ่งหญ้า, พื้นที่ชุ่มน้ำ, ชายฝั่งทะเล, ปะการัง
                - park_animal: เอาแค่ชื่อสัตว์ที่พบได้ในอุทยาน 

                ----[ข้อความในส่วนนี้เอาไว้หา park_fee เท่านั้น]----
    {fee_text}
                ----[สิ้นสุด]----

                - park_fee: ตัวอย่างข้อความ เช่น
                ขุนขาน 10 20 50 100 ให้ตอบว่า > ชาวไทย: ผู้ใหญ่ 20 บาท เด็ก 10 บาท, ชาวต่างชาติ: ผู้ใหญ่ 100 บาท เด็ก 50 บาท
                ดอยเวียงผา (เตรียมการฯ) ไม่เก็บค่าบริการ    > ไม่เก็บค่าบริการ
                """,
    config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=Park,
    ),
    )

data = json.loads(response.text)
results.append(data)

#เขียนไฟล์ JSON
with open("parks.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=4)

print("บันทึกลง parks.json แล้ว")
