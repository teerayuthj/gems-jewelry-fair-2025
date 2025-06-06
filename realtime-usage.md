# 🥇 Realtime Gold & Silver Prices Component

Real-time ราคาทองคำและเงิน Component ที่สามารถใช้งานผ่าน CDN ได้ทันที

## 🚀 Quick Start

### วิธีใช้งานพื้นฐาน

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v1.02/css/realtime.css">

<!-- HTML -->
<div id="realtime-prices"></div>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v1.02/scripts/realtime.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    new GemApp.RealtimePriceComponent('realtime-prices');
});
</script>
```

## 🔧 Configuration Options

### ตัวเลือกการกำหนดค่า

```javascript
new GemApp.RealtimePriceComponent('realtime-prices', {
    updateInterval: 3000,  // อัพเดททุก 3 วินาที (default)
    showTitle: true        // แสดงหัวข้อ (default: true)
});
```

### การกำหนด API URLs

```javascript
// สร้าง component
const realtime = new GemApp.RealtimePriceComponent('realtime-prices');

// กำหนด URL ของ API จริง
realtime.apiUrls = {
    goldRealtime: 'https://your-api.com/gold/realtime',
    goldYesterday: 'https://your-api.com/gold/yesterday',
    silverRealtime: 'https://your-api.com/silver/realtime',
    silverYesterday: 'https://your-api.com/silver/yesterday'
};
```

## 📊 Data Format

### Gold API Response Format

```json
{
    "G965B": {
        "time": "2025-06-06 13:40:40",
        "bid": 51895,
        "offer": 51950,
        "bid_asso": 51900,
        "offer_asso": 52000,
        "high_bid": 54782,
        "high_offer": 54847
    },
    "G9999B": {
        "time": "2025-06-06 13:40:40",
        "bid": 53784,
        "offer": 53834,
        "bid_asso": 0,
        "offer_asso": 0,
        "high_bid": 56776,
        "high_offer": 56836
    },
    "G9999KG": {
        "time": "2025-06-06 13:40:40",
        "bid": 3528230,
        "offer": 3531510,
        "bid_asso": 0,
        "offer_asso": 0,
        "high_bid": 3724505,
        "high_offer": 3728441
    },
    "G9999US": {
        "time": "2025-06-06 13:40:40",
        "bid": 3361,
        "offer": 3362,
        "bid_asso": 0,
        "offer_asso": 0,
        "high_bid": 3498,
        "high_offer": 3499
    }
}
```

### Silver API Response Format

```json
{
    "Silver": {
        "bid": "37881",
        "bid_asso": 0,
        "bidspot": "36.11",
        "high_bid": 0,
        "high_offer": 0,
        "offer": "38181",
        "offer_asso": 0,
        "offerspot": "36.15",
        "time": "2025-06-06 13:41:53",
        "timekg": "2025-06-06 13:41:53"
    }
}
```

## 💎 Price Types Displayed

| Type | Description | API Field |
|------|-------------|-----------|
| **ทองคำ 96.5% ออสสิริส** | ทองคำบริสุทธิ์ 96.5% | `G965B.bid/offer` |
| **ทองคำ 99.99% ออสสิริส** | ทองคำบริสุทธิ์ 99.99% | `G9999B.bid/offer` |
| **Spot Gold USD** | ราคาทองคำโลก USD/oz | `G9999US.bid/offer` |
| **ทองคำ 99.99% กิโลกรัม** | ทองคำแท่งกิโลกรัม | `G9999KG.bid/offer` |
| **สมาคมฯ 96.5%** | ราคาสมาคมผู้ค้าทองคำ | `G965B.bid_asso/offer_asso` |
| **Silver USD** | ราคาเงินโลก USD/oz | `Silver.bidspot/offerspot` |
| **แท่งเงิน THB** | ราคาเงินในประเทศ THB/kg | `Silver.bid/offer` |

## 🎯 Usage Examples

### แบบเต็ม (พร้อมหัวข้อ)

```html
<div id="full-prices"></div>
<script>
new GemApp.RealtimePriceComponent('full-prices');
</script>
```

### แบบกะทัดรัด (ไม่มีหัวข้อ)

```html
<div id="compact-prices"></div>
<script>
new GemApp.RealtimePriceComponent('compact-prices', {
    showTitle: false
});
</script>
```

### กำหนดความถี่ในการอัพเดท

```html
<div id="custom-update-prices"></div>
<script>
new GemApp.RealtimePriceComponent('custom-update-prices', {
    updateInterval: 5000  // อัพเดททุก 5 วินาที
});
</script>
```

## 🎨 CSS Customization

### CSS Variables (ถ้าต้องการปรับแต่ง)

```css
.realtime-price-container {
    --primary-color: #002458 !important;
    --border-color: #e0e0e0 !important;
    --positive-color: #28a745 !important;
    --negative-color: #dc3545 !important;
    --neutral-color: #666666 !important;
}
```

## ⚡ Features

### ✅ สิ่งที่มี

- **Real-time Updates**: อัพเดททุก 3 วินาที (ปรับได้)
- **Change Calculation**: คำนวณการเปลี่ยนแปลงจากราคาเมื่อวาน
- **Responsive Design**: ใช้งานได้ทุกขนาดหน้าจอ
- **Error Handling**: จัดการ error และแสดง loading state
- **Clean Design**: ดีไซน์เรียบง่าย มี border บางๆ
- **CDN Ready**: ใช้งานผ่าน CDN ได้ทันที
- **CSS Protection**: ใช้ !important ป้องกันการทับซ้อนกับ CSS อื่น

### 🎯 Color Coding

- **🟢 สีเขียว**: ราคาขึ้น (positive change)
- **🔴 สีแดง**: ราคาลง (negative change) 
- **⚪ สีเทา**: ไม่เปลี่ยนแปลง (neutral)

## 🔄 API Integration

### การเชื่อมต่อ API จริง

1. **เตรียม API Endpoints**: 4 URLs (Gold/Silver × Realtime/Yesterday)
2. **กำหนด API URLs** ใน component
3. **ตรวจสอบ CORS**: แน่ใจว่า API รองรับ CORS
4. **Test การเชื่อมต่อ**

### ตัวอย่างการใช้งานจริง

```javascript
const realtime = new GemApp.RealtimePriceComponent('prices');

// กำหนด API URLs จริง
realtime.apiUrls = {
    goldRealtime: 'https://api.yourdomain.com/gold/realtime',
    goldYesterday: 'https://api.yourdomain.com/gold/yesterday',
    silverRealtime: 'https://api.yourdomain.com/silver/realtime',
    silverYesterday: 'https://api.yourdomain.com/silver/yesterday'
};
```

## 🐛 Troubleshooting

### ปัญหาที่พบบ่อย

**1. Component ไม่แสดงผล**
```javascript
// ตรวจสอบว่า element มีอยู่
if (document.getElementById('realtime-prices')) {
    new GemApp.RealtimePriceComponent('realtime-prices');
}
```

**2. API ไม่ทำงาน**
```javascript
// ตรวจสอบ Network tab ใน Developer Tools
// ตรวจสอบ CORS policy
// ตรวจสอบ API response format
```

**3. Styles ไม่ทำงาน**
```html
<!-- ตรวจสอบว่าโหลด CSS แล้ว -->
<link rel="stylesheet" href=".../css/realtime.css">
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Grid layout
- **Tablet**: 768px - 480px - Responsive grid
- **Mobile**: < 480px - Single column

## 🔄 Update Methods

### หยุดการอัพเดท

```javascript
const realtime = new GemApp.RealtimePriceComponent('prices');
realtime.stopRealTimeUpdates();
```

### เริ่มการอัพเดทใหม่

```javascript
realtime.startRealTimeUpdates();
```

### ลบ Component

```javascript
realtime.destroy();
```

## 📄 Complete Example

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gold & Silver Realtime Prices</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v1.02/css/realtime.css">
</head>
<body>
    <main class="container">
        <div id="realtime-prices"></div>
    </main>

    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/gh/teerayuthj/gems-jewelry-fair-2025@v1.02/scripts/realtime.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const realtime = new GemApp.RealtimePriceComponent('realtime-prices');
        
        // กำหนด API URLs
        realtime.apiUrls = {
            goldRealtime: 'YOUR_GOLD_REALTIME_API',
            goldYesterday: 'YOUR_GOLD_YESTERDAY_API',
            silverRealtime: 'YOUR_SILVER_REALTIME_API',
            silverYesterday: 'YOUR_SILVER_YESTERDAY_API'
        };
    });
    </script>
</body>
</html>
```

---

💎 **Ready to use via CDN - Real-time Gold & Silver Prices!**  
🚀 **No setup required - Just copy & paste!**