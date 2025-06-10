(function() {
    'use strict';
    
    const GemPromotion = {
        eventStart: new Date('2025-09-09T00:00:00+07:00'),
        eventEnd: new Date('2025-09-13T23:59:59+07:00'),
        instances: {},
        
        setEventDates(startDate, endDate) {
            this.eventStart = this.parseThaiDate(startDate);
            this.eventEnd = this.parseThaiDate(endDate);
        },
        
        setInstanceDates(containerId, startDate, endDate) {
            this.instances[containerId] = {
                eventStart: this.parseThaiDate(startDate),
                eventEnd: this.parseThaiDate(endDate)
            };
        },
        
        getInstanceDates(containerId) {
            return this.instances[containerId] || {
                eventStart: this.eventStart,
                eventEnd: this.eventEnd
            };
        },
        
        parseThaiDate(dateStr) {
            if (dateStr instanceof Date) return dateStr;
            
            const formats = [
                /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/,
                /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
                /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})$/,
                /^(\d{4})-(\d{1,2})-(\d{1,2})$/
            ];
            
            for (let format of formats) {
                const match = dateStr.match(format);
                if (match) {
                    if (match.length === 4) {
                        const [, day, month, year] = match;
                        return new Date(year, month - 1, day, 0, 0, 0);
                    } else if (match.length === 6) {
                        if (dateStr.includes('/')) {
                            const [, day, month, year, hour, minute] = match;
                            return new Date(year, month - 1, day, hour, minute, 0);
                        } else {
                            const [, year, month, day, hour, minute] = match;
                            return new Date(year, month - 1, day, hour, minute, 0);
                        }
                    }
                }
            }
            
            return new Date(dateStr);
        },
        
        isEventActive(containerId = null) {
            const now = new Date();
            const dates = containerId ? this.getInstanceDates(containerId) : { eventStart: this.eventStart, eventEnd: this.eventEnd };
            return now >= dates.eventStart && now <= dates.eventEnd;
        },
        
        formatTime(value) {
            return value.toString().padStart(2, '0');
        },
        
        updateCountdown(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const now = new Date();
            const baseId = containerId.replace('-countdown', '');
            const dates = this.getInstanceDates(baseId);
            const timeLeft = dates.eventStart - now;
            const timeUntilEnd = dates.eventEnd - now;
            
            if (timeLeft <= 0 && timeUntilEnd > 0) {
                // งานเริ่มแล้ว แต่ยังไม่หมด - แสดงนับถอยหลังจนหมดโปรโมชั่น
                const days = Math.floor(timeUntilEnd / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeUntilEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeUntilEnd % (1000 * 60)) / 1000);
                
                container.innerHTML = `
                    <div class="gem-countdown-active">
                        <div class="gem-countdown-message">⏰ โปรโมชั่นกำลังใช้งานได้!</div>
                        <div class="gem-countdown-subtitle">เหลือเวลาอีก:</div>
                        <div class="gem-countdown-grid">
                            <div class="gem-time-unit gem-time-ending">
                                <div class="gem-time-value">${this.formatTime(days)}</div>
                                <div class="gem-time-label">วัน</div>
                            </div>
                            <div class="gem-time-unit gem-time-ending">
                                <div class="gem-time-value">${this.formatTime(hours)}</div>
                                <div class="gem-time-label">ชั่วโมง</div>
                            </div>
                            <div class="gem-time-unit gem-time-ending">
                                <div class="gem-time-value">${this.formatTime(minutes)}</div>
                                <div class="gem-time-label">นาที</div>
                            </div>
                            <div class="gem-time-unit gem-time-ending">
                                <div class="gem-time-value">${this.formatTime(seconds)}</div>
                                <div class="gem-time-label">วินาที</div>
                            </div>
                        </div>
                    </div>
                `;
                return;
            }
            
            if (timeUntilEnd <= 0) {
                container.innerHTML = '<div class="gem-countdown-expired">โปรโมชั่นหมดอายุแล้ว</div>';
                return;
            }
            
            if (timeLeft > 0) {
                // ยังไม่เริ่มงาน - นับถอยหลังจนเริ่มงาน
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                container.innerHTML = `
                    <div class="gem-countdown-waiting">
                        <div class="gem-countdown-subtitle">เริ่มในอีก:</div>
                        <div class="gem-countdown-grid">
                            <div class="gem-time-unit">
                                <div class="gem-time-value">${this.formatTime(days)}</div>
                                <div class="gem-time-label">วัน</div>
                            </div>
                            <div class="gem-time-unit">
                                <div class="gem-time-value">${this.formatTime(hours)}</div>
                                <div class="gem-time-label">ชั่วโมง</div>
                            </div>
                            <div class="gem-time-unit">
                                <div class="gem-time-value">${this.formatTime(minutes)}</div>
                                <div class="gem-time-label">นาที</div>
                            </div>
                            <div class="gem-time-unit">
                                <div class="gem-time-value">${this.formatTime(seconds)}</div>
                                <div class="gem-time-label">วินาที</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        
        createCountdownSection(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            container.innerHTML = `
                <div class="gem-section gem-countdown-section">
                    <h3 class="gem-section-title">72nd Bangkok Gems and Jewelry Fair</h3>
                    <p class="gem-event-date">9-13 กันยายน 2025</p>
                    <div id="${containerId}-countdown" class="gem-countdown"></div>
                </div>
            `;
            
            this.updateCountdown(`${containerId}-countdown`);
            setInterval(() => this.updateCountdown(`${containerId}-countdown`), 1000);
        },
        
        copyToClipboard(text, buttonId) {
            const baseId = buttonId.replace('-copy', '');
            if (!this.isEventActive(baseId)) {
                alert('รหัสส่วนลดใช้ได้เฉพาะช่วงวันงานเท่านั้น');
                return;
            }
            
            navigator.clipboard.writeText(text).then(() => {
                const button = document.getElementById(buttonId);
                const originalText = button.textContent;
                button.textContent = 'คัดลอกแล้ว!';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '#002458';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert('ไม่สามารถคัดลอกได้');
            });
        },
        
        createDiscountSection(containerId, discountCode, discountText) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const isActive = this.isEventActive(containerId);
            const buttonText = isActive ? 'คัดลอกรหัส' : 'เปิดใช้งานในวันงาน';
            const buttonClass = isActive ? 'gem-copy-active' : 'gem-copy-disabled';
            const codeDisplay = isActive ? discountCode : '••••••••';
            const codeClass = isActive ? 'gem-discount-code' : 'gem-discount-code gem-code-hidden';
            
            container.innerHTML = `
                <div class="gem-section gem-discount-section">
                    <h3 class="gem-section-title">รหัสส่วนลดพิเศษ</h3>
                    <div class="gem-discount-card ${isActive ? '' : 'gem-card-locked'}">
                        <div class="${codeClass}">${codeDisplay}</div>
                        <div class="gem-discount-text">${discountText}</div>
                        ${!isActive ? '<div class="gem-unlock-hint">🔒 ปลดล็อคในวันงาน</div>' : ''}
                        <button id="${containerId}-copy" class="gem-copy-button ${buttonClass}" 
                                onclick="GemPromotion.copyToClipboard('${discountCode}', '${containerId}-copy')">
                            ${buttonText}
                        </button>
                    </div>
                </div>
            `;
        },
        
        createFullPromotion(containerId, discountCode, discountText, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            if (options.eventStart && options.eventEnd) {
                this.setInstanceDates(containerId, options.eventStart, options.eventEnd);
            }
            
            const isActive = this.isEventActive(containerId);
            const buttonText = isActive ? 'คัดลอกรหัส' : 'เปิดใช้งานในวันงาน';
            const buttonClass = isActive ? 'gem-copy-active' : 'gem-copy-disabled';
            const codeDisplay = isActive ? discountCode : '••••••••';
            const codeClass = isActive ? 'gem-discount-code' : 'gem-discount-code gem-code-hidden';
            
            const eventTitle = options.title || 'งาน 72nd Bangkok Gems and Jewelry Fair 2025';
            const eventDateText = options.dateText || '9-13 มิถุนายน 2025';
            
            container.innerHTML = `
                <div class="gem-promotion-container">
                    <div class="gem-section gem-countdown-section">
                        <h3 class="gem-section-title">${eventTitle}</h3>
                        <p class="gem-event-date">${eventDateText}</p>
                        <div id="${containerId}-countdown" class="gem-countdown"></div>
                    </div>
                    
                    <div class="gem-section gem-discount-section">
                        <h3 class="gem-section-title">รหัสส่วนลดพิเศษ</h3>
                        <div class="gem-discount-card ${isActive ? '' : 'gem-card-locked'}">
                            <div class="${codeClass}">${codeDisplay}</div>
                            <div class="gem-discount-text">${discountText}</div>
                            ${!isActive ? '<div class="gem-unlock-hint">🔒 ปลดล็อคในวันงาน</div>' : ''}
                            <button id="${containerId}-copy" class="gem-copy-button ${buttonClass}" 
                                    onclick="GemPromotion.copyToClipboard('${discountCode}', '${containerId}-copy')">
                                ${buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            this.updateCountdown(`${containerId}-countdown`);
            setInterval(() => this.updateCountdown(`${containerId}-countdown`), 1000);
        }
    };
    
    if (!document.getElementById('gem-promotion-styles')) {
        const styles = document.createElement('style');
        styles.id = 'gem-promotion-styles';
        styles.textContent = `
            .gem-promotion-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 0 16px;
                background: white;
                color: #333;
            }
            
            .gem-section {
                border: none;
                border-radius: 12px;
                padding: 28px;
                margin: 20px 0;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .gem-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #002458 0%, #3b82f6 100%);
                border-radius: 12px;
                padding: 2px;
                z-index: -1;
            }
            
            .gem-section::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                right: 2px;
                bottom: 2px;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                border-radius: 10px;
                z-index: -1;
            }
            
            .gem-section:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
            }
            
            .gem-section-title {
                margin: 0 0 20px 0;
                font-size: 24px;
                font-weight: 700;
                color: #002458 !important;
                text-align: center;
                position: relative;
                padding: 8px 0;
                text-shadow: 0 1px 2px rgba(0, 36, 88, 0.1);
            }
            
            .gem-section-title::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent 0%, #002458 20%, #3b82f6 50%, #002458 80%, transparent 100%);
                transform: translateY(-50%);
                opacity: 0.3;
                z-index: -1;
            }
            
            .gem-section-title::after {
                content: '✨';
                position: absolute;
                top: -5px;
                right: -10px;
                font-size: 16px;
                animation: gem-sparkle 2s ease-in-out infinite;
            }
            
            
            @keyframes gem-sparkle {
                0%, 100% { 
                    transform: scale(1) rotate(0deg);
                    opacity: 0.7;
                }
                50% { 
                    transform: scale(1.2) rotate(180deg);
                    opacity: 1;
                }
            }
            
            .gem-event-date {
                text-align: center;
                font-size: 18px;
                font-weight: 600;
                color: #002458 !important;
                margin: 0 0 24px 0;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                padding: 12px 24px;
                border-radius: 20px;
                display: inline-block;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                border: 2px solid rgba(0, 36, 88, 0.1);
                position: relative;
                overflow: hidden;
            }
            
            .gem-event-date::before {
                content: '📅';
                margin-right: 8px;
                font-size: 16px;
            }
            
            .gem-event-date::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #002458, #3b82f6, transparent);
                border-radius: 20px 20px 0 0;
            }
            
            .gem-countdown-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
                text-align: center;
            }
            
            .gem-time-unit {
                padding: 18px 12px;
                border: none;
                border-radius: 12px;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 36, 88, 0.1);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .gem-time-unit::before {
                content: '';
                position: absolute;
                top: 0;
                left: 20%;
                right: 20%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #002458, #3b82f6, transparent);
                border-radius: 0 0 6px 6px;
                opacity: 0.6;
            }
            
            .gem-time-unit:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.3);
            }
            
            .gem-time-value {
                font-size: 28px;
                font-weight: 700;
                color: #002458;
                margin-bottom: 4px;
            }
            
            .gem-time-label {
                font-size: 14px;
                color: #666666 !important;
            }
            
            .gem-countdown-ended {
                text-align: center;
                font-size: 24px;
                font-weight: 600;
                color: #002458;
                padding: 20px;
            }
            
            .gem-countdown-active {
                text-align: center;
            }
            
            .gem-countdown-message {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 16px;
                display: inline-block;
                box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            }
            
            .gem-countdown-subtitle {
                font-size: 16px;
                color: #666666 !important;
                margin-bottom: 16px;
                font-weight: 500;
            }
            
            .gem-time-ending {
                background: linear-gradient(135deg, #fff3cd, #ffeaa7);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05), 0 0 0 2px #ffc107;
                animation: gem-glow 4s ease-in-out infinite;
                transition: all 0.3s ease;
            }
            
            .gem-time-ending::before {
                display: none;
            }
            
            .gem-time-ending .gem-time-value {
                color: #856404;
            }
            
            .gem-countdown-expired {
                text-align: center;
                font-size: 20px;
                font-weight: 600;
                color: #dc3545;
                padding: 20px;
                background: #f8d7da;
                border: 2px solid #f5c6cb;
                border-radius: 8px;
            }
            
            .gem-countdown-waiting {
                text-align: center;
            }
            
            @keyframes gem-glow {
                0% { 
                    box-shadow: 0 0 5px rgba(255, 193, 7, 0.3);
                    border-color: #ffc107;
                }
                50% { 
                    box-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
                    border-color: #ffca2c;
                }
                100% { 
                    box-shadow: 0 0 5px rgba(255, 193, 7, 0.3);
                    border-color: #ffc107;
                }
            }
            
            .gem-discount-card {
                text-align: center;
                padding: 24px;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .gem-discount-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #002458, #3b82f6, #002458);
                border-radius: 12px 12px 0 0;
            }
            
            .gem-discount-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                border-color: #3b82f6;
            }
            
            .gem-discount-code {
                font-size: 32px;
                font-weight: 700;
                color: #002458;
                font-family: 'Courier New', monospace;
                margin-bottom: 12px;
                letter-spacing: 2px;
            }
            
            .gem-discount-text {
                font-size: 16px;
                color: #666666 !important;
                margin-bottom: 20px;
            }
            
            .gem-copy-button {
                padding: 14px 28px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                color: white;
                position: relative;
                overflow: hidden;
            }
            
            .gem-copy-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
            }
            
            .gem-copy-button:hover::before {
                left: 100%;
            }
            
            .gem-copy-active {
                background: linear-gradient(135deg, #002458 0%, #1e3a8a 100%);
                box-shadow: 0 4px 12px rgba(0, 36, 88, 0.3);
            }
            
            .gem-copy-active:hover {
                background: linear-gradient(135deg, #003875 0%, #1e40af 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 36, 88, 0.4);
            }
            
            .gem-copy-disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            
            .gem-code-hidden {
                filter: blur(8px);
                user-select: none;
                pointer-events: none;
            }
            
            .gem-card-locked {
                position: relative;
                background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
                border: 2px dashed #ddd;
            }
            
            .gem-unlock-hint {
                font-size: 14px;
                color: #999999 !important;
                margin: 8px 0;
                font-weight: 500;
            }
            
            @media (max-width: 480px) {
                .gem-promotion-container {
                    padding: 0 12px;
                }
                
                .gem-countdown-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }
                
                .gem-time-value {
                    font-size: 24px;
                }
                
                .gem-discount-code {
                    font-size: 24px;
                }
                
                .gem-section {
                    padding: 16px;
                    margin: 12px 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    window.GemPromotion = GemPromotion;
})();