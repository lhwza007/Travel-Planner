import sys
import json

def add(x, y):
    return x + y

if __name__ == "__main__":
    # รับค่าจาก argv
    x = float(sys.argv[1])
    y = float(sys.argv[2])

    result = add(x, y)
    # ส่งผลลัพธ์กลับไปหา Node.js
    print(json.dumps({"result": result}))

