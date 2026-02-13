# MWW Mockup Implementation Spec

**Project:** Miss Wellness World Thailand 2025 (MWWT)  
**Source:** `mockup/index.html`, `mockup/admin.html`  
**Tech Stack Reference:** [MWW_Technical_MasterPlan.md](./MWW_Technical_MasterPlan.md)  
**Status:** Draft for Development  
**Date:** 2026-02-13

---

## 1. บทสรุป (Overview)

สเปกนี้แปลง UI จาก HTML mockup เป็นรายละเอียดสำหรับ implement ด้วย tech stack ตาม Master Plan: **Next.js 16+ (App Router)**, **Tailwind CSS v4**, **shadcn/ui**, **Supabase**, **Vercel**.

| Mockup File    | หน้าที่ได้ | Route (แนะนำ)        |
|----------------|------------|------------------------|
| `index.html`   | หน้า Landing / Marketing | `(marketing)/` หรือ `/` |
| `admin.html`   | ฟอร์มสมัครหลายขั้นตอน (Application Portal) | `/apply` |

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

## 4. หน้า Landing (จาก `index.html`)

### 4.1 โครงสร้างหน้า

- **Layout:** Header (sticky) + Hero + Philosophy + Past Titleholders + CTA Banner + Footer

### 4.2 Components ที่ต้องมี

| Section | Component / หน้าที่ | หมายเหตุ |
|---------|---------------------|----------|
| **Header** | `components/layout/Header.tsx` | Sticky, backdrop blur, logo + nav (Home, Philosophy, Role, Activities, Qualifications) + ปุ่ม "Apply Now" → ลิงก์ไป `/apply` |
| **Hero** | `components/marketing/HeroSection.tsx` | พื้นหลังรูป + gradient overlay, badge "Applications Open", หัวข้อ "Beauty with Wellness" + "สวยสร้างสุข", ปุ่ม "Apply for 2026" |
| **Philosophy** | `components/about/PhilosophySection.tsx` | พื้นหลัง primary, หัวข้อ "Our Philosophy" / "The Wellness Ambassador", ข้อความ + 3 การ์ด: Beauty, Happiness, Wellness (ไอคอน Material) |
| **Past Titleholders** | `components/halloffame/PastWinnersSection.tsx` | Grid 3 คอลัมน์ การ์ดรูป (aspect 3/4), gradient overlay, label Winner / 1st Runner Up / 2nd Runner Up |
| **CTA Banner** | `components/marketing/CTABanner.tsx` | การ์ดครึ่งรูปครึ่งข้อความ "Ready to Inspire?", ปุ่ม "Start Application", ข้อความปิดรับสมัคร |
| **Footer** | `components/layout/Footer.tsx` | Logo, ข้อความสั้น, ลิงก์ Organization + Contestants, สื่อโซเชียล (IG, FB, YT), © + Privacy / Terms |

### 4.3 Routes (Next.js App Router)

- หน้าแรก: `app/(marketing)/page.tsx` หรือ `app/page.tsx`
- Layout ร่วม: `app/(marketing)/layout.tsx` – ใช้ Header + Footer + BackToTop ตาม Master Plan

### 4.4 SEO / Metadata

- Title: "Miss Wellness World 2026"
- Description: เกี่ยวกับเวทีประกวดและ beauty with wellness
- Open Graph / Twitter card สำหรับแชร์

---

## 5. หน้าฟอร์มสมัคร (จาก `admin.html` – Application Portal)

หมายเหตุ: ไฟล์ mockup ชื่อ `admin.html` แต่เนื้อหาเป็น **ฟอร์มสมัครผู้เข้าประกวด** จึง map เป็น route `/apply`

### 5.1 โครงสร้างหน้า

- **Layout:** Sidebar (ซ้าย) + Main content (ฟอร์ม)
- **Sidebar:** Logo, Application ID, Stepper 4 ขั้น, Completion status (progress bar), Save Draft, Need Help

### 5.2 ขั้นตอนฟอร์ม (4 Steps)

| Step | ชื่อ (จาก mockup) | เนื้อหาหลัก | Route ย่อย (แนะนำ) |
|------|-------------------|-------------|----------------------|
| 1 | Personal Profile | รูปโปรไฟล์, ชื่อ-นามสกุล, วันเกิด, โทร, ที่อยู่, โซเชียล (optional) | `/apply` หรือ `/apply/profile` |
| 2 | Wellness Journey | (จากชื่อ step) | `/apply/wellness` |
| 3 | Vision & Essay | (จากชื่อ step) | `/apply/essay` |
| 4 | Review & Submit | สรุป + ยืนยัน + อัปโหลดสลิป/ชำระเงิน | `/apply/review` |

### 5.3 Components ฟอร์มสมัคร

| Component | หน้าที่ |
|-----------|---------|
| `ApplyLayout` | Layout มี Sidebar + main area (responsive: mobile แสดง header + progress bar แทน sidebar เต็มรูปแบบ) |
| `ApplySidebar` | Logo, Application ID, Stepper (active/inactive), Completion %, Save Draft, FAQ |
| `StepPersonalProfile` | อัปโหลดรูป, First/Last name, DOB, Phone, Address (Street, City, State, Zip), Instagram/LinkedIn (optional) |
| `StepWellnessJourney` | เนื้อหาตามที่ออกแบบต่อ (ยังไม่มีใน mockup) |
| `StepVisionEssay` | เนื้อหาตามที่ออกแบบต่อ |
| `StepReviewSubmit` | สรุปข้อมูล + อัปโหลดสลิป/ชำระเงิน ตาม Master Plan (Omise หรือ Manual Bank Transfer) |

### 5.4 Form Fields (Step 1 – Personal Profile) จาก Mockup

- Profile Photo: upload รูป (drag & drop หรือคลิก), แนะนำ high-res headshot, max 5MB, รองรับ JPG, PNG, HEIC
- First Name *, Last Name *
- Date of Birth * (placeholder MM/DD/YYYY)
- Phone Number *
- Current Address (Street); City, State/Province, Zip/Postal Code
- Online Presence (Optional): Instagram Handle (@), LinkedIn Profile (in/)

การ map กับ DB: ใช้ schema `applicants` ใน Master Plan (first_name, last_name, nickname, age, height, weight, proportions, phone, email, line_id, photo_half_url, photo_full_url, video_url, payment_slip_url, status ฯลฯ). ชื่อฟิลด์อาจเพิ่ม/ลดให้ตรงกับฟอร์ม (เช่น date_of_birth แทน age ถ้าคำนวณอายุจาก DOB)

### 5.5 Routes (App Router)

- Layout ฟอร์ม: `app/apply/layout.tsx` – ใช้ `ApplyLayout`
- แต่ละ step: `app/apply/page.tsx` (step 1) หรือ `app/apply/[step]/page.tsx` ถ้าใช้ dynamic segment

### 5.6 พฤติกรรมและ Tech

- **Save Draft:** บันทึก state ลง Supabase (draft) หรือ local storage ชั่วคราว
- **Validation:** Zod schema ตาม Master Plan (applicantSchema) ทั้ง client และ server
- **Upload รูป:** Supabase Storage (bucket เช่น `mwwt-uploads`), ใช้ client-side compression (เช่น browser-image-compression) ตาม Master Plan
- **หลัง Submit:** ส่งอีเมลยืนยัน (Resend) + แนบ PDF ใบสมัคร (@react-pdf/renderer)

---

## 6. Admin Dashboard (อ้างอิง Master Plan เท่านั้น – ไม่มี mockup)

- หน้าสำหรับทีมงาน: ล็อกอิน (Supabase Auth), ดูรายชื่อผู้สมัคร, ตรวจสลิปโอนเงิน, Approve/Reject
- Route: `app/admin/` (protected by role เช่น `auth.jwt() ->> 'role' = 'admin'`)
- UI: ตาราง + filter/ค้นหา + ปุ่มดูรูปสลิป/อนุมัติ

---

## 7. โครงสร้างโฟลเดอร์และไฟล์ (สรุป)

```
app/
  (marketing)/
    layout.tsx
    page.tsx
  apply/
    layout.tsx
    page.tsx          # หรือ [step]/page.tsx
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
  application/
    ApplyLayout.tsx
    ApplySidebar.tsx
    StepPersonalProfile.tsx
    StepWellnessJourney.tsx
    StepVisionEssay.tsx
    StepReviewSubmit.tsx
  pdf/
    ApplicationPDF.tsx
```

---

## 8. Checklist การ Implement (สั้น)

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

---

*สเปกนี้ใช้ mockup ปัจจุบันและ tech stack จาก MWW_Technical_MasterPlan.md เท่านั้น การเพิ่มฟีเจอร์ (เช่น ระบบโหวต Phase 2) ให้อ้างอิง Master Plan โดยตรง*
