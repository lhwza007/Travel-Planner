// scrape.js
import puppeteer from "puppeteer";
import fs from "fs/promises";

const urls = [
  "https://portal.dnp.go.th/Content/nationalpark?contentId=907",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=908",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=912",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=914",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=915",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=7346",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=916",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=917",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=918",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=920",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=921",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=922",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=923",
  "https://portal.dnp.go.th/Content/nationalpark?contentId=925"
];


/***********************************************************************************************************************/
async function scrapData(page, url) {
  await page.goto(url, { waitUntil: "networkidle2" });


  //name
  const park_name = await page.evaluate(() => {
    const el = document.querySelector(
      "#theme-1 > div.wrapper > div.one-page > div > div > div > div > div > div > div > div.headline > h2"
    );
    return el ? el.textContent.trim() : "ไม่พบชื่อ";
  });


    //phone
  const park_phone = await page.evaluate(() => {
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบโทรศัพท์ (ไม่มี .greentext)";

    const h3 = greentext.querySelector("h3");
    if (!h3) return "ไม่พบโทรศัพท์ (ไม่มี h3)";

    const strongs = h3.querySelectorAll("strong");
    let tell = "";
    strongs.forEach((strong) => {   //ลูปหา strong ที่มีคำว่า โทรศัพท์ และดึงข้อมูลหลังคำว่า โทรศัพท์ แต่อยู่ก่อนคำว่า อีเมลและโทรสาร
      const strongText = strong.textContent.trim();
      if (strongText.includes("โทรศัพท์")) {
        const fullText = strong.parentElement.textContent.trim();
        const tellStart = fullText.indexOf("โทรศัพท์") + "โทรศัพท์".length;
        let tellPart = fullText.substring(tellStart).trim();
        const nextStrongIndex = tellPart.indexOf("อีเมล" && "โทรสาร");
        if (nextStrongIndex !== -1) { //ถ้าnextStrongIndex มันมีค่า index
          tellPart = tellPart.substring(0, nextStrongIndex).trim();
        }
        tell = tellPart
          .replace(/:/g, "")
          .replace(/ /g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    });
    return tell || "ไม่พบโทรศัพท์ (ท้ายสุด)";
  });


    //email
  const park_email = await page.evaluate(() => {
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบอีเมล (ไม่มี .greentext)";

    const h3 = greentext.querySelector("h3");
    if (!h3) return "ไม่พบอีเมล (ไม่มี h3)";

    const strongs = h3.querySelectorAll("strong");
    let email = "";
    strongs.forEach((strong) => {   //ลูปหา strong ที่มีคำว่า อีเมล และดึงข้อมูลหลังคำว่า อีเมล แต่อยู่ก่อนคำว่า Facebookcและหัวหน้าอุทยาน
      const strongText = strong.textContent.trim();
      if (strongText.includes("อีเมล")) {
        const fullText = strong.parentElement.textContent.trim();
        const emailStart = fullText.indexOf("อีเมล") + "อีเมล".length;
        let emailPart = fullText.substring(emailStart).trim();
        const nextStrongIndex = emailPart.indexOf("Facebook"  && "หัวหน้าอุทยาน");
        if (nextStrongIndex !== -1) {
          emailPart = emailPart.substring(0, nextStrongIndex).trim();
        }
        email = emailPart
          .replace(/:/g, "")
          .replace(/ /g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    });
    return email || "ไม่พบอีเมล (ท้ายสุด)";
  });


    //activity
    const park_activity = await page.evaluate(() => {
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบข้อมูลกิจกรรม (ไม่มี .greentext)";

    const h3s = greentext.querySelectorAll("h3"); // หา h3 ทุกตัวใน .greentext

    for (const h3 of h3s) {
      let text = h3.textContent

      if (text.includes("⇔")) {
        text = text
          .replace(/⇔/g, ",")
          .replace(/\s*,\s*/g, ", ") 
          .replace(/\s+/g, " ")
          .replace(/,+\s*$/, "") 
          .trim();

        return text;
      }
    }

    return "ไม่พบข้อมูลกิจกรรม (ไม่มี ⇔)";
  });


    //location
    const park_location = await page.evaluate(() => {
    // หา h3 ตัวแรกใน div.greentext
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบที่อยู่";

    const h3 = greentext.querySelector("h3");
    if (!h3) return "ไม่พบที่อยู่";

    const strongs = h3.querySelectorAll("strong");
    let locationAddress = "";
    strongs.forEach((strong) => {   //ลูปหา strong ที่มีคำว่า สถานที่ติดต่อ และดึงข้อมูลหลังคำว่า สถานที่ติดต่อ แต่อยู่ก่อนคำว่า โทรศัพท์
      const strongText = strong.textContent.trim();
      if (strongText.includes("สถานที่ติดต่อ")) {
        const fullText = strong.parentElement.textContent.trim();
        const addressStart =
          fullText.indexOf("สถานที่ติดต่อ") + "สถานที่ติดต่อ".length;
        let addressPart = fullText.substring(addressStart).trim();
        const nextStrongIndex = addressPart.indexOf("โทรศัพท์");
        if (nextStrongIndex !== -1) {
          addressPart = addressPart.substring(0, nextStrongIndex).trim();
        }
        locationAddress = addressPart
          .replace(/:/g, "")
          .replace(/ /g, " ")
          .replace(/\s+/g, " ")
          .trim();
      }
    });
    return locationAddress || "ไม่พบที่อยู่";
  });

  return { url, park_name, park_phone, park_email, park_activity, park_location };
}



//********************************************************************************************************************** */

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const results = [];
  for (const url of urls) {
    console.log("กำลังดึง:", url);
    try {
      const data = await scrapData(page, url);
      results.push(data);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err.message);
      results.push({ url, error: err.message });
    }
  }

  await browser.close();

  // เขียนไฟล์ JSON
  await fs.writeFile("parks.json", JSON.stringify(results, null, 2), "utf-8");
  console.log("บันทึกข้อมูลเสร็จ");
}

main();
