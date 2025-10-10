import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function addWithPython(x, y) {
  return new Promise((resolve) => {
    const pythonCmd = process.platform.startsWith("win") ? "python" : "python3";

    // เรียกใช้ add.py ที่อยู่อีกโฟลเดอร์
    const py = spawn(pythonCmd, [
      join(__dirname, "../LLM/test3.py"),
      String(x),
      String(y),
    ]);

    let dataString = "";

    // รับค่าที่ python print กลับมา
    py.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    // เมื่อ python รันเสร็จ
    py.on("close", () => {
      const obj = JSON.parse(dataString);
      resolve(obj.result);
    });
  });
}

// ทดสอบเรียกใช้งาน
addWithPython(1, 15).then((res) => {
  console.log("ผลลัพธ์:", res);
});
