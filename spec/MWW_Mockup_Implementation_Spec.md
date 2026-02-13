# MWW Mockup Implementation Spec

**Project:** Miss Wellness World Thailand 2025 (MWWT)  
**Source:** `mockup/index.html`, `mockup/admin.html`  
**Content Source:** `docs/` (about, home, apply, contestants, contact, voting_sponsors)  
**Tech Stack Reference:** [MWW_Technical_MasterPlan.md](./MWW_Technical_MasterPlan.md)  
**Status:** Draft for Development  
**Date:** 2026-02-13

---

## 1. บทสรุป (Overview)

สเปกนี้แปลง UI จาก HTML mockup เป็นรายละเอียดสำหรับ implement ด้วย tech stack ตาม Master Plan: **Next.js 16+ (App Router)**, **Tailwind CSS v4**, **shadcn/ui**, **Supabase**, **Vercel**.

| Mockup File    | หน้าที่ได้ | Route (แนะนำ)        | เนื้อหา (จาก docs) |
|----------------|------------|------------------------|----------------------|
| `index.html`   | หน้า Landing / Marketing | `(marketing)/` หรือ `/` | home.md, about.md, contestants.md |
| `admin.html`   | ฟอร์มสมัครหลายขั้นตอน (Application Portal) | `/apply` | apply.md |
| —              | About Us, Contact, Voting/Sponsors | `/about`, `/contact`, section หรือ `/voting` | about.md, contact.md, voting_sponsors.md |

---

## 2. Tech Stack (อ้างอิง Master Plan)

| Layer | Technology | หมายเหตุจาก Mockup |
|-------|------------|----------------------|
| **Framework** | Next.js 16+ App Router | Route groups: `(marketing)`, `apply`, `admin` |
| **Styling** | Tailwind CSS v4 | ใช้ design tokens ด้านล่าง (primary, accent, font) |
| **UI Components** | shadcn/ui (Tailwind v4) | Button, Input, Label, Card, etc. ธีม Neutral + Wellness |
| **Icons** | Material Symbols Outlined | ลิงก์ Google Fonts ใน mockup; อาจใช้ `react-icons` หรือ CDN |
| **Fonts** | Manrope, Noto Sans Thai | Display + Body ตาม mockup |
| **Backend / DB** | Supabase | Auth, DB, Storage สำหรับฟอร์มสมัครและไฟล์ |
| **Hosting** | Vercel | Deploy Next.js |
| **Validation** | Zod | ใช้ในฟอร์มสมัคร (client + server) |

---

## 3. Design Tokens (จาก Mockup)

ใช้ใน `tailwind.config` หรือ CSS variables ให้สอดคล้องกับ mockup

### 3.1 สี (Colors)

**Landing (index.html):**

| Token | Value | การใช้ |
|-------|--------|--------|
| `primary` | `#0a5239` | Wellness Green – ปุ่ม, ลิงก์, ไอคอนหลัก |
| `accent` | `#ca8a04` | Wellness Gold – CTA, badge, ขอบการ์ด |
| `background-light` | `#f8fbfa` | พื้นหลัง light |
| `background-dark` | `#11211b` | พื้นหลัง dark / footer |
| `border light` | `#e8f3ef` | เส้นขอบ header |

**Application (admin.html):**

| Token | Value | การใช้ |
|-------|--------|--------|
| `primary` | `#0a5223` | เขียวฟอร์ม |
| `primary-hover` | `#08421c` | Hover ปุ่ม |
| `accent` | `#ca8a04` | Step badge, progress bar |
| `background-light` | `#f8fbf9` | พื้นหลัง |
| `background-dark` | `#112117` | Dark mode |
| `surface-light` | `#ffffff` | การ์ด/ฟอร์ม |
| `surface-dark` | `#1a2c22` | การ์ด dark |
| Border (light) | `#d0e6d8` | ขอบ input/card |
| Border (dark) | `#2a4535` | ขอบ dark |

### 3.2 Typography

- **Display / Body:** `Manrope`, `Noto Sans Thai`, `sans-serif`
- **Headings:** font-bold / font-black, tracking-tight
- **Thai tagline:** ใช้ `Noto Sans Thai` (เช่น "สวยสร้างสุข")

### 3.3 Border Radius

- `DEFAULT`: `0.5rem` (landing), `0.25rem` (form)
- `lg`, `xl`, `2xl`, `full` ตาม Tailwind ปกติ

---

## 4. ระบบ Login / Registration และการโหวต (Auth & Voting)

ใช้ **Supabase Auth** เป็นศูนย์กลาง: รองรับ Google OAuth, Phone OTP, และ Email (Magic Link / OTP) ตามที่เลือก

### 4.1 ผู้สมัคร Miss Wellness (Applicant) – Registration ก่อน Apply

**วัตถุประสงค์:** ให้ผู้สมัครลงทะเบียนแบบง่ายก่อน จึงเข้าไปกรอกฟอร์มสมัครต่อได้

| ขั้นตอน | รายละเอียด |
|---------|-------------|
| **1. เข้าหน้าสมัคร** | ผู้ใช้กด "Apply Now" / "Start Application" → ไปที่ `/apply` (หรือ `/apply/start`) |
| **2. ตรวจสอบ Auth** | ถ้ายังไม่ล็อกอิน → redirect ไป **หน้า Login/Register** (`/login` หรือ `/apply/login`) |
| **3. ลงทะเบียน (เลือกอย่างใดอย่างหนึ่ง)** | **Google:** ปุ่ม "Sign in with Google" → Supabase `signInWithOAuth({ provider: 'google' })` <br> **เบอร์โทร:** กรอกหมายเลข → ส่ง OTP (Supabase `signInWithOtp({ phone })`) → กรอก OTP → ยืนยัน <br> **อีเมล:** กรอกอีเมล → ส่ง OTP หรือ Magic Link (Supabase `signInWithOtp({ email })`) → กรอก OTP หรือคลิกลิงก์ → ยืนยัน |
| **4. หลัง Login สำเร็จ** | สร้าง/อัปเดตเรคอร์ดในตาราง `users` (หรือ `profiles`) ถ้ามี; ผูก `applicant_id` กับ `auth.users.id` เมื่อสร้างใบสมัคร; redirect ไป `/apply` (step 1) |
| **5. การเข้า Apply ครั้งถัดไป** | ล็อกอินด้วยวิธีเดิม → เข้า `/apply` ได้เลย (ดู draft หรือแก้ไขใบสมัครเดิมตามนโยบาย) |

**Route / Components แนะนำ:**

- `app/(auth)/login/page.tsx` หรือ `app/login/page.tsx` — หน้าเลือกวิธีล็อกอิน (Google / Phone / Email)
- `app/(auth)/login/phone/page.tsx` — กรอกเบอร์ + OTP (หรือใช้ modal ในหน้าเดียว)
- `app/(auth)/login/email/page.tsx` — กรอกอีเมล + OTP หรือ Magic Link
- Components: `LoginForm.tsx`, `GoogleSignInButton.tsx`, `PhoneOTPForm.tsx`, `EmailOTPForm.tsx`
- Middleware หรือ Layout ของ `/apply`: ตรวจ `supabase.auth.getUser()` ถ้าไม่มี session → redirect ไป `/login?redirect=/apply`

**ตาราง DB (อ้างอิง Master Plan + ขยาย):**

- `auth.users` (Supabase built-in) — เก็บ identity จาก Google / Phone / Email
- `users` — มี `id uuid references auth.users`, `email`, `full_name`, `phone` (ถ้ามี), `vote_credits` (สำหรับคนโหวต)
- `applicants` — เพิ่มคอลัมน์ `user_id uuid references auth.users` (nullable ได้ถ้าระบบรองรับสมัครก่อนมีบัญชี) เพื่อผูกผู้สมัครกับบัญชีที่ล็อกอิน

**ข้อความ UI (Copy for Web):**

- ปุ่ม: "Sign in with Google", "Continue with Phone", "Continue with Email"
- ข้อความ: "ลงทะเบียนหรือล็อกอินเพื่อสมัคร Miss Wellness World"
- OTP: "กรอกรหัส 6 หลักที่ส่งไปยัง [เบอร์/อีเมล]"

---

### 4.2 คนโหวต (Voter) – Registration ด้วย Google ก่อนโหวต

**วัตถุประสงค์:** ให้ผู้โหวตลงทะเบียนด้วย Google ก่อน จึงจะซื้อ Vote Credits และโหวตได้

| ขั้นตอน | รายละเอียด |
|---------|-------------|
| **1. เข้าหน้าโหวต** | ผู้ใช้เข้า `/voting` (หรือ `/vote`) → ดูรายชื่อผู้เข้าประกวด / Leaderboard |
| **2. ตรวจสอบ Auth** | เมื่อกด "โหวต" หรือ "ซื้อเครดิต" ถ้ายังไม่ล็อกอิน → redirect ไป **หน้า Login** (ใช้ Google เท่านั้นสำหรับคนโหวต) |
| **3. ลงทะเบียนด้วย Google** | ปุ่ม "Sign in with Google to Vote" → Supabase `signInWithOAuth({ provider: 'google' })` → หลังสำเร็จ สร้าง/อัปเดต `users` (vote_credits = 0) |
| **4. หลัง Login** | Redirect กลับหน้าโหวต → ผู้ใช้เติมเครดิต (Omise) แล้วกดโหวตได้ตามรูปแบบด้านล่าง |

**Route / Components แนะนำ:**

- ใช้หน้า Login ชุดเดียวกับผู้สมัคร แต่หน้าโหวตแสดงเฉพาะปุ่ม Google (หรือแยก `/voting/login` ที่มีแค่ Google)
- Middleware/Layout ของ `/voting`: ตรวจ session; การกดโหวต/ซื้อเครดิต ต้องมี session

---

### 4.3 รูปแบบการโหวต (Voting Flow) – รายละเอียดสำหรับ Implement

**ใช้กับ MWWT (30 คนสุดท้าย):** หมายเลข MWWT01–MWWT30 ตาม docs/contestants.md และ docs/voting_sponsors.md

| ขั้น | การทำงาน | หมายเหตุ |
|-----|-----------|----------|
| **1. หน้าโหวต** | แสดงรายชื่อผู้เข้าประกวด (รูป + ชื่อ + หมายเลข MWWT01–MWWT30) แบบ Grid หรือ List; แสดง Leaderboard (เรียงตาม vote_count) — อัปเดต real-time ผ่าน Supabase Realtime ได้ | Route: `/voting` หรือ `/voting/mwwt` |
| **2. เลือกผู้เข้าประกวด** | ผู้ใช้คลิกการ์ด/ปุ่ม "โหวต" ของผู้เข้าประกวดคนที่ต้องการ | เก็บ `applicant_id` ที่เลือก |
| **3. ตรวจสอบเครดิต** | ตรวจ `users.vote_credits` ว่าพอไหม (เช่น 1 โหวต = 1 credit หรือตามแพ็กที่กำหนด) | ถ้าไม่พอ → ไปขั้น 4 |
| **4. เติมเครดิต (ถ้าไม่พอ)** | แสดงราคาแพ็ก (เช่น 10 credits = xx บาท) → กด "ซื้อเครดิต" → ไปหน้า Checkout (Omise: QR / บัตร) → หลังชำระสำเร็จ เรียก API หรือ Webhook อัปเดต `users.vote_credits` และ `transactions` | ตาม Master Plan Phase 2; Idempotency + Webhook signature |
| **5. ยืนยันโหวต** | แสดง modal/sheet ยืนยัน: "โหวตให้ [ชื่อ] ใช้ X credits" → กดยืนยัน | |
| **6. บันทึกโหวต** | เรียก RPC `vote_for_applicant(user_id, applicant_id, amount)` (Master Plan) เพื่อหัก credit และเพิ่ม vote_count; อัปเดต Leaderboard ผ่าน Realtime | ป้องกัน double-spend และ race ด้วย RPC |
| **7. ปิดโหวต** | ปิดการโหวต 1 วันก่อนรอบ Final (ตั้งค่าในระบบหรือ cron) | ตาม docs/voting_sponsors.md |

**UI Components แนะนำ:**

- `VotingPage.tsx` — Layout หน้าโหวต (Leaderboard + Grid ผู้เข้าประกวด)
- `ContestantVoteCard.tsx` — การ์ดรูป + ชื่อ + หมายเลข + ปุ่ม "โหวต"
- `VoteConfirmModal.tsx` — ยืนยันจำนวน credits ที่ใช้
- `BuyCreditsSheet.tsx` — เลือกแพ็ก + เชื่อม Omise
- `Leaderboard.tsx` — แสดงอันดับ (subscribe Supabase Realtime)

**Route แนะนำ:**

- `app/voting/page.tsx` — หน้ารายชื่อ + Leaderboard (ต้องล็อกอินด้วย Google เพื่อโหวต/ซื้อเครดิต)
- `app/voting/buy/page.tsx` — หน้าเติมเครดิต (optional ถ้าไม่ใช้ sheet)

---

### 4.4 สรุป Auth Methods ตามบทบาท

| บทบาท | วิธีลงทะเบียนที่รองรับ | หมายเหตุ |
|--------|-------------------------|----------|
| **ผู้สมัคร (Applicant)** | Google **หรือ** Phone OTP **หรือ** Email OTP | เลือกอย่างใดอย่างหนึ่ง; ลงทะเบียนก่อนแล้วค่อยเข้า `/apply` |
| **คนโหวต (Voter)** | Google เท่านั้น | ลงทะเบียนก่อนแล้วค่อยโหวต/ซื้อเครดิต |
| **Admin** | Supabase Auth (Email/Password หรือ Invite) + กำหนด role `admin` ใน JWT หรือตาราง `users` | ใช้กับ `/admin` ตาม Master Plan |

---

## 5. หน้า Landing (จาก `index.html`)

### 5.1 โครงสร้างหน้า

- **Layout:** Header (sticky) + Hero + Philosophy + Past Titleholders + CTA Banner + Footer

### 5.2 Components ที่ต้องมี

| Section | Component / หน้าที่ | หมายเหตุ |
|---------|---------------------|----------|
| **Header** | `components/layout/Header.tsx` | Sticky, backdrop blur, logo + nav (Home, Philosophy, Role, Activities, Qualifications) + ปุ่ม "Apply Now" → ลิงก์ไป `/apply` |
| **Hero** | `components/marketing/HeroSection.tsx` | พื้นหลังรูป + gradient overlay, badge "Applications Open", หัวข้อ "Beauty with Wellness" + "สวยสร้างสุข", ปุ่ม "Apply for 2026" |
| **Philosophy** | `components/about/PhilosophySection.tsx` | พื้นหลัง primary, หัวข้อ "Our Philosophy" / "The Wellness Ambassador", ข้อความ + 3 การ์ด: Beauty, Happiness, Wellness (ไอคอน Material) |
| **Past Titleholders** | `components/halloffame/PastWinnersSection.tsx` | Grid 3 คอลัมน์ การ์ดรูป (aspect 3/4), gradient overlay; **ใช้เนื้อหาจาก `docs/contestants.md`** – ดูหัวข้อ 5.5 ด้านล่าง |
| **CTA Banner** | `components/marketing/CTABanner.tsx` | การ์ดครึ่งรูปครึ่งข้อความ "Ready to Inspire?", ปุ่ม "Start Application", ข้อความปิดรับสมัคร |
| **Footer** | `components/layout/Footer.tsx` | Logo, ข้อความสั้น, ลิงก์ Organization + Contestants, สื่อโซเชียล (IG, FB, YT), © + Privacy / Terms |

### 5.3 Routes (Next.js App Router)

- หน้าแรก: `app/(marketing)/page.tsx` หรือ `app/page.tsx`
- Layout ร่วม: `app/(marketing)/layout.tsx` – ใช้ Header + Footer + BackToTop ตาม Master Plan

### 5.4 SEO / Metadata

- Title: "Miss Wellness World 2026"
- Description: เกี่ยวกับเวทีประกวดและ beauty with wellness
- Open Graph / Twitter card สำหรับแชร์

### 5.5 เนื้อหาหน้า Landing (จาก `docs/home.md`, `docs/about.md`)

ใช้ข้อความด้านล่างเวลา implement แต่ละ section – คัดจาก docs เพื่อใส่ในเว็บโดยตรง

| Section | ไฟล์อ้างอิง | ข้อความที่ใช้ (Copy for Web) |
|---------|-------------|------------------------------|
| **Hero – Headline** | home.md | **"WHO Will Be The First Miss Wellness World"** |
| **Hero – Slogan** | home.md | **English:** "Beauty with Wellness" · **Thai:** "สวยสร้างสุข" |
| **Hero – Vision (optional)** | home.md | "To promote Thailand as the World Wellness Capital." |
| **Hero – Mission** | home.md | "To be a Wellness Ambassador, enhancing Thailand's image as a country with economic potential in wellness, promoting wellness concepts, and raising awareness of wellness among the people." |
| **Contest Overview – Headline** | home.md | "Beauty with Wellness" |
| **Contest Overview – Description** | home.md | Miss Wellness World is an international pageant aiming to find women who can be role models for wellness across 30+ countries. It serves as a new compass pointing towards "sustainable beauty" and "true happiness" for humanity. |
| **Three Pillars** | home.md, about.md | **Beauty:** Compositionality, Proportionality, Integrationality (งามกาย งามใจ งามจิต). **Happiness:** "True happiness" from within. **Wellness:** Completeness in body, mind, spirit. Slogan: Beauty with Wellness (สวยสร้างสุข). |
| **Philosophy – Headline** | about.md | "The Wellness Ambassador" / "Our Philosophy" |
| **Philosophy – Paragraph** | about.md | "We are not just looking for a queen; we are searching for a woman who embodies the perfect balance of mind, body, and spirit. Someone who inspires others to live a healthier, happier life through her own example." (หรือใช้ Vision/Mission จาก about.md ตาม layout) |
| **MWW Vision** | about.md | "Through a shared commitment to well-being, creativity, and collaboration, Miss Wellness World inspires a global movement that elevates personal health, nurtures resilient communities, and fosters sustainable impact for future generations." |
| **MWW Mission** | about.md | "To discover, empower, and connect women globally who embody the highest values of wellness, innovation, and authentic leadership." |
| **CTA Banner** | home.md | "Ready to Inspire?" / "Join the movement. Become the next face of holistic wellness and represent your country on the global stage." / "Start Application" |
| **Footer – Tagline** | about.md | "Celebrating beauty that comes from within. A global platform empowering women to lead with health, happiness, and holistic well-being." |
| **Footer – Org links** | mockup | About Us, Our History, Sponsorship, Press & Media |
| **Footer – Contestants links** | mockup | Requirements, Application Portal, FAQ, Contact Support |

**Hall of Fame / Past Titleholders (จาก `docs/contestants.md`)** — ใช้กับ §5.2 Past Titleholders:


- **MWW (Global):** Winner – **Jessica Trindade Bruxelas** (Miss Wellness World 2025, Brazil). Runners-up: 1st **Joann Tiong** (Malaysia), 2nd **Kanokorn Rungruksa** (Thailand), 3rd **Angelica Juliana Yanna Panopio** (Philippines), 4th **Feby Wulan Sari** (Indonesia). แสดง Quote ของผู้ได้รับตำแหน่ง + โลโก้มงกุฎ/ธงชาติ.
- **MWWT (Thailand):** Winner – **กนกภรณ์ รุ่งรักษา (Kanokorn Rungruksa)** Miss Wellness World Thailand 2024. Runners-up: 1st พิชญ์ชญา อ่อนมิ่ง, 2nd ภัทรชญา นราเสริมชีพ, 3rd อิศริยา รอดวิเศษ, 4th ธนัชพร เหล่าไพโรจน์จารี.
- **Layout:** Grid 3 คอลัมน์ (Desktop), Hover effects; บางส่วนอาจเป็น "Coming Soon" + QR/กำหนดการ.

---

## 6. หน้าฟอร์มสมัคร (จาก `admin.html` – Application Portal)

หมายเหตุ: ไฟล์ mockup ชื่อ `admin.html` แต่เนื้อหาเป็น **ฟอร์มสมัครผู้เข้าประกวด** จึง map เป็น route `/apply`

### 6.1 โครงสร้างหน้า

- **Layout:** Sidebar (ซ้าย) + Main content (ฟอร์ม)
- **Sidebar:** Logo, Application ID, Stepper 4 ขั้น, Completion status (progress bar), Save Draft, Need Help
- **Auth:** ต้องล็อกอินก่อนเข้า Apply (ดู §4.1)

### 6.2 ขั้นตอนฟอร์ม (4 Steps)

| Step | ชื่อ (จาก mockup) | เนื้อหาหลัก | Route ย่อย (แนะนำ) |
|------|-------------------|-------------|----------------------|
| 1 | Personal Profile | รูปโปรไฟล์, ชื่อ-นามสกุล, วันเกิด, โทร, ที่อยู่, โซเชียล (optional) | `/apply` หรือ `/apply/profile` |
| 2 | Wellness Journey | (จากชื่อ step) | `/apply/wellness` |
| 3 | Vision & Essay | (จากชื่อ step) | `/apply/essay` |
| 4 | Review & Submit | สรุป + ยืนยัน + อัปโหลดสลิป/ชำระเงิน | `/apply/review` |

### 6.3 Components ฟอร์มสมัคร

| Component | หน้าที่ |
|-----------|---------|
| `ApplyLayout` | Layout มี Sidebar + main area (responsive: mobile แสดง header + progress bar แทน sidebar เต็มรูปแบบ) |
| `ApplySidebar` | Logo, Application ID, Stepper (active/inactive), Completion %, Save Draft, FAQ |
| `StepPersonalProfile` | อัปโหลดรูป, First/Last name, DOB, Phone, Address (Street, City, State, Zip), Instagram/LinkedIn (optional) |
| `StepWellnessJourney` | เนื้อหาตามที่ออกแบบต่อ (ยังไม่มีใน mockup) |
| `StepVisionEssay` | เนื้อหาตามที่ออกแบบต่อ |
| `StepReviewSubmit` | สรุปข้อมูล + อัปโหลดสลิป/ชำระเงิน ตาม Master Plan (Omise หรือ Manual Bank Transfer) |

### 6.4 Form Fields (Step 1 – Personal Profile) จาก Mockup

- Profile Photo: upload รูป (drag & drop หรือคลิก), แนะนำ high-res headshot, max 5MB, รองรับ JPG, PNG, HEIC
- First Name *, Last Name *
- Date of Birth * (placeholder MM/DD/YYYY)
- Phone Number *
- Current Address (Street); City, State/Province, Zip/Postal Code
- Online Presence (Optional): Instagram Handle (@), LinkedIn Profile (in/)

การ map กับ DB: ใช้ schema `applicants` ใน Master Plan (first_name, last_name, nickname, age, height, weight, proportions, phone, email, line_id, photo_half_url, photo_full_url, video_url, payment_slip_url, status ฯลฯ). ชื่อฟิลด์อาจเพิ่ม/ลดให้ตรงกับฟอร์ม (เช่น date_of_birth แทน age ถ้าคำนวณอายุจาก DOB)

### 6.5 Routes (App Router)

- Layout ฟอร์ม: `app/apply/layout.tsx` – ใช้ `ApplyLayout`
- แต่ละ step: `app/apply/page.tsx` (step 1) หรือ `app/apply/[step]/page.tsx` ถ้าใช้ dynamic segment

### 6.6 พฤติกรรมและ Tech

- **Save Draft:** บันทึก state ลง Supabase (draft) หรือ local storage ชั่วคราว
- **Validation:** Zod schema ตาม Master Plan (applicantSchema) ทั้ง client และ server
- **Upload รูป:** Supabase Storage (bucket เช่น `mwwt-uploads`), ใช้ client-side compression (เช่น browser-image-compression) ตาม Master Plan
- **หลัง Submit:** ส่งอีเมลยืนยัน (Resend) + แนบ PDF ใบสมัคร (@react-pdf/renderer)

### 6.7 เนื้อหาหน้าสมัคร (จาก `docs/apply.md`)

ใช้ข้อความด้านล่างในหน้า Apply / หน้าคุณสมบัติ / FAQ สมัคร

| ใช้ที่ | เนื้อหา (Copy for Web) |
|--------|------------------------|
| **Intro** | Miss Wellness World Thailand (MWWT) — "Beauty with Wellness". We are looking for women who are ready to be the "Wellness Ambassador" for Thailand—ladies who possess beauty of the body, mind, and spirit to drive the "Wellness Nation" movement. |
| **คุณสมบัติผู้สมัคร** | **Gender & Nationality:** Female by birth, Thai nationality, holding a Thai National ID card. **Age:** 18–32 years old (as of application date). Applicants under 20 must have parental consent. **Marital Status:** Single, never previously married (legally or de facto), and never given birth. **Attributes:** Good personality, intelligent, good interpersonal skills; ability to use Social Media effectively; physically and mentally healthy. **Prohibitions:** No history of drug use or smoking; no nude/semi-nude/indecent photos; no criminal record or illegal profession; not bankrupt. |
| **เอกสารที่ต้องเตรียม** | 1) Introduction Video (ไม่เกิน 2 นาที). 2) Photos (No Filter/No Makeup): Straight face (Close-up), Left & Right profile, Half-body, Full-body. 3) Activity Photos (social work/volunteer). 4) Application Fee Slip. |
| **ขั้นตอนสมัคร** | 1) Online Registration: กรอกฟอร์ม + อัปโหลด Video, Photos, Payment Slip. 2) Confirmation: รับ PDF Application Form ทางอีเมล. 3) Timeline: Application Period เปิด – 31 Aug 2025; Round 1 (Screening) → 120 candidates; Round 2 (Audition) → 30; Boot Camp & Preliminaries (30 Direct + 30 Provincial = 60 → Final 30); Finalist Announcement 6 Sep 2025; Orientation (Online) 8 Sep 2025. |
| **MWW International** | Represent Your Country on the Global Stage. Women 18–32 embodying "Beauty with Wellness". International candidates selected through National Directors (ND). For ND/License: Contact via email → receive Google Form → Country & Candidate featured on official site. |
| **Contact สมัคร** | Email: misswellnessworldth.2025@gmail.com · Facebook: facebook.com/misswellnessworld · Instagram: @misswellnessworld |

---

## 7. Admin Dashboard (อ้างอิง Master Plan เท่านั้น – ไม่มี mockup)

- หน้าสำหรับทีมงาน: ล็อกอิน (Supabase Auth), ดูรายชื่อผู้สมัคร, ตรวจสลิปโอนเงิน, Approve/Reject
- Route: `app/admin/` (protected by role เช่น `auth.jwt() ->> 'role' = 'admin'`)
- UI: ตาราง + filter/ค้นหา + ปุ่มดูรูปสลิป/อนุมัติ

---

## 8. หน้าอื่นๆ ที่ใช้เนื้อหาจาก docs

| หน้า | Route | ไฟล์เนื้อหา | เนื้อหาหลัก |
|------|--------|-------------|-------------|
| **About Us** | `/about` | docs/about.md | คณะผู้บริหาร (Prof. Dr. Kriengsak, คุณศกุณา, คุณมณฑกานต์, คุณพิราวรรณ), MWW Vision/Mission, MWWT Concept (Beauty, Happiness, Wellness), The Crown (Emerald Green, Pearl) |
| **Contact** | `/contact` | docs/contact.md | ช่องทางออนไลน์ (Email, Facebook, Instagram, Website), Key Contact Persons (รายชื่อทีมบริหาร), ฟอร์มส่งข้อความ (First Name, Last Name, Email, Subject, Message) |
| **Voting / Sponsors** | `/voting`, `/sponsors` หรือ section ในหน้า | docs/voting_sponsors.md | ระบบโหวต MWW vs MWWT, ขั้นตอนโหวต (เลือกรูป/หมายเลข → ชำระเงิน → ปิดโหวต 1 วันก่อนรอบ Final), รายชื่อสปอนเซอร์และรางวัล (Decathlon, So Cute Clinic, Cleo Clinic, Saffron, New You Life, Roy Gem Gallery ฯลฯ) |

**About – คณะผู้บริหาร (จาก docs/about.md):**
- **Prof. Dr. Kriengsak Chareonwongsak:** Founder & Chairman; Senior Fellow Harvard, Chairman NBI, President International Society of Wellness; ริเริ่ม "Beauty with Wellness".
- **Ms. Sakuna Rojanapanich:** Managing Director, Miss Wellness World (ระดับนานาชาติ).
- **Ms. Montakarn Jaiareeramrung:** Managing Director, Miss Wellness World Thailand.
- **Ms. Pirawan Pasayamart:** Managing Director MWW & MWWT / Director of PR, Marketing, Event and Sponsor; Official Copyright Holder and Organizer.

**Contact – ช่องทาง (จาก docs/contact.md):**
- Email: misswellnessworldth.2025@gmail.com
- Facebook: facebook.com/misswellnessworld
- Instagram: @misswellnessworld
- Website: https://misswellnessworld.com/
- Contact persons: เหมือน About + Ms. Lanchakorn Butwong (Producer).

**Voting (จาก docs/voting_sponsors.md):**
- **MWW (Global):** โหวตตามรูป + ประเทศ; ชำระ (Credit Card / QR ตามที่กำหนด); Leaderboard real-time ได้.
- **MWWT:** โหวต 30 คนสุดท้าย (MWWT01–MWWT30); เลือกรูป/หมายเลข → โอนเงิน/ตรวจยอด → ปิดโหวต 1 วันก่อนรอบ Final. Side stages (Angel 8–12 ปี, Princess 14–17 ปี) ใช้ระบบโหวตคล้ายกัน.

---

## 9. โครงสร้างโฟลเดอร์และไฟล์ (สรุป)

```
app/
  (marketing)/
    layout.tsx
    page.tsx          # Home
    about/
      page.tsx        # About Us (เนื้อหาจาก docs/about.md)
    contact/
      page.tsx        # Contact (เนื้อหาจาก docs/contact.md)
  (auth)/
    login/
      page.tsx        # เลือกวิธีล็อกอิน (Google / Phone / Email)
      phone/
      email/
  apply/
    layout.tsx        # ตรวจ Auth → redirect /login ถ้าไม่ล็อกอิน
    page.tsx          # หรือ [step]/page.tsx
  voting/
    page.tsx          # รายชื่อผู้เข้าประกวด + Leaderboard (ต้องล็อกอิน Google เพื่อโหวต)
    buy/
  admin/
    layout.tsx
    page.tsx

components/
  layout/
    Header.tsx
    Footer.tsx
  ui/                 # shadcn
    button.tsx
    input.tsx
    label.tsx
    card.tsx
    ...
  marketing/
    HeroSection.tsx
    CTABanner.tsx
  about/
    PhilosophySection.tsx
  halloffame/
    PastWinnersSection.tsx
  auth/
    LoginForm.tsx
    GoogleSignInButton.tsx
    PhoneOTPForm.tsx
    EmailOTPForm.tsx
  application/
    ApplyLayout.tsx
    ApplySidebar.tsx
    StepPersonalProfile.tsx
    StepWellnessJourney.tsx
    StepVisionEssay.tsx
    StepReviewSubmit.tsx
  pdf/
    ApplicationPDF.tsx
  voting/
    VotingPage.tsx
    ContestantVoteCard.tsx
    VoteConfirmModal.tsx
    BuyCreditsSheet.tsx
    Leaderboard.tsx
```

---

## 10. Checklist การ Implement (สั้น)

- [ ] สร้างโปรเจกต์ Next.js 16 + Tailwind v4 + shadcn (canary สำหรับ Tailwind v4)
- [ ] ตั้งค่า design tokens (สี, font) ใน Tailwind และใช้กับ shadcn theme
- [ ] ทำ Layout (marketing): Header, Footer, BackToTop
- [ ] ทำ Landing: Hero, Philosophy, Past Winners, CTA, เชื่อมลิงก์ "Apply" → `/apply`
- [ ] ทำ Apply layout + Sidebar + Stepper
- [ ] ทำ Step 1 (Personal Profile) + validation (Zod) + อัปโหลดรูป (Supabase Storage + compression)
- [ ] ทำ Step 2–4 ตาม UX ที่ออกแบบเพิ่ม
- [ ] เชื่อม Supabase (applicants table, RLS), Resend, PDF
- [ ] ทำ Admin dashboard พื้นฐาน (ดูรายชื่อ + ตรวจสลิป)
- [ ] Deploy บน Vercel
- [ ] ระบบ Auth: Login/Register (Google, Phone OTP, Email OTP) สำหรับผู้สมัคร; Google เท่านั้นสำหรับคนโหวต (§4)
- [ ] ป้องกัน /apply และ /voting ด้วย middleware หรือ layout ตรวจ session
- [ ] ใส่เนื้อหาจริงจาก `docs/` ตาม Section 5.5, 6.7, 8 และ 11

---

## 11. อ้างอิงเนื้อหา docs (สำหรับเวลา build เว็บไซต์)

เวลาเอาข้อมูลไปสร้างเว็บไซต์ ให้ดึงข้อความและโครงหน้าจากโฟลเดอร์ **`docs/`** ตามตารางด้านล่าง

| ไฟล์ docs | ใช้กับหน้า/Component | เนื้อหาที่ต้องใส่ในเว็บ |
|-----------|------------------------|--------------------------|
| **docs/home.md** | หน้าแรก (Hero, Contest Overview, Three Pillars) | Headline "WHO Will Be The First Miss Wellness World", Slogan "Beauty with Wellness" / "สวยสร้างสุข", Vision/Mission, คำอธิบายแนวคิดประกวด 3 เสาหลัก (Beauty, Happiness, Wellness), เป้าหมาย Wellness Ambassador. รวมถึง Design System (สี #0a5138, #ca8a04, Typography Inter, Animation heroFadeInSmooth, scroll-triggered fade-in). |
| **docs/about.md** | หน้า About (`/about`), Section Philosophy บนหน้าแรก | คณะผู้บริหาร (Prof. Dr. Kriengsak, คุณศกุณา, คุณมณฑกานต์, คุณพิราวรรณ), MWW Vision & Mission (ข้อความเต็ม), MWWT Concept (Beauty / Happiness / Wellness รายละเอียด), The Crown (Emerald Green, Pearl), Slogan Beauty with Wellness (สวยสร้างสุข). |
| **docs/apply.md** | หน้าสมัคร (`/apply`), หน้าคุณสมบัติ, FAQ, หน้าแนวทางสมัคร | คุณสมบัติผู้สมัคร (เพศ สัญชาติ อายุ 18–32 สถานะโสด ฯลฯ), ข้อห้าม, เอกสารที่ต้องเตรียม (Video 2 นาที, รูป No Filter, Activity Photos, สลิปค่าสมัคร), ขั้นตอนสมัครและ Timeline (Round 1/2, Boot Camp, Finalist 6 Sep, Orientation 8 Sep), ข้อมูล MWW International + National Directors, Contact สมัคร (Email, FB, IG). |
| **docs/contestants.md** | Hall of Fame / Past Titleholders, หน้ารายชื่อผู้เข้าประกวด | MWW: Winner Jessica Trindade Bruxelas (Brazil), Runners-up 1–4 (Joann Tiong, Kanokorn Rungruksa, Angelica Juliana Yanna Panopio, Feby Wulan Sari), Quote, โลโก้/ธง. MWWT: Winner กนกภรณ์ รุ่งรักษา, Runners-up 1–4 (ชื่อเต็ม). Contestants: รูป + หมายเลข MWWT01–MWWT30, ระบบโหวต. Side stages: Angel of Wellness (8–12 ปี), Princess of Wellness (14–17), Wellness Icon. Technical: Grid 3 คอลัมน์, Hover effects, Coming Soon. |
| **docs/contact.md** | หน้า Contact (`/contact`) | ช่องทางออนไลน์ (Email, Facebook, Instagram, Website), Key Contact Persons (รายชื่อและบทบาท), ฟอร์มส่งข้อความ (First Name, Last Name, Email, Subject, Message). |
| **docs/voting_sponsors.md** | หน้า/Section โหวต และ Sponsors | โหวต MWW vs MWWT (กลไก เลือกรูป/ประเทศหรือหมายเลข ชำระเงิน ปิดโหวต 1 วันก่อน Final), Side stages โหวต. รายชื่อสปอนเซอร์และรางวัล: Decathlon (Grace in Swimwear), So Cute Clinic (Miss Luminous Complexion), Cleo Clinic, Saffron Laboratories (Miss Beaming Charm), New You Life Thailand, Roy Gem Gallery (3rd Runner-up), Grand Better International, Marin Times, ผลิตภัณฑ์ท้องถิ่น (ผ้าล้านนา คราม ลูกประคบ ฯลฯ). |

**หมายเหตุ:** ข้อความใน spec ข้อ 5.5, 6.7 และ 8 เป็นสรุปสำหรับ copy ลง component; ถ้าต้องการข้อความเต็มหรือรูปแบบย่อหน้าให้เปิดไฟล์ใน `docs/` โดยตรง.

---

*สเปกนี้ใช้ mockup ปัจจุบัน เนื้อหาจาก docs/ และ tech stack จาก MWW_Technical_MasterPlan.md การเพิ่มฟีเจอร์ (เช่น ระบบโหวต Phase 2) ให้อ้างอิง Master Plan โดยตรง*
