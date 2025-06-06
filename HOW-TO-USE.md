# 🥇 Gold & Silver Analytics - CDN Usage Guide

เครื่องมือวิเคราะห์ราคาทองคำและเงิน พร้อมเครื่องคำนวณและ UI Components ที่สามารถใช้งานผ่าน CDN ได้ทันที

## 🚀 Quick Start

### วิธีที่ 1: ใช้งานแบบเต็ม (All Components)

```html
<!-- 1. เพิ่ม CSS ใน <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/hero.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/stats.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/features.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/cta.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/calculator.css">

<!-- 2. เพิ่ม HTML elements ในตำแหน่งที่ต้องการ -->
<div id="hero"></div>
<div id="stats"></div>
<div id="features-container"></div>
<div id="calculator-app"></div>
<div id="cta"></div>

<!-- 3. เพิ่ม JavaScript ก่อนปิด </body> -->
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/common.js"></script>
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/components.js"></script>
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/calculator.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('hero')) new GemApp.HeroSection('hero');
    if (document.getElementById('stats')) new GemApp.StatsSection('stats');
    if (document.getElementById('features-container')) new GemApp.FeaturesSection('features-container');
    if (document.getElementById('calculator-app')) new GemApp.GoldSilverCalculator('calculator-app');
    if (document.getElementById('cta')) new GemApp.CTASection('cta');
});
</script>
```

## 🎯 ใช้งานแบบเลือกส่วน (Modular Usage)

### เฉพาะเครื่องคำนวณ

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/calculator.css">

<!-- HTML -->
<div id="calculator-app"></div>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/common.js"></script>
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/calculator.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new GemApp.GoldSilverCalculator('calculator-app');
});
</script>
```

### เฉพาะ Hero Section

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/hero.css">

<!-- HTML -->
<div id="hero"></div>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/common.js"></script>
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/components.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new GemApp.HeroSection('hero');
});
</script>
```

### เฉพาะ Stats Section

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/css/stats.css">

<!-- HTML -->
<div id="stats"></div>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/common.js"></script>
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v.1.0/scripts/components.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new GemApp.StatsSection('stats');
});
</script>
```

## 📦 Components Available

| Component | Description | CSS File | JavaScript |
|-----------|-------------|----------|------------|
| **HeroSection** | ส่วนหัวเว็บไซต์พร้อม parallax effects | `hero.css` | `components.js` |
| **StatsSection** | สถิติแบบ animated counter | `stats.css` | `components.js` |
| **FeaturesSection** | แสดงฟีเจอร์ของเว็บไซต์ | `features.css` | `components.js` |
| **CTASection** | ปุ่ม Call-to-Action | `cta.css` | `components.js` |
| **GoldSilverCalculator** | เครื่องคำนวณราคาทองคำและเงิน | `calculator.css` | `calculator.js` |

## ⚙️ Configuration Options

### การปรับแต่งเครื่องคำนวณ

```javascript
// Custom API URLs
const calculator = new GemApp.GoldSilverCalculator('calculator-app');
calculator.apiUrls = {
    gold: 'YOUR_GOLD_API_URL',
    silver: 'YOUR_SILVER_API_URL'
};
```

### การปรับแต่ง Stats Section

```javascript
// Custom stats values
const stats = new GemApp.StatsSection('stats');
// Stats จะใช้ค่าจาก HTML content อัตโนมัติ
```

## 🎨 CSS Variables

คุณสามารถปรับแต่ง theme ได้ผ่าน CSS variables:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #34495e;
    --accent-color: #3498db;
    --gold-color: #f39c12;
    --silver-color: #95a5a6;
    --text-dark: #2c3e50;
    --text-light: #7f8c8d;
    --bg-light: #f8f9fa;
    --bg-white: #ffffff;
    --border-light: #e9ecef;
}
```

## ⚠️ ข้อควรระวัง

1. **โหลดตามลำดับ:** โหลด `common.js` ก่อนเสมอ
2. **Element IDs:** ตรวจสอบให้แน่ใจว่า element ID ตรงกับที่กำหนด
3. **DOMContentLoaded:** เรียกใช้ component หลัง DOM โหลดเสร็จ
4. **CORS:** API calls อาจต้องใช้ proxy สำหรับ production

## 📱 Responsive Design

ทุก component รองรับ responsive design แบบ mobile-first:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🔄 Updates

เมื่อมีการอัปเดต:
1. เปลี่ยน version tag ใน URL (เช่น `@v.1.1`)
2. Clear browser cache
3. ตรวจสอบ breaking changes

## 🐛 Troubleshooting

### ปัญหาที่พบบ่อย

**1. Component ไม่แสดงผล**
```javascript
// ตรวจสอบว่า element มีอยู่
if (document.getElementById('hero')) {
    new GemApp.HeroSection('hero');
}
```

**2. Styles ไม่ทำงาน**
```html
<!-- ตรวจสอบว่าโหลด style.css เป็นไฟล์แรก -->
<link rel="stylesheet" href=".../css/style.css">
<!-- จากนั้นโหลดไฟล์อื่น -->
```

**3. JavaScript Error**
```javascript
// ตรวจสอบว่าโหลด common.js แล้ว
if (window.GemApp) {
    new GemApp.HeroSection('hero');
}
```

## 📞 Support

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/teerayuthj/gems-jewelry-fair-2025/issues)
- 📚 Documentation: [Full Docs](https://docs.example.com)

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

---

💎 **Made with ❤️ for Gold & Silver Analytics**  
🚀 **Ready to use via CDN - No setup required!**