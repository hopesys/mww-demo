# Database Rules (Auto-enforced)

1. ห้าม SELECT * — ระบุ columns ที่ต้องการ
2. ทุก list query ต้องมี LIMIT (max 100)
3. ทุก WHERE clause ที่ใช้บ่อย ต้องมี index
4. ใช้ transactions สำหรับ multi-step operations
5. ใช้ soft delete (deleted_at) เป็น default
6. Timestamp columns ใช้ timestamptz ไม่ใช่ timestamp
7. ห้าม DROP TABLE / DROP COLUMN ใน migration โดยไม่มี confirmation
8. ทุก migration ต้องมี rollback (DOWN)
9. Foreign keys ต้องมี ON DELETE policy
10. ใช้ connection pooling เสมอ — ห้าม create connection per request
