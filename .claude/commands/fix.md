# แก้ Bug: $ARGUMENTS

## ขั้นตอน

1. **วิเคราะห์ปัญหา** — อ่าน error message/description ให้เข้าใจ root cause
2. **หา root cause** — ใช้ Grep/Read เพื่อหาไฟล์ที่เกี่ยวข้อง
3. **ตรวจสอบ impact** — ดูว่า fix นี้จะกระทบอะไรบ้าง
4. **แก้ไข** — แก้ที่ root cause ไม่ใช่ workaround
5. **เพิ่ม test** — เขียน test ที่จะ catch bug นี้ในอนาคต
6. **ตรวจสอบ** — รัน existing tests ว่ายังผ่านอยู่

## Rules
- อย่า fix แค่ symptom → หา root cause
- ถ้า fix กระทบหลายที่ → แจ้งก่อน implement
- ถ้า bug มาจาก missing validation → เพิ่ม validation + test
- สรุป: อะไรพัง, ทำไมพัง, แก้ยังไง
