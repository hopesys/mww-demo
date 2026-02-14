# Security Rules (Auto-enforced)

ทุกครั้งที่เขียน code ที่เกี่ยวกับ security ให้บังคับ:

1. ทุก SQL query ต้อง parameterized — ห้าม string template
2. ทุก user input ต้อง validate ด้วย schema ก่อน process
3. Password ต้อง hash ด้วย argon2id หรือ bcrypt (rounds ≥ 12)
4. JWT secret ต้องมาจาก env var เท่านั้น
5. API keys/tokens ห้ามอยู่ใน code — ใช้ env var
6. Sensitive fields (password, token, ssn) ห้ามอยู่ใน logs
7. Error response ต้องไม่ expose stack trace หรือ internal structure
8. CORS ต้อง whitelist specific domains — ห้ามใช้ '*' ใน production
9. File upload ต้อง validate: type, size, filename
10. Rate limit ทุก public endpoint
