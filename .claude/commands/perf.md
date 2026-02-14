# Performance Optimization: $ARGUMENTS

## ขั้นตอน

1. **Identify** — หา bottleneck ที่ระบุ
2. **Measure** — วัดค่าปัจจุบัน (query time, response time)
3. **Analyze** — ใช้ EXPLAIN ANALYZE สำหรับ DB queries
4. **Optimize** — เลือกวิธีที่เหมาะสม:
   - Database: indexes, query rewrite, materialized views
   - Application: caching (Redis), lazy loading, pagination
   - API: response compression, field selection, batch endpoints
5. **Verify** — วัดค่าหลัง optimize เปรียบเทียบ

## Common Fixes
- N+1 → Use JOIN or batch query
- Slow list → Add index + cursor pagination
- Repeated reads → Redis cache with TTL
- Large payload → Field selection / sparse fieldsets
- Slow aggregation → Materialized view + cron refresh
