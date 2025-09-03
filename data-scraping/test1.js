import puppeteer from "puppeteer";
// const url = [
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=907"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=912"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=914"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=915"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=7346"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=916"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=917"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=918"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=920"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=921"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=922"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=923"},
//     {url: "https://portal.dnp.go.th/Content/nationalpark?contentId=925"},
//   ]

async function webScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://portal.dnp.go.th/Content/nationalpark?contentId=908",
    { waitUntil: "networkidle2" }
  );

  //park_name
  const park_name = await page.evaluate(() => {
    const elements = document.querySelectorAll(
      "#theme-1 > div.wrapper > div.one-page > div > div > div > div > div > div > div > div.headline > h2"
    );
    const name = elements.length ? elements[0].textContent.trim() : "";

    return name;
  });
  console.log(park_name);

  //park_phone
  const park_phone = await page.evaluate(() => {
    const h3 = document.querySelector("div.greentext h3");
    if (!h3) return "ไม่พบโทรศัพท์ ไม่เจอ h3";

    // รวมข้อความทั้งหมดใน h3 แล้ว normalize ช่องว่าง/nbsp
    const text = h3.textContent
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const start = text.indexOf("โทรศัพท์");
    if (start === -1) return "ไม่พบโทรศัพท์ ไม่มีคำว่า โทรศัพท์";

    // เอาทุกอย่างหลังคำว่า "โทรศัพท์"
    let part = text
      .slice(start + "โทรศัพท์".length)
      .trim()
      .replace(/^[:：]\s*/, "");

    // หาตัวแบ่งตัวแรกที่ปรากฏ
    const markers = ["อีเมล", "โทรสาร", "แฟกซ์", "Facebook", "เว็บไซต์"];
    const idxs = markers.map((m) => part.indexOf(m)).filter((i) => i !== -1);
    const cut = idxs.length ? Math.min(...idxs) : -1;
    if (cut !== -1) part = part.slice(0, cut);

    // ทำความสะอาด
    const phone = part
      .replace(/\s+/g, " ")
      .replace(/^[,;.\-–—\s]+|[,;.\-–—\s]+$/g, "")
      .trim();

    return phone || "ไม่พบโทรศัพท์55555";
  });
  console.log(park_phone);

  //park_email
  const park_email = await page.evaluate(() => {
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบอีเมล";

    const h3 = greentext.querySelector("h3");
    if (!h3) return "ไม่พบอีเมล";

    const strongs = h3.querySelectorAll("strong");
    let email = "";
    strongs.forEach((strong) => {
      const strongText = strong.textContent.trim();
      if (strongText.includes("อีเมล")) {
        const fullText = strong.parentElement.textContent.trim();
        const emailStart = fullText.indexOf("อีเมล") + "อีเมล".length;
        let emailPart = fullText.substring(emailStart).trim();
        const nextStrongIndex = emailPart.indexOf(
          "Facebook" && "หัวหน้าอุทยาน"
        );
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
    return email || "ไม่พบอีเมล";
  });
  console.log(park_email);




  // park_activity 
  const park_activity = await page.evaluate(() => {
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบข้อมูลกิจกรรม (ไม่มี .greentext)";

    // หา h3 ทุกตัวใน .greentext
    const h3s = greentext.querySelectorAll("h3");

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

    return "ไม่พบข้อมูลกิจกรรม";
  });
  console.log(park_activity);




  // park_location
  const park_location = await page.evaluate(() => {
    // หา h3 ตัวแรกใน div.greentext
    const greentext = document.querySelector("div.greentext");
    if (!greentext) return "ไม่พบที่อยู่";

    const h3 = greentext.querySelector("h3");
    if (!h3) return "ไม่พบที่อยู่";

    const strongs = h3.querySelectorAll("strong");
    let locationAddress = "";
    strongs.forEach((strong) => {
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
  console.log(park_location);

  //ปิดเบราว์เซอร์
  await browser.close();
}

webScraper();
