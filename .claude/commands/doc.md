# เขียน Documentation: $ARGUMENTS

## ขั้นตอน

1. วิเคราะห์ว่าต้อง document อะไร
2. เลือก type:
   - **API Doc** → OpenAPI/Swagger spec + examples
   - **ADR** → Architecture Decision Record
   - **README** → Module/feature README
   - **Inline** → JSDoc/TSDoc comments

## API Documentation Format
```markdown
### [METHOD] /api/v1/[path]

**Description:** [อธิบาย]

**Auth:** Required / Public

**Request:**
- Headers: Authorization: Bearer {token}
- Body: { field: type }

**Response 200:**
{ success: true, data: { ... }, error: null }

**Response 4xx:**
{ success: false, data: null, error: { code: "...", message: "..." } }

**Example:**
curl -X POST http://localhost:3000/api/v1/members \
  -H "Authorization: Bearer ..." \
  -H "Content-Type: application/json" \
  -d '{"name": "...", "email": "..."}'
```

## ADR Format
```markdown
# ADR-[NUMBER]: [Title]
**Date:** YYYY-MM-DD
**Status:** Proposed / Accepted / Deprecated

## Context
[ทำไมต้องตัดสินใจนี้]

## Decision
[ตัดสินใจอะไร]

## Consequences
[ผลกระทบ + และ -]
```
