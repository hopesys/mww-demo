# สร้าง Module ใหม่: $ARGUMENTS

## ขั้นตอน

1. อ่าน CLAUDE.md section "Module Creation Pattern" ก่อน
2. ดู existing modules ใน `src/modules/` เป็น reference
3. สร้างไฟล์ทั้งหมดตาม pattern:

```
src/modules/$ARGUMENTS/
├── types.ts        # Types + Zod/Elysia validation schemas
├── repository.ts   # Data access layer
├── service.ts      # Business logic + Result pattern
├── routes.ts       # HTTP handlers (thin controller)
├── errors.ts       # Module-specific error codes
├── index.ts        # Re-export routes
└── __tests__/
    ├── service.test.ts
    └── routes.test.ts
```

4. Register routes ใน `src/index.ts`
5. สร้าง database migration ถ้าต้องมี table ใหม่
6. เขียน unit tests สำหรับ service layer (อย่างน้อย happy path + main error cases)

## Rules
- ทุก field ต้องมี validation schema
- ทุก service method ต้อง return Result<T>
- ทุก route ต้อง handle errors ผ่าน middleware
- ห้ามมี TODO/FIXME ที่ยังไม่ implement
