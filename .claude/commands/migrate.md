# สร้าง Database Migration: $ARGUMENTS

## ขั้นตอน

1. วิเคราะห์ว่าต้อง ALTER/CREATE อะไร
2. สร้าง migration file ตาม naming convention:
   `YYYYMMDDHHMMSS_description.sql`
3. เขียนทั้ง UP และ DOWN migration
4. ตรวจสอบ:
   - [ ] ไม่ทำให้ existing data หาย
   - [ ] มี index สำหรับ foreign keys และ columns ที่ query บ่อย
   - [ ] Column types เหมาะสม (ไม่ใช้ TEXT ทุกอัน)
   - [ ] Default values สมเหตุผล
   - [ ] NOT NULL constraints ที่เหมาะสม
   - [ ] Backward compatible (ถ้าต้อง zero-downtime deploy)

## Rules
- ห้ามแก้ migration files ที่ apply แล้ว → สร้างอันใหม่
- UUID columns ใช้ gen_random_uuid() (PG 13+)
- Timestamp ใช้ timestamptz ไม่ใช่ timestamp
- ใช้ soft delete (deleted_at) ไม่ใช่ hard delete
