# Miss Wellness World 2026 (mww-demo)

เว็บแพลตฟอร์มสำหรับ Miss Wellness World Thailand — ใช้สำหรับ Landing, การสมัคร (Application Portal), การโหวต และเนื้อหาเกี่ยวกับงาน (About, Contact). พัฒนาด้วย Next.js App Router, Tailwind CSS v4, shadcn/ui และ Supabase (Auth, DB, Storage).

## สารบัญ

- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [Tech Stack](#tech-stack)
- [ข้อกำหนดเบื้องต้น](#ข้อกำหนดเบื้องต้น)
- [การติดตั้งและรัน locally](#การติดตั้งและรัน-locally)
- [ตัวแปรสภาพแวดล้อม](#ตัวแปรสภาพแวดล้อม)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [สคริปต์ที่ใช้ได้](#สคริปต์ที่ใช้ได้)
- [การ Deploy](#การ-deploy)
- [การทดสอบ](#การทดสอบ)
- [แก้ปัญหาเบื้องต้น](#แก้ปัญหาเบื้องต้น)
- [เอกสารเพิ่มเติม](#เอกสารเพิ่มเติม)

---

## คุณสมบัติหลัก

- **Landing / Marketing** — หน้าแรก, About, Contact, โครงสร้างตาม mockup
- **Application Portal** — ฟอร์มสมัครหลายขั้นตอน (Multi-step) พร้อม draft
- **Auth** — Supabase Auth: Google OAuth, Email OTP, Phone OTP
- **Voting** — หน้าโหวต, ซื้อเครดิต, Leaderboard
- **Design System** — Design tokens (Wellness Green/Gold), Manrope + Noto Sans Thai, shadcn/ui

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js 20+ |
| **Package Manager** | [Bun](https://bun.sh/) |
| **Framework** | Next.js 16+ (App Router) |
| **UI** | React 19, Tailwind CSS v4, shadcn/ui (Radix UI), Lucide React |
| **Fonts** | Manrope (display), Noto Sans Thai (body) |
| **Auth & Backend** | Supabase (Auth, Database, Storage) |
| **Validation** | Zod |
| **Deployment** | Vercel (แนะนำ) หรือ Docker |

---

## ข้อกำหนดเบื้องต้น

- **Bun** 1.0+ (หรือ Node.js 20+ พร้อม `npm`/`pnpm`)
- **Supabase** — สร้างโปรเจกต์ที่ [supabase.com](https://supabase.com) และเก็บ URL กับ anon key
- (ถ้าใช้ DB/Redis แยก) PostgreSQL 15+, Redis 7+ หรือใช้ Supabase + Upstash ตาม design

---

## การติดตั้งและรัน locally

### 1. Clone และเข้าโฟลเดอร์

```bash
git clone <repository-url> mww-demo
cd mww-demo
```

### 2. ติดตั้ง Dependencies

```bash
bun install
```

ถ้าใช้ npm:

```bash
npm install
```

### 3. ตั้งค่า Environment

คัดลอกไฟล์ตัวอย่างแล้วแก้ค่าตามโปรเจกต์ Supabase และ env อื่นๆ:

```bash
cp .env.example .env
```

แก้ไข `.env` โดยเฉพาะ:

| Variable | คำอธิบาย | วิธีได้ |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key | เดียวกัน |
| `AUTH_SECRET` | Secret สำหรับ session/cookie (อย่างน้อย 64 ตัวอักษร) | สร้างค่าสุ่ม เช่น `openssl rand -base64 48` |

สำหรับ Google OAuth: ใน Supabase Dashboard → Auth → URL Configuration ให้เพิ่ม Redirect URL เช่น  
`http://localhost:3000/auth/callback`

### 4. รัน Dev Server

```bash
bun run dev
```

หรือ `npm run dev` ถ้าใช้ npm.

เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000).

---

## ตัวแปรสภาพแวดล้อม

### จำเป็นสำหรับการรัน

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `AUTH_SECRET` | Secret สำหรับ auth/session (min 64 chars) |

### เลือกได้ / พัฒนา

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | `development` / `production` | `development` |
| `PORT` | Port ของ dev server | `3000` |
| `HOST` | Host binding | `0.0.0.0` |
| `LOG_LEVEL` | ระดับ log | `debug` |
| `DATABASE_URL` | PostgreSQL (ถ้าใช้แยกจาก Supabase) | - |
| `REDIS_URL` | Redis (ถ้าใช้ cache/queue) | - |
| `RATE_LIMIT_WINDOW_MS` | ช่วงเวลา rate limit (ms) | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | จำนวน request สูงสุดต่อช่วง | `100` |
| `CORS_ORIGINS` | CORS allowed origins | `http://localhost:3000,...` |

### Supabase / Auth

- ใช้ `NEXT_PUBLIC_*` สำหรับค่าที่ frontend ต้องอ่าน (URL, anon key).
- ค่าเช่น service role key ไม่ควรใส่ใน frontend; ใช้เฉพาะใน Server Actions / API routes ที่รันฝั่ง server.

รายการเต็มอยู่ใน `.env.example`.

---

## โครงสร้างโปรเจกต์

```
mww-demo/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group: Auth
│   │   ├── login/page.tsx        # หน้า Login (Google / Email / Phone)
│   │   └── layout.tsx
│   ├── (marketing)/              # Route group: Marketing
│   │   ├── page.tsx              # หน้าแรก
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── voting/
│   │   │   ├── page.tsx          # หน้าโหวต
│   │   │   └── buy/page.tsx      # ซื้อเครดิต
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── apply/                    # Application Portal
│   │   ├── page.tsx              # ฟอร์มสมัครหลายขั้นตอน
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── auth/callback/route.ts    # Supabase Auth callback (OAuth/OTP)
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── ui/                       # shadcn/ui (button, input, card, dialog, sheet, …)
│   ├── auth/                     # Google sign-in, Email/Phone OTP forms
│   ├── voting/                   # Vote cards, leaderboard, buy credits, confirm dialog
│   ├── application/              # ขั้นตอนฟอร์มสมัคร, sidebar, progress
│   ├── marketing/                # Hero, CTA, philosophy, past winners
│   ├── about/                    # Team cards
│   └── layout/                   # Header, Footer, Back-to-top
├── lib/                          # Utilities, types, data
│   ├── data/                     # e.g. voting contestants data
│   └── types.ts
├── docs/                         # Architecture, API
│   └── architecture/             # ADR (Architecture Decision Records)
├── spec/                         # Implementation specs (mockup → app)
├── .env.example
├── components.json               # shadcn/ui config
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

### Request flow (สรุป)

1. Request เข้า Next.js App Router ตาม segment ใน `app/`.
2. Layout กลุ่ม `(marketing)` / `(auth)` / `apply` กำหนด wrapper และ metadata.
3. หน้าที่ต้องล็อกอิน ใช้ Supabase Auth (session) ตรวจใน server component หรือ middleware; ไม่มี session จะ redirect ไป `/login` หรือ `/auth/callback` ตาม flow.
4. ข้อมูลจาก Supabase (Auth, DB, Storage) ใช้ผ่าน `@supabase/ssr` และ client/server helpers ตามความเหมาะสม.

---

## สคริปต์ที่ใช้ได้

| Command | Description |
|---------|-------------|
| `bun run dev` | รัน dev server (Turbopack) ที่ `http://localhost:3000` |
| `bun run build` | Build สำหรับ production |
| `bun run start` | รัน production build (หลัง `bun run build`) |
| `bun run lint` | รัน ESLint |

---

## การ Deploy

### Vercel (แนะนำ)

1. Push โค้ดไป GitHub/GitLab/Bitbucket.
2. ใน [Vercel](https://vercel.com) สร้างโปรเจกต์จาก repo นี้.
3. ตั้งค่า Environment Variables ให้ตรงกับ production (อย่างน้อย `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `AUTH_SECRET`).
4. ใน Supabase → Auth → URL Configuration ใส่ Redirect URL เป็น `https://<your-domain>/auth/callback`.
5. Deploy; Vercel จะใช้ `build` จาก `package.json` อัตโนมัติ.

### Build และรันแบบ production (local/Docker)

```bash
bun run build
bun run start
```

รันที่พอร์ตจาก `PORT` (default 3000). สำหรับ Docker ให้ใช้ image ที่รัน `bun run build && bun run start` และส่ง env ผ่าน `-e` หรือ env file.

---

## การทดสอบ

- **Lint:** `bun run lint`
- โปรเจกต์มีโครงสำหรับ unit/integration ตาม CLAUDE.md (modules, `__tests__`). ถ้ามีคำสั่ง test ใน `package.json` ให้รันด้วย `bun run test` หรือ `bun test`

---

## แก้ปัญหาเบื้องต้น

### Supabase connection / Auth ไม่ทำงาน

- ตรวจว่า `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY` ถูกต้องและไม่มีช่องว่าง.
- ตรวจ Supabase Dashboard → Auth → URL Configuration ว่า Redirect URL ตรงกับที่ใช้ (เช่น `http://localhost:3000/auth/callback` สำหรับ dev).

### หน้า Login redirect วนหรือไม่ถึง callback

- ตรวจว่า `AUTH_SECRET` ตั้งไว้และยาวพอ (แนะนำ ≥ 64 ตัวอักษร).
- ลองลบ cookie ของโดเมนนั้นแล้วล็อกอินใหม่.

### Build ล้ม (module not found / type error)

- รัน `bun install` (หรือ `rm -rf node_modules && bun install`).
- ตรวจว่าใช้ Node 20+ และ Bun เวอร์ชันที่รองรับ Next 16.

### Style / Tailwind ไม่ตรงกับ mockup

- ตรวจ `globals.css` และ design tokens (สี primary/accent, ตัวอักษร Manrope/Noto Sans Thai) ว่าสอดคล้องกับ `spec/MWW_Mockup_Implementation_Spec.md`.

---

## เอกสารเพิ่มเติม

- [CLAUDE.md](./CLAUDE.md) — กฎการพัฒนา, โครงสร้าง module, API response format, security
- [spec/MWW_Mockup_Implementation_Spec.md](./spec/MWW_Mockup_Implementation_Spec.md) — สเปกการแปลง mockup เป็น UI และ flow Auth/Voting/Apply
- [docs/architecture/](./docs/architecture/) — ADR (เช่น Tech Stack, template)

---

## License

Private — ใช้ภายในโปรเจกต์ Miss Wellness World ตามนโยบายขององค์กร
