# ADR-001: Technology Stack Selection

**Date:** 2026-02-15
**Status:** Accepted

## Context

ต้องเลือก technology stack สำหรับ mww-demo
ที่รองรับ production-grade requirements, high availability, และ maintainability.

## Decision

- **Stack**: Next.js, https://mcp.supabase.com/mcp?project_ref=ndwkjmtowtqgdmipgjed, Better Auth, AWS
- **Architecture**: Modular monolith (แยก module ชัดเจน, พร้อม extract เป็น microservice ในอนาคต)
- **API Pattern**: REST with consistent response format
- **Error Handling**: Result pattern + Custom AppError
- **Authentication**: Better Auth with RBAC

## Consequences

### Positive
- Type safety ตลอด stack
- Fast development iteration
- Easy to test (dependency injection)
- Ready for horizontal scaling

### Negative
- Learning curve สำหรับทีมใหม่
- Smaller community (ElysiaJS) เทียบกับ Express
