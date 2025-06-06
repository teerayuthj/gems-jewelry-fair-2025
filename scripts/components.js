// ====== Hero Section Component ======
class HeroSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.render();
        this.initParallax();
    }

    render() {
        this.container.innerHTML = `
            <section class="hero-section">
                <div class="floating-shapes">
                    <div class="shape"></div>
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div>
                <div class="hero-content">
                    <h1 class="hero-title">Gold & Silver Manufacturer & Investment Trader</h1>
                    <p class="hero-subtitle">
                        ผู้ผลิตและจัดจำหน่ายทองคำแท่งและเงินแท่งคุณภาพสูง ราคาทองคำตามราคาตลาดโลก
                        พร้อมบริการรับซื้อคืนทุกน้ำหนัก รับประกันความบริสุทธิ์ 99.99%, 96.5% และ โลหะเงินบริสุทธิ์ 99.99%
                    </p>
                    <div class="hero-cta">
                        <a href="http://www.ausiris.co.th/content/index/products/information-products.html" class="cta-button">ดูสินค้าทองคำแท่ง</a>
                        <a href="#contact" class="cta-button" style="background: #b8860b;">ติดต่อเรา</a>
                    </div>
                </div>
            </section>
        `;
    }

    initParallax() {
        if (window.GemApp && window.GemApp.ParallaxEffects) {
            new window.GemApp.ParallaxEffects();
        }
    }
}

// ====== Stats Section Component ======
class StatsSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.render();
        this.initAnimations();
    }

    render() {
        this.container.innerHTML = `
            <section class="stats-section">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">2000+</div>
                        <div class="stat-title">Gold Dealers</div>
                        <p class="stat-description">ร้านทองคำและผู้ประกอบการที่เชื่อมั่นในระบบวิเคราะห์ของเรา</p>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">100ปี</div>
                        <div class="stat-title">Goldsmith's House</div>
                        <p class="stat-description">เราอยู่ในตลาดทองคำตั้งแต่บ้านช่างทอง</p>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">20ปี</div>
                        <div class="stat-title">Gold Bullion for Investment</div>
                        <p class="stat-description">ผู้บุกเบิกทองคำแท่งเพื่อการลงทุน</p>
                    </div>
                </div>
            </section>
        `;
    }

    initAnimations() {
        const animationObserver = new window.GemApp.AnimationObserver();
        const statCards = this.container.querySelectorAll('.stat-card');
        const statsSection = this.container.querySelector('.stats-section');
        
        animationObserver.observe(statCards);
        animationObserver.observeStats(statsSection, [2000, 100, 20]);
    }
}

// ====== Features Section Component ======
class FeaturesSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.render();
        this.initAnimations();
    }

    render() {
        this.container.innerHTML = `
            <section class="features-section" id="features">
                <div class="container">
                    <h2 class="section-title">Market Analysis</h2>
                    
                    <!-- Gold & Silver Market Analysis -->
                    <div class="feature-block">
                        <div class="feature-content">
                            <h2 class="feature-title">Gold & Silver Market Analysis</h2>
                            <p class="feature-description">
                                วิเคราะห์ตลาดทองคำและเงินอย่างครบวงจร ครอบคลุมทั้งราคาโลก ความต้องการในตลาด 
                                และปัจจัยทางเศรษฐกิจที่ส่งผลต่อราคาโลหะมีค่า วิเคราะห์อัตราส่วนราคาทอง-เงิน (Gold-Silver Ratio) 
                                เพื่อหาโอกาสการลงทุนที่เหมาะสม พร้อมกลยุทธ์การจัดการความเสี่ยงสำหรับนักลงทุนทุกระดับ
                            </p>
                            <a href="#" class="learn-more-btn">ดูรายละเอียด</a>
                        </div>
                        <img src="http://www.ausiris.co.th/content/dam/ausirisgold/og-images/research.png" alt="Gold & Silver Market Analysis" class="feature-image">
                    </div>

                    <!-- Institutional Investment Analysis -->
                    <div class="feature-block">
                        <div class="feature-content">
                            <h2 class="feature-title">Institutional Investment Analysis</h2>
                            <p class="feature-description">
                                วิเคราะห์ข้อมูลเชิงลึกจาก CFTC Reports และ ETF Holdings เพื่อติดตามการเคลื่อนไหวของสถาบันการเงินรายใหญ่ 
                                วิเคราะห์การเปลี่ยนแปลงของเงินทุนในตลาดอนุพันธ์และตลาดทองคำกายภาพ 
                                ช่วยให้เห็นภาพรวมความเชื่อมั่นของนักลงทุนสถาบันและแนวโน้มการลงทุนระยะกลางถึงยาว
                            </p>
                            <a href="#" class="learn-more-btn">ดูรายละเอียด</a>
                        </div>
                        <img src="http://www.ausiris.co.th/content/dam/ausirisgold/og-images/ETF.png" alt="Institutional Investment Analysis" class="feature-image">
                    </div>
                </div>
            </section>
        `;
    }

    initAnimations() {
        const animationObserver = new window.GemApp.AnimationObserver();
        const featureBlocks = this.container.querySelectorAll('.feature-block');
        animationObserver.observe(featureBlocks);
    }
}

// ====== CTA Section Component ======
class CTASection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.render();
        this.initAnimations();
    }

    render() {
        this.container.innerHTML = `
            <section class="cta-section">
                <h2 class="cta-title">ติดตามข้อมูลทองคำและแท่งเงิน</h2>
                <p class="cta-subtitle">
                    เข้าร่วม LINE Official Account ของเรา เพื่อรับข้อมูลราคาทองคำ-แท่งเงิน วิเคราะห์ตลาด<br>
                    <strong>และคำแนะนำการลงทุนทุกวันได้ที่นี่</strong>
                </p>
                <div class="cta-actions">
                    <a href="https://line.me/R/ti/p/@gemanalytics" target="_blank" class="cta-button line-button">
                        <span class="line-icon"></span>
                        เพิ่มเพื่อน LINE Official
                    </a>
                </div>
            </section>
        `;
    }

    initAnimations() {
        const animationObserver = new window.GemApp.AnimationObserver();
        const ctaSection = this.container.querySelector('.cta-section');
        animationObserver.observe([ctaSection]);
    }
}

// Export to global scope
window.GemApp.HeroSection = HeroSection;
window.GemApp.StatsSection = StatsSection;
window.GemApp.FeaturesSection = FeaturesSection;
window.GemApp.CTASection = CTASection;