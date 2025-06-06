# 🧪 Local Testing Guide

วิธีทดสอบ Realtime Gold & Silver Prices Component ในเครื่องก่อน deploy

## 🚀 วิธีเริ่ม Local Server

### 1. ใช้ Python (แนะนำ)

```bash
# เข้าไปใน folder project
cd /Users/teerayutht/WorkSpace/gem_sep_2025

# Python 3
python -m http.server 8000

# หรือ Python 2
python -m SimpleHTTPServer 8000
```

### 2. ใช้ Node.js

```bash
# ติดตั้ง http-server (ครั้งเดียว)
npm install -g http-server

# เริ่ม server
http-server -p 8000 -c-1
```

### 3. ใช้ PHP

```bash
php -S localhost:8000
```

### 4. ใช้ VS Code Live Server

1. ติดตั้ง Extension "Live Server"
2. คลิกขวาที่ `local-test.html`
3. เลือก "Open with Live Server"

## 🌐 เปิดทดสอบ

หลังเริ่ม server แล้ว เปิด browser ไปที่:

```
http://localhost:8000/local-test.html
```

## 🎮 Test Controls ที่มี

### 🚀 **เริ่มทดสอบ Component**
- สร้าง 3 components พร้อมกัน
- Full component (พร้อมหัวข้อ)
- Compact component (ไม่มีหัวข้อ)
- Custom interval component (อัพเดททุก 5 วินาที)

### 🔌 **ทดสอบ API Connection**
- ทดสอบการเชื่อมต่อ API จริง
- แสดง response ใน Debug Console
- ตรวจสอบ CORS และ network errors

### ⏹️ **หยุดการอัพเดท**
- หยุด real-time updates ทุก components
- ประหยัด API calls ขณะทดสอบ

### ▶️ **เริ่มการอัพเดท**
- เริ่ม real-time updates ใหม่
- กลับมาอัพเดทตามปกติ

### 🎭 **ใช้ Mock Data**
- เปลี่ยนเป็น mock data สำหรับทดสอบ
- ไม่ต้องพึ่งพา API จริง
- ข้อมูลจะเปลี่ยนแปลงเล็กน้อยเพื่อจำลอง

### 🗑️ **Clear Component**
- ลบ components ทั้งหมด
- เคลียร์ memory และ intervals

## 🐛 Debug Console

- แสดง log messages แบบ real-time
- ตรวจสอบ API calls
- ดู errors และ warnings
- Timestamp ทุก message

## 📱 ทดสอบ Responsive

ทดสอบใน browser:

1. **Desktop**: เปิด full screen
2. **Tablet**: กด F12 → Device Toolbar → iPad
3. **Mobile**: เลือก iPhone หรือ Android

## 🔍 สิ่งที่ควรตรวจสอบ

### ✅ **Functionality**
- [ ] Components แสดงผลถูกต้อง
- [ ] API calls ทำงาน
- [ ] Real-time updates ทุก 3 วินาที
- [ ] Change calculation ถูกต้อง
- [ ] Error handling

### ✅ **UI/UX**
- [ ] Responsive ทุกขนาดหน้าจอ
- [ ] Colors และ styling ถูกต้อง
- [ ] Hover effects
- [ ] Loading states
- [ ] Typography (!important CSS)

### ✅ **Performance**
- [ ] Memory leaks (ดู Performance tab)
- [ ] Network usage สมเหตุสมผล
- [ ] CPU usage ไม่สูงเกินไป

## 🚨 Troubleshooting

### ปัญหา CORS
```
Access to fetch at '...' from origin 'http://localhost:8000' has been blocked by CORS policy
```

**วิธีแก้:**
1. ใช้ Mock Data ก่อน
2. หรือติดตั้ง CORS browser extension
3. หรือใช้ proxy server

### ปัญหา File Path
```
404 Not Found: css/realtime.css
```

**วิธีแก้:**
- ตรวจสอบว่าอยู่ในโฟลเดอร์ที่ถูกต้อง
- ตรวจสอบ file structure:
```
gem_sep_2025/
├── local-test.html
├── css/
│   └── realtime.css
└── scripts/
    └── realtime.js
```

### Component ไม่แสดงผล
1. เช็ค Console (F12) หา JavaScript errors
2. ตรวจสอบว่า files โหลดครบ
3. ดู Network tab ว่า files โหลดสำเร็จ

## 📋 Test Checklist

### การทดสอบพื้นฐาน
- [ ] เปิด `local-test.html` ได้
- [ ] เห็น 3 components
- [ ] Debug console แสดง messages
- [ ] Control buttons ทำงาน

### การทดสอบ API
- [ ] กด "ทดสอบ API Connection"
- [ ] ดู response ใน debug console
- [ ] ตรวจสอบ API URLs ถูกต้อง

### การทดสอบ Mock Data
- [ ] กด "ใช้ Mock Data"
- [ ] เห็นข้อมูลแสดงผล
- [ ] ราคาเปลี่ยนแปลงเล็กน้อย
- [ ] Change calculation ทำงาน

### การทดสอบ Controls
- [ ] หยุด/เริ่ม updates ทำงาน
- [ ] Clear component ทำงาน
- [ ] สร้าง component ใหม่ได้

## 🎯 เมื่อทดสอบเสร็จ

1. **ถ้าทุกอย่างทำงานดี**: Push files ขึ้น GitHub
2. **ถ้ามีปัญหา**: แก้ไขใน local files ก่อน
3. **อัพเดท version**: เปลี่ยน version tag ใน CDN URLs

---

💡 **Tips**: ใช้ Network tab ใน DevTools ดู API calls และ file loading เพื่อ debug ปัญหา