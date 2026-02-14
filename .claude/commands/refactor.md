# Refactor: $ARGUMENTS

## ขั้นตอน

1. **ตรวจสอบ test coverage** ก่อน refactor — ถ้าไม่มี test ให้เขียนก่อน
2. **วิเคราะห์** code ที่จะ refactor — หา code smells:
   - Functions ยาวเกิน 50 บรรทัด
   - Parameters เยอะเกิน 3 ตัว
   - Nested conditionals เกิน 3 ชั้น
   - Duplicated code
   - God objects / classes ที่ทำหลายอย่าง
3. **วางแผน** — เสนอ refactoring plan ก่อน implement
4. **ทำทีละ step** — แต่ละ step ต้อง tests ผ่าน
5. **ตรวจสอบ** — รัน tests ทั้งหมดหลัง refactor

## Rules
- ห้าม refactor + เพิ่ม feature ในครั้งเดียว
- Behavior ต้องเหมือนเดิม (ยกเว้นบอกว่าเปลี่ยน)
- ถ้ากระทบหลายไฟล์ → แจ้งก่อน
