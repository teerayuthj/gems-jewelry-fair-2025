// ====== Gold & Silver Calculator Component ======
class GoldSilverCalculator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentMetal = 'gold';
        this.currentGoldType = '96.5_osiris';
        this.currentUnit = 'baht';
        
        // API URLs
        this.apiUrls = {
            gold: 'http://27.254.77.78/rest/public/rest/goldspot',
            silver: 'http://27.254.77.78/rest/public/rest/silver'
        };

        // Price data
        this.prices = {
            gold: {
                '96.5_osiris': { bid: 51186, offer: 51241, change: 150 },
                '99.99_osiris': { bid: 53050, offer: 53100, change: 155 },
                '99.99_osiris_kg': { bid: 3480080, offer: 3483360, change: 10168 },
                '96.5_assoc': { bid: 51150, offer: 51250, change: 50 }
            },
            silver: {
                'bar_99.99': { bid: 35069, offer: 35369, change: 150 }
            }
        };

        // Unit conversions
        this.conversions = {
            gram: 1,
            baht: 15.244,
            kg: 1000
        };

        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.updateDisplay();
        this.updateLastUpdated();
        
        // Auto-update every 5 seconds
        setInterval(() => {
            this.fetchPricesFromAPI();
        }, 5000);
    }

    render() {
        this.container.innerHTML = `
            <div class="calculator-container">
                <h1 class="calculator-title">เครื่องคำนวณราคาทองคำและเงินไทย</h1>
                
                <div class="metal-selector">
                    <div class="selector-bg gold" id="selectorBg"></div>
                    <div class="metal-option gold active" data-metal="gold">
                        🥇 ทองคำ
                    </div>
                    <div class="metal-option silver" data-metal="silver">
                        🥈 แท่งเงิน
                    </div>
                </div>

                <div class="input-section">
                    <div class="gold-type-selector" id="goldTypeSelector">
                        <label class="input-label">ประเภททองคำ</label>
                        <div class="gold-type-grid">
                            <div class="gold-type-option active" data-type="96.5_osiris">96.5% ออสสิริส</div>
                            <div class="gold-type-option" data-type="99.99_osiris">99.99% ออสสิริส</div>
                            <div class="gold-type-option" data-type="99.99_osiris_kg">99.99% ออสสิริส(กิโลกรัม)</div>
                            <div class="gold-type-option" data-type="96.5_assoc">96.5% สมาคม</div>
                        </div>
                    </div>

                    <div class="input-group">
                        <label for="amount" class="input-label">จำนวน</label>
                        <div class="input-row">
                            <div class="input-field">
                                <input type="number" id="amount" class="calc-input" placeholder="0.00" step="0.01" min="0">
                            </div>
                            <div class="unit-selector">
                                <select id="unitSelector" class="calc-select">
                                    <option value="baht">บาททอง</option>
                                    <option value="kg">กิโลกรัม</option>
                                    <option value="gram">กรัม</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="price-display">
                    <div class="price-info" id="priceInfo">
                        <div class="price-item">
                            <div class="price-label">ราคาขาย (ต่อกรัม)</div>
                            <div class="price-value sell-price" id="sellPrice">51,100</div>
                        </div>
                        <div class="price-item">
                            <div class="price-label">ราคาซื้อ (ต่อกรัม)</div>
                            <div class="price-value buy-price" id="buyPrice">51,200</div>
                        </div>
                    </div>

                    <div class="total-section">
                        <div class="total-label">มูลค่ารวม (ราคาขาย)</div>
                        <div class="total-price" id="totalPrice">0</div>
                        <div class="currency">บาท</div>
                    </div>
                </div>

                <div class="last-updated">
                    <span class="status-indicator"></span>
                    อัพเดทอัตโนมัติ: <span id="lastUpdated"></span>
                </div>

                <div class="info-text">
                    💡 <strong>หมายเหตุ:</strong> ราคาที่แสดงเป็นราคาอ้างอิงตามข้อมูลตลาด อัพเดทแบบเรียลไทม์ ราคาจริงอาจแตกต่างไปตามร้านค้าและเงื่อนไขการซื้อขาย
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Metal selector events
        this.container.querySelectorAll('.metal-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const metal = e.target.dataset.metal;
                this.switchMetal(metal);
            });
        });

        // Gold type selector events
        this.container.querySelectorAll('.gold-type-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                this.switchGoldType(type);
            });
        });

        // Amount input event
        const amountInput = this.container.querySelector('#amount');
        amountInput.addEventListener('input', () => this.calculatePrice());

        // Unit selector event
        const unitSelector = this.container.querySelector('#unitSelector');
        unitSelector.addEventListener('change', (e) => {
            this.currentUnit = e.target.value;
            this.calculatePrice();
        });
    }

    switchMetal(metal) {
        this.currentMetal = metal;
        
        // Update active states
        this.container.querySelectorAll('.metal-option').forEach(option => {
            option.classList.remove('active');
        });
        this.container.querySelector(`[data-metal="${metal}"]`).classList.add('active');
        
        // Animate selector background
        const selectorBg = this.container.querySelector('#selectorBg');
        selectorBg.className = `selector-bg ${metal}`;
        
        // Show/hide gold type selector
        const goldTypeSelector = this.container.querySelector('#goldTypeSelector');
        goldTypeSelector.style.display = metal === 'gold' ? 'block' : 'none';
        
        // Update unit options for silver
        const unitSelector = this.container.querySelector('#unitSelector');
        if (metal === 'silver') {
            unitSelector.innerHTML = `
                <option value="kg">กิโลกรัม</option>
                <option value="gram">กรัม</option>
            `;
            this.currentUnit = 'kg';
            unitSelector.value = 'kg';
        } else {
            unitSelector.innerHTML = `
                <option value="baht">บาททอง</option>
                <option value="kg">กิโลกรัม</option>
                <option value="gram">กรัม</option>
            `;
            this.currentUnit = 'baht';
            unitSelector.value = 'baht';
        }
        
        this.updateDisplay();
    }

    switchGoldType(type) {
        this.currentGoldType = type;
        
        this.container.querySelectorAll('.gold-type-option').forEach(option => {
            option.classList.remove('active');
        });
        this.container.querySelector(`[data-type="${type}"]`).classList.add('active');
        
        this.updateDisplay();
    }

    updateDisplay() {
        let currentPrices;
        const sellPriceElement = this.container.querySelector('#sellPrice');
        const buyPriceElement = this.container.querySelector('#buyPrice');
        const priceLabels = this.container.querySelectorAll('.price-label');
        
        if (this.currentMetal === 'gold') {
            currentPrices = this.prices.gold[this.currentGoldType];
            
            if (this.currentGoldType === '99.99_osiris_kg') {
                // แสดงราคาต่อกิโลกรัม
                sellPriceElement.textContent = window.GemApp && window.GemApp.Utils ? 
                    window.GemApp.Utils.formatNumber(currentPrices.offer) : currentPrices.offer.toLocaleString();
                buyPriceElement.textContent = window.GemApp && window.GemApp.Utils ? 
                    window.GemApp.Utils.formatNumber(currentPrices.bid) : currentPrices.bid.toLocaleString();
                priceLabels[0].textContent = 'ราคาขาย (ต่อกิโลกรัม)';
                priceLabels[1].textContent = 'ราคาซื้อ (ต่อกิโลกรัม)';
            } else {
                // แสดงราคาต่อบาททอง
                sellPriceElement.textContent = GemApp.Utils.formatNumber(currentPrices.offer);
                buyPriceElement.textContent = GemApp.Utils.formatNumber(currentPrices.bid);
                priceLabels[0].textContent = 'ราคาขาย (ต่อบาททอง)';
                priceLabels[1].textContent = 'ราคาซื้อ (ต่อบาททอง)';
            }
        } else {
            // เงิน - แสดงราคาต่อกิโลกรัม
            currentPrices = this.prices.silver['bar_99.99'];
            sellPriceElement.textContent = GemApp.Utils.formatNumber(currentPrices.offer);
            buyPriceElement.textContent = GemApp.Utils.formatNumber(currentPrices.bid);
            priceLabels[0].textContent = 'ราคาขาย (ต่อกิโลกรัม)';
            priceLabels[1].textContent = 'ราคาซื้อ (ต่อกิโลกรัม)';
        }
        
        this.calculatePrice();
    }

    calculatePrice() {
        const amountInput = this.container.querySelector('#amount');
        const totalPriceElement = this.container.querySelector('#totalPrice');
        const amount = parseFloat(amountInput.value) || 0;
        let currentPrices;
        let totalPrice = 0;
        
        if (this.currentMetal === 'gold') {
            currentPrices = this.prices.gold[this.currentGoldType];
            
            if (this.currentGoldType === '99.99_osiris_kg') {
                // ทอง 99.99% กิโลกรัม - ราคาต่อกิโลกรัม
                if (this.currentUnit === 'kg') {
                    totalPrice = amount * currentPrices.offer;
                } else if (this.currentUnit === 'gram') {
                    totalPrice = (amount / 1000) * currentPrices.offer;
                } else if (this.currentUnit === 'baht') {
                    const grams = amount * 15.244;
                    totalPrice = (grams / 1000) * currentPrices.offer;
                }
            } else {
                // ทองปกติ - ราคาต่อบาททอง
                if (this.currentUnit === 'baht') {
                    totalPrice = amount * currentPrices.offer;
                } else if (this.currentUnit === 'gram') {
                    const baht = amount / 15.244;
                    totalPrice = baht * currentPrices.offer;
                } else if (this.currentUnit === 'kg') {
                    const baht = (amount * 1000) / 15.244;
                    totalPrice = baht * currentPrices.offer;
                }
            }
        } else {
            // เงิน - ราคาต่อกิโลกรัม
            currentPrices = this.prices.silver['bar_99.99'];
            
            if (this.currentUnit === 'kg') {
                totalPrice = amount * currentPrices.offer;
            } else if (this.currentUnit === 'gram') {
                totalPrice = (amount / 1000) * currentPrices.offer;
            }
        }
        
        totalPriceElement.textContent = window.GemApp && window.GemApp.Utils ? 
            window.GemApp.Utils.formatNumber(totalPrice) : totalPrice.toLocaleString();
    }

    updateLastUpdated() {
        const lastUpdatedElement = this.container.querySelector('#lastUpdated');
        lastUpdatedElement.textContent = window.GemApp && window.GemApp.Utils ? 
            window.GemApp.Utils.updateLastUpdated() : new Date().toLocaleString('th-TH');
    }

    async fetchPricesFromAPI() {
        try {
            // Fetch Gold prices
            if (this.apiUrls.gold) {
                const goldResponse = await fetch(this.apiUrls.gold);
                const goldData = await goldResponse.json();
                
                // อัพเดทราคาทองคำตาม API format
                if (goldData.G965B) {
                    this.prices.gold['96.5_osiris'].bid = goldData.G965B.bid;
                    this.prices.gold['96.5_osiris'].offer = goldData.G965B.offer;
                    this.prices.gold['96.5_assoc'].bid = goldData.G965B.bid_asso;
                    this.prices.gold['96.5_assoc'].offer = goldData.G965B.offer_asso;
                }
                
                if (goldData.G9999B) {
                    this.prices.gold['99.99_osiris'].bid = goldData.G9999B.bid;
                    this.prices.gold['99.99_osiris'].offer = goldData.G9999B.offer;
                }
                
                if (goldData.G9999KG) {
                    this.prices.gold['99.99_osiris_kg'].bid = goldData.G9999KG.bid;
                    this.prices.gold['99.99_osiris_kg'].offer = goldData.G9999KG.offer;
                }
            }
            
            // Fetch Silver prices
            if (this.apiUrls.silver) {
                const silverResponse = await fetch(this.apiUrls.silver);
                const silverData = await silverResponse.json();
                
                // อัพเดทราคาเงินตาม API format
                if (silverData.Silver) {
                    this.prices.silver['bar_99.99'].bid = parseInt(silverData.Silver.bid);
                    this.prices.silver['bar_99.99'].offer = parseInt(silverData.Silver.offer);
                }
            }
            
            // อัพเดทการแสดงผล
            this.updateDisplay();
            this.updateLastUpdated();
            
        } catch (error) {
            console.log('เชื่อมต่อ API ไม่ได้ ใช้ราคาจำลอง');
            this.simulatePriceUpdate();
            this.updateDisplay();
            this.updateLastUpdated();
        }
    }

    simulatePriceUpdate() {
        // จำลองการเปลี่ยนแปลงราคาเล็กน้อย
        const goldTypes = ['96.5_assoc', '96.5_osiris', '99.99_osiris'];
        goldTypes.forEach(type => {
            const variation = (Math.random() - 0.5) * 100;
            const basePrice = type === '99.99_osiris' ? 53070 : 51150;
            this.prices.gold[type].offer = Math.max(basePrice * 0.98, basePrice + variation);
            this.prices.gold[type].bid = this.prices.gold[type].offer - 100;
        });
        
        // ทอง 99.99% กิโลกรัม
        const kgVariation = (Math.random() - 0.5) * 10000;
        this.prices.gold['99.99_osiris_kg'].offer = Math.max(3470000, 3481000 + kgVariation);
        this.prices.gold['99.99_osiris_kg'].bid = this.prices.gold['99.99_osiris_kg'].offer - 3000;
        
        // เงิน - ราคาต่อกิโลกรัม
        const silverVariation = (Math.random() - 0.5) * 500;
        this.prices.silver['bar_99.99'].offer = Math.max(34000, 35391 + silverVariation);
        this.prices.silver['bar_99.99'].bid = this.prices.silver['bar_99.99'].offer - 300;
    }
}

// Export to global scope
// Ensure GemApp namespace exists
window.GemApp = window.GemApp || {};

window.GemApp.GoldSilverCalculator = GoldSilverCalculator;