# Code Review: $ARGUMENTS

## Review Checklist

ตรวจสอบไฟล์/directory ที่ระบุ ตามหัวข้อเหล่านี้:

### 🔒 Security
- [ ] SQL injection (parameterized queries?)
- [ ] XSS prevention (output encoding?)
- [ ] Input validation ครบทุก field
- [ ] Secrets ไม่อยู่ใน code
- [ ] Authorization checks ครบทุก endpoint
- [ ] Rate limiting สำหรับ public endpoints

### 🏗️ Architecture
- [ ] Separation of concerns (route → service → repository)
- [ ] No business logic ใน route handlers
- [ ] Dependencies injected ไม่ใช่ imported ตรง
- [ ] Error handling ใช้ Result pattern

### ⚡ Performance
- [ ] N+1 query problems
- [ ] Missing database indexes
- [ ] Unbounded queries (ต้องมี LIMIT)
- [ ] Unnecessary data fetching (SELECT specific columns)
- [ ] Missing caching opportunities

### 🧪 Testability
- [ ] Service methods testable แบบ isolated
- [ ] No side effects ใน pure functions
- [ ] Test coverage เพียงพอ

### 📖 Code Quality
- [ ] Types ครบ (ไม่มี any)
- [ ] Naming ชัดเจน ตรง convention
- [ ] ไม่มี dead code / commented code
- [ ] Error messages มีประโยชน์

## Output Format
แสดงผลเป็น:
1. 🔴 Critical — ต้องแก้ก่อน merge
2. 🟡 Warning — ควรแก้
3. 🟢 Suggestion — nice to have
4. ✅ Good — สิ่งที่ทำได้ดี
