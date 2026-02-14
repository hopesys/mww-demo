# สร้าง API Endpoint: $ARGUMENTS

## Instructions

1. วิเคราะห์ว่า endpoint นี้อยู่ใน module ไหน
2. ถ้า module ยังไม่มี → สร้างใหม่ตาม Module Creation Pattern
3. ถ้า module มีอยู่แล้ว → เพิ่ม endpoint เข้าไป

## Checklist สำหรับทุก endpoint:
- [ ] Input validation schema (ทุก field)
- [ ] Service method พร้อม error handling
- [ ] Repository method (ถ้าต้อง query DB)
- [ ] Response format ตรงตาม ApiResponse<T>
- [ ] HTTP status codes ถูกต้อง
- [ ] Authorization check (ถ้า endpoint ไม่ public)
- [ ] Rate limiting (ถ้า endpoint public)
- [ ] Test cases (happy path + error)

## Output
ให้แสดง cURL example สำหรับ test endpoint ด้วย
