# Code Quality Rules (Auto-enforced)

เมื่อเขียนหรือแก้ไข code ให้ตรวจสอบอัตโนมัติ:

1. ทุก function ต้องมี return type annotation
2. ห้ามใช้ `any` — ใช้ `unknown` + type narrowing แทน
3. ทุก async function ต้องมี try-catch หรือ Result pattern
4. ห้ามมี `console.log` ใน production code — ใช้ logger
5. ทุก magic number ต้องเป็น named constant
6. Functions ไม่เกิน 40 บรรทัด — ถ้ายาวกว่าให้แยก
7. Parameters ไม่เกิน 3 ตัว — ถ้าเยอะกว่าให้ใช้ options object
8. Nesting ไม่เกิน 3 ชั้น — ถ้าลึกกว่าให้ใช้ early return
9. ห้าม export default — ใช้ named exports เสมอ
10. Import order: external → internal → types → styles
