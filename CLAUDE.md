# mww-demo

> platform misswellness

## Identity

- **Type**: [1;33m?[0m
[1m1[0m)
[1m2[0m)
[1m3[0m)
[1m4[0m)
[1m5[0m)
custom
- **Stack**: Next.js, https://mcp.supabase.com/mcp?project_ref=ndwkjmtowtqgdmipgjed, Better Auth, AWS
- **Quality Bar**: Production-grade — ทุก output ต้องพร้อม deploy

---

## Golden Rules (บังคับทุก prompt)

1. **NEVER** สร้าง code ที่มี TODO/FIXME/HACK ที่ยังไม่ได้ implement — ถ้าทำไม่เสร็จให้แจ้ง
2. **ALWAYS** มี error handling ครบทุก function — ห้ามมี unhandled promise/error
3. **ALWAYS** validate input ก่อน process — ใช้ schema validation ไม่ใช่ manual check
4. **ALWAYS** เขียน type ให้ครบ — ห้ามใช้ `any` ยกเว้นมีเหตุผลที่ดี
5. **ALWAYS** ตอบเป็นภาษาไทยเมื่ออธิบาย แต่ code/comments เป็นภาษาอังกฤษ
6. **NEVER** hardcode secrets, credentials, connection strings
7. **ALWAYS** ใช้ environment variables สำหรับ config ที่เปลี่ยนตาม environment
8. **ALWAYS** เขียน code ที่ test ได้ — แยก business logic ออกจาก infrastructure

---

## Architecture

```
mww-demo/
├── CLAUDE.md                 # ← คุณกำลังอ่านไฟล์นี้
├── .claude/
│   ├── commands/             # Reusable slash commands
│   ├── agents/               # Specialized agents
│   └── rules/                # Auto-enforced rules
├── src/
│   ├── modules/              # Feature modules (domain-driven)
│   │   └── [module]/
│   │       ├── routes.ts     # HTTP handlers
│   │       ├── service.ts    # Business logic
│   │       ├── repository.ts # Data access
│   │       ├── types.ts      # Types & schemas
│   │       ├── errors.ts     # Module-specific errors
│   │       └── __tests__/    # Unit tests
│   ├── shared/
│   │   ├── db/               # Database schema, migrations, connection
│   │   ├── middleware/       # Auth, logging, rate-limit, error handler
│   │   ├── utils/            # Pure utility functions
│   │   └── types/            # Shared types & interfaces
│   └── index.ts              # App entry point
├── tests/
│   ├── integration/          # Integration tests
│   └── e2e/                  # End-to-end tests
├── docs/
│   ├── architecture/         # ADR (Architecture Decision Records)
│   └── api/                  # API documentation
├── scripts/                  # Build, deploy, migration scripts
├── docker-compose.yml
└── .env.example
```

---

## Coding Standards

### Naming Conventions

| Context         | Convention   | Example                          |
|-----------------|-------------|----------------------------------|
| DB columns      | snake_case  | `church_id`, `created_at`          |
| TS variables    | camelCase   | `churchId`, `createdAt`            |
| TS types/class  | PascalCase  | `ChurchMember`, `AuthService`      |
| Constants       | UPPER_SNAKE | `MAX_RETRY_COUNT`, `DB_POOL_SIZE`  |
| Files           | kebab-case  | `church-member.service.ts`         |
| API endpoints   | kebab-case  | `/api/v1/church-members`           |
| Env vars        | UPPER_SNAKE | `DATABASE_URL`, `REDIS_HOST`       |

### API Response Format (บังคับ)

```typescript
// ✅ ทุก API ต้อง return format นี้เท่านั้น
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;        // e.g. "MEMBER_NOT_FOUND"
    message: string;     // Human-readable message
    details?: unknown;   // Optional validation errors
  } | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    requestId?: string;
  };
}

// ✅ HTTP Status Codes ที่ใช้
// 200 — Success
// 201 — Created
// 204 — No Content (delete)
// 400 — Validation Error
// 401 — Unauthorized
// 403 — Forbidden
// 404 — Not Found
// 409 — Conflict (duplicate)
// 422 — Unprocessable Entity
// 429 — Rate Limited
// 500 — Internal Server Error
```

### Error Handling Pattern (บังคับ)

```typescript
// ✅ ใช้ Custom Error Class เสมอ
class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
  }
}

// ✅ ใช้ Result Pattern สำหรับ service layer
type Result<T, E = AppError> =
  | { success: true; data: T }
  | { success: false; error: E };

// ❌ NEVER throw raw errors ใน service
// ❌ NEVER return null แทน error
// ❌ NEVER swallow errors ด้วย empty catch
```

### Database Patterns

```typescript
// ✅ ทุก table ต้องมี columns เหล่านี้
interface BaseEntity {
  id: string;            // UUID v7 (time-sortable)
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null; // Soft delete
}

// ✅ ใช้ transactions สำหรับ multi-table operations
// ✅ ใช้ parameterized queries เสมอ — ห้าม string concatenation
// ✅ ทุก query ที่ user-facing ต้องมี LIMIT
// ✅ เพิ่ม index สำหรับ columns ที่ใช้ใน WHERE/JOIN/ORDER BY

// ❌ NEVER use SELECT * ใน production code
// ❌ NEVER ทำ N+1 queries
```

### Security Rules (บังคับ)

```
✅ DO:
- Validate & sanitize ทุก input จาก user
- ใช้ parameterized queries (prevent SQL injection)
- Hash passwords ด้วย bcrypt/argon2 (cost ≥ 12)
- ใช้ HTTPS เสมอ
- ใช้ CORS whitelist (ไม่ใช่ *)
- ใช้ rate limiting ทุก public endpoint
- Log security events (login, failed auth, permission denied)
- ใช้ helmet/security headers

❌ NEVER:
- Log passwords, tokens, PII
- Store secrets in code or .env ที่ commit
- Trust client-side validation alone
- Expose stack traces ใน production
- Use eval() หรือ dynamic code execution
- Disable CSRF protection
```

---

## Module Creation Pattern

เมื่อสร้าง module ใหม่ ให้ทำตาม pattern นี้เสมอ:

```typescript
// 1. types.ts — Define types & validation schemas FIRST
export const CreateMemberSchema = t.Object({
  name: t.String({ minLength: 1, maxLength: 255 }),
  email: t.String({ format: 'email' }),
  churchId: t.String({ format: 'uuid' }),
});
export type CreateMemberInput = Static<typeof CreateMemberSchema>;

// 2. repository.ts — Data access (DB only, no business logic)
export class MemberRepository {
  constructor(private db: Database) {}
  async findById(id: string): Promise<Member | null> { ... }
  async create(input: CreateMemberInput): Promise<Member> { ... }
}

// 3. service.ts — Business logic (testable, no HTTP concepts)
export class MemberService {
  constructor(private repo: MemberRepository, private cache: CacheService) {}
  async createMember(input: CreateMemberInput): Promise<Result<Member>> { ... }
}

// 4. routes.ts — HTTP handlers (thin, delegates to service)
export const memberRoutes = new Elysia({ prefix: '/members' })
  .post('/', async ({ body }) => {
    const result = await memberService.createMember(body);
    if (!result.success) throw result.error;
    return { success: true, data: result.data, error: null };
  }, { body: CreateMemberSchema });

// 5. errors.ts — Module-specific error codes
export const MemberErrors = {
  NOT_FOUND: new AppError('MEMBER_NOT_FOUND', 'Member not found', 404),
  DUPLICATE_EMAIL: new AppError('MEMBER_DUPLICATE_EMAIL', 'Email already exists', 409),
};

// 6. __tests__/ — Tests alongside code
```

---

## Reference Modules

เมื่อต้องการสร้าง module ใหม่ ให้ดู module ที่มีอยู่เป็น reference:
- ดู `src/modules/` สำหรับ pattern ที่ใช้จริง
- ถ้ายังไม่มี module ไหนเลย ให้ถามก่อนสร้าง

---

## Testing Standards

```
Unit Tests:
- ทุก service function ต้องมี test
- ใช้ test doubles (mock/stub) สำหรับ dependencies
- Test ทั้ง happy path และ error cases
- Coverage target: ≥ 80% สำหรับ service layer

Integration Tests:
- Test API endpoints แบบ end-to-end
- ใช้ test database (ไม่ใช่ mock)
- Setup/teardown data ทุก test

Naming: describe('[ModuleName] [FunctionName]') → it('should [expected behavior] when [condition]')
```

---

## Git Conventions

```
Commit Format: <type>(<scope>): <description>

Types: feat, fix, refactor, test, docs, chore, perf, security
Scope: module name หรือ area (e.g., auth, members, db)

Examples:
  feat(members): add bulk import endpoint
  fix(auth): handle expired refresh token
  perf(db): add index on church_id for members table
  security(auth): upgrade bcrypt to argon2id

Branch: <type>/<ticket>-<short-description>
  feature/CM-123-member-import
  fix/CM-456-auth-token-refresh
```

---

## Performance Guidelines

```
- API response time target: p95 < 200ms, p99 < 500ms
- Database query: ต้อง EXPLAIN ANALYZE ทุก query ที่ complex
- Use connection pooling (pool size = CPU cores × 2 + 1)
- Cache frequently-read data ใน Redis (TTL ตาม use case)
- Paginate ทุก list endpoint (default: 20, max: 100)
- Use cursor-based pagination สำหรับ large datasets
- Compress responses (gzip/brotli) สำหรับ payload > 1KB
```

---

## When in Doubt

1. ถ้าไม่แน่ใจ convention → ดู existing code ใน project ก่อน
2. ถ้ามีหลายวิธี → เลือกวิธีที่ simple ที่สุดที่ production-ready
3. ถ้า feature ซับซ้อน → เสนอ plan ก่อน implement
4. ถ้าต้อง breaking change → แจ้งก่อนทุกครั้ง
5. ถ้า prompt สั้น เช่น "สร้าง API members" → ใช้ Module Creation Pattern ด้านบน ครบทุก layer
6. ถ้า prompt ยาว → อ่านทั้งหมดก่อน แล้วเสนอ plan → implement ทีละ step

---

## MCP Tools Available

- **Context7**: เติม "use context7" สำหรับ docs ล่าสุดของ library
- **PostgreSQL**: query dev database ได้โดยตรง
- **Supabase**: จัดการ Supabase project
- **NotebookLM**: ถามเอกสาร/documentation จาก NotebookLM notebooks
- **GitHub**: จัดการ repos, PRs, issues
