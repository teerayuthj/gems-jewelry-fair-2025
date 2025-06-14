// ====== Realtime Price Component ======
// Load CSS if not already loaded
if (!document.querySelector('link[href*="realtime-stable.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/realtime-stable.css';
    document.head.appendChild(link);
}

class RealtimePriceComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            updateInterval: 3000, // 3 seconds
            showTitle: true,
            ...options
        };
        
        // API URLs - จะใส่ URL จริงภายหลัง
        this.apiUrls = {
            goldRealtime: 'http://27.254.77.78/rest/public/rest/goldspot',
            goldYesterday: 'http://27.254.77.78/rest/public/rest/goldspot-yesterday', 
            silverRealtime: 'http://27.254.77.78/rest/public/rest/silver',
            silverYesterday: 'http://27.254.77.78/rest/public/rest/silver-yesterday'
        };
        
        // Data storage
        this.currentData = {
            gold: null,
            silver: null
        };
        
        this.yesterdayData = {
            gold: null,
            silver: null
        };
        
        // Previous data for real-time comparison
        this.previousData = {
            gold: null,
            silver: null
        };
        
        
        this.updateTimer = null;
        this.init();
    }

    init() {
        this.render();
        this.fetchYesterdayPrices();
        this.startRealTimeUpdates();
        this.isInitialized = false;
    }

    render() {
        const currentDateTime = this.getCurrentDateTime();
        
        this.container.innerHTML = `
            <div class="realtime-price-container">
                ${this.options.showTitle ? `
                    <div class="realtime-price-header">
                        <h2 class="realtime-price-title">ราคาทองคำและแท่งเงิน Real-time Ausiris</h2>
                        <div class="current-datetime" id="currentDateTime">${currentDateTime}</div>
                    </div>
                ` : ''}
                
                <div class="realtime-price-grid" id="priceGrid">
                    ${this.renderLoadingState()}
                </div>
                
                <div class="realtime-footer">
                    <div class="last-updated">
                        <div class="status-indicator"></div>
                        <span>อัพเดทล่าสุด: <span id="lastUpdatedTime">กำลังโหลด...</span></span>
                    </div>
                </div>
            </div>
        `;
    }

    getCurrentDateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Bangkok',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return now.toLocaleString('th-TH', options) + ' น.';
    }

    updateCurrentDateTime() {
        const dateTimeElement = this.container.querySelector('#currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = this.getCurrentDateTime();
        }
    }

    renderLoadingState() {
        return `
            <div class="realtime-price-card loading-state">
                <div class="price-card-header">
                    <h3 class="price-card-title">กำลังโหลดข้อมูล...</h3>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">---</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">---</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change neutral">---</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPriceCards() {
        const goldData = this.currentData.gold;
        const silverData = this.currentData.silver;
        
        let html = '';
        
        if (goldData) {
            // ทอง 96.5% ออสสิริส
            html += this.renderGoldCard(
                'ทองคำ 96.5%',
                'ออสสิริส',
                goldData.G965B,
                this.yesterdayData.gold?.G965B,
                this.previousData.gold?.G965B,
                'gold-965'
            );
            
            // ทอง 99.99% ออสสิริส
            html += this.renderGoldCard(
                'ทองคำ 99.99%',
                'ออสสิริส',
                goldData.G9999B,
                this.yesterdayData.gold?.G9999B,
                this.previousData.gold?.G9999B,
                'gold-9999'
            );
            
            // Spot Gold USD
            html += this.renderSpotGoldCard(
                'Spot Gold',
                'USD/oz',
                goldData.G9999US,
                this.yesterdayData.gold?.G9999US,
                this.previousData.gold?.G9999US,
                'spot-gold'
            );
            
            // ทอง 99.99% กิโลกรัม
            html += this.renderGoldKgCard(
                'ทองคำ 99.99%',
                'กิโลกรัม',
                goldData.G9999KG,
                this.yesterdayData.gold?.G9999KG,
                this.previousData.gold?.G9999KG,
                'gold-kg'
            );
            
            // สมาคมฯ 96.5%
            html += this.renderGoldAssocCard(
                'ทองคำ 96.5%',
                'สมาคมฯ',
                goldData.G965B,
                this.yesterdayData.gold?.G965B,
                this.previousData.gold?.G965B,
                'gold-assoc'
            );
        }
        
        if (silverData) {
            // เงิน USD
            html += this.renderSilverUsdCard(
                'Silver',
                'USD/oz',
                silverData.Silver,
                this.yesterdayData.silver?.Silver,
                this.previousData.silver?.Silver,
                'silver-usd'
            );
            
            // เงิน THB
            html += this.renderSilverThbCard(
                'แท่งเงิน',
                'THB/kg',
                silverData.Silver,
                this.yesterdayData.silver?.Silver,
                this.previousData.silver?.Silver,
                'silver-thb'
            );
        }
        
        return html;
    }

    renderGoldCard(title, type, data, yesterdayData, previousData = null, cardId = '') {
        // Real-time changes (current vs previous update)
        const bidChangeRT = this.calculateChange(data.bid, previousData?.bid);
        const offerChangeRT = this.calculateChange(data.offer, previousData?.offer);
        
        // Yesterday changes (current vs yesterday) - for "เปลี่ยนแปลง" display
        const overallChange = this.calculateChange(data.offer, yesterdayData?.offer);
        
        const cardClass = this.getCardClass(offerChangeRT); // Card BG based on real-time change
        
        return `
            <div class="realtime-price-card ${cardClass}" data-card="${cardId}">
                <div class="price-card-header">
                    <h3 class="price-card-title">${title}</h3>
                    <span class="price-card-type">${type}</span>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">${this.formatNumber(data.bid)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">${this.formatNumber(data.offer)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change ${this.getChangeClass(overallChange)}">
                            ${this.formatChange(overallChange)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderGoldAssocCard(title, type, data, yesterdayData, previousData = null, cardId = '') {
        // Real-time changes
        const bidChangeRT = this.calculateChange(data.bid_asso, previousData?.bid_asso);
        const offerChangeRT = this.calculateChange(data.offer_asso, previousData?.offer_asso);
        // Yesterday changes
        const overallChange = this.calculateChange(data.offer_asso, yesterdayData?.offer_asso);
        
        const cardClass = this.getCardClass(offerChangeRT);
        
        return `
            <div class="realtime-price-card ${cardClass}" data-card="${cardId}">
                <div class="price-card-header">
                    <h3 class="price-card-title">${title}</h3>
                    <span class="price-card-type">${type}</span>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">${this.formatNumber(data.bid_asso)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">${this.formatNumber(data.offer_asso)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change ${this.getChangeClass(overallChange)}">
                            ${this.formatChange(overallChange)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSpotGoldCard(title, type, data, yesterdayData, previousData = null, cardId = '') {
        // Real-time changes
        const bidChangeRT = this.calculateChange(data.bid, previousData?.bid);
        const offerChangeRT = this.calculateChange(data.offer, previousData?.offer);
        // Yesterday changes
        const overallChange = this.calculateChange(data.offer, yesterdayData?.offer);
        
        const cardClass = this.getCardClass(offerChangeRT);
        
        return `
            <div class="realtime-price-card ${cardClass}" data-card="${cardId}">
                <div class="price-card-header">
                    <h3 class="price-card-title">${title}</h3>
                    <span class="price-card-type">${type}</span>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">$${this.formatNumber(data.bid, 2)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">$${this.formatNumber(data.offer, 2)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change ${this.getChangeClass(overallChange)}">
                            ${this.formatChange(overallChange, 2)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderGoldKgCard(title, type, data, yesterdayData, previousData = null, cardId = '') {
        // Real-time changes
        const bidChangeRT = this.calculateChange(data.bid, previousData?.bid);
        const offerChangeRT = this.calculateChange(data.offer, previousData?.offer);
        // Yesterday changes
        const overallChange = this.calculateChange(data.offer, yesterdayData?.offer);
        
        const cardClass = this.getCardClass(offerChangeRT);
        
        return `
            <div class="realtime-price-card ${cardClass}" data-card="${cardId}">
                <div class="price-card-header">
                    <h3 class="price-card-title">${title}</h3>
                    <span class="price-card-type">${type}</span>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">${this.formatNumber(data.bid)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">${this.formatNumber(data.offer)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change ${this.getChangeClass(overallChange)}">
                            ${this.formatChange(overallChange)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSilverUsdCard(title, type, data, yesterdayData, previousData = null, cardId = '') {
        const bidSpot = parseFloat(data.bidspot);
        const offerSpot = parseFloat(data.offerspot);
        // Real-time changes
        const bidChangeRT = this.calculateChange(bidSpot, previousData ? parseFloat(previousData.bidspot) : null);
        const offerChangeRT = this.calculateChange(offerSpot, previousData ? parseFloat(previousData.offerspot) : null);
        // Yesterday changes
        const overallChange = this.calculateChange(offerSpot, yesterdayData ? parseFloat(yesterdayData.offerspot) : null);
        
        const cardClass = this.getCardClass(offerChangeRT);
        
        return `
            <div class="realtime-price-card ${cardClass}" data-card="${cardId}">
                <div class="price-card-header">
                    <h3 class="price-card-title">${title}</h3>
                    <span class="price-card-type">${type}</span>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">$${this.formatNumber(bidSpot, 2)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">$${this.formatNumber(offerSpot, 2)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change ${this.getChangeClass(overallChange)}">
                            ${this.formatChange(overallChange, 2)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSilverThbCard(title, type, data, yesterdayData, previousData = null, cardId = '') {
        const bid = parseInt(data.bid);
        const offer = parseInt(data.offer);
        // Real-time changes
        const bidChangeRT = this.calculateChange(bid, previousData ? parseInt(previousData.bid) : null);
        const offerChangeRT = this.calculateChange(offer, previousData ? parseInt(previousData.offer) : null);
        // Yesterday changes
        const overallChange = this.calculateChange(offer, yesterdayData ? parseInt(yesterdayData.offer) : null);
        
        const cardClass = this.getCardClass(offerChangeRT);
        
        return `
            <div class="realtime-price-card ${cardClass}" data-card="${cardId}">
                <div class="price-card-header">
                    <h3 class="price-card-title">${title}</h3>
                    <span class="price-card-type">${type}</span>
                </div>
                <div class="price-values">
                    <div class="price-value">
                        <div class="price-label">ซื้อ</div>
                        <div class="price-amount">${this.formatNumber(bid)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">ขาย</div>
                        <div class="price-amount">${this.formatNumber(offer)}</div>
                    </div>
                    <div class="price-value">
                        <div class="price-label">เปลี่ยนแปลง</div>
                        <div class="price-change ${this.getChangeClass(overallChange)}">
                            ${this.formatChange(overallChange)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    calculateChange(current, yesterday) {
        if (!current || !yesterday) return 0;
        return current - yesterday;
    }

    getChangeClass(change) {
        if (change > 0) return 'positive';
        if (change < 0) return 'negative';
        return 'neutral';
    }

    getCardClass(change) {
        if (change > 0) return 'price-up';
        if (change < 0) return 'price-down';
        return 'price-neutral';
    }

    getValueClass(change) {
        if (change > 0) return 'value-up';
        if (change < 0) return 'value-down';
        return 'value-neutral';
    }

    formatChange(change, decimals = 2) {
        if (change === 0) return '0.00';
        const sign = change > 0 ? '+' : '';
        return `${sign}${this.formatNumber(change, decimals)}`;
    }

    formatNumber(num, decimals = 2) {
        if (!num && num !== 0) return '---';
        return new Intl.NumberFormat('th-TH', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    }

    async fetchYesterdayPrices() {
        try {
            const [goldResponse, silverResponse] = await Promise.all([
                fetch(this.apiUrls.goldYesterday),
                fetch(this.apiUrls.silverYesterday)
            ]);
            
            this.yesterdayData.gold = await goldResponse.json();
            this.yesterdayData.silver = await silverResponse.json();
            
        } catch (error) {
            console.error('Error fetching yesterday prices:', error);
        }
    }

    async fetchRealtimePrices() {
        try {
            const [goldResponse, silverResponse] = await Promise.all([
                fetch(this.apiUrls.goldRealtime),
                fetch(this.apiUrls.silverRealtime)
            ]);
            
            // Store previous data before updating
            if (this.currentData.gold) {
                this.previousData.gold = JSON.parse(JSON.stringify(this.currentData.gold));
            }
            if (this.currentData.silver) {
                this.previousData.silver = JSON.parse(JSON.stringify(this.currentData.silver));
            }
            
            this.currentData.gold = await goldResponse.json();
            this.currentData.silver = await silverResponse.json();
            
            this.updateDisplay();
            this.updateLastUpdatedTime();
            this.updateCurrentDateTime();
            
        } catch (error) {
            console.error('Error fetching real-time prices:', error);
            this.showErrorState();
        }
    }

    updateDisplay() {
        const priceGrid = this.container.querySelector('#priceGrid');
        
        if (!this.isInitialized) {
            // First time render - use innerHTML
            priceGrid.innerHTML = this.renderPriceCards();
            this.isInitialized = true;
            this.cacheCardElements();
        } else {
            // Subsequent updates - selective update only
            this.updatePriceValues();
        }
    }

    cacheCardElements() {
        this.cardElements = {
            gold965: this.container.querySelector('[data-card="gold-965"]'),
            gold9999: this.container.querySelector('[data-card="gold-9999"]'),
            spotGold: this.container.querySelector('[data-card="spot-gold"]'),
            goldKg: this.container.querySelector('[data-card="gold-kg"]'),
            goldAssoc: this.container.querySelector('[data-card="gold-assoc"]'),
            silverUsd: this.container.querySelector('[data-card="silver-usd"]'),
            silverThb: this.container.querySelector('[data-card="silver-thb"]')
        };
    }

    updatePriceValues() {
        const goldData = this.currentData.gold;
        const silverData = this.currentData.silver;
        
        if (goldData) {
            this.updateGoldCard('gold965', goldData.G965B, this.yesterdayData.gold?.G965B, this.previousData.gold?.G965B);
            this.updateGoldCard('gold9999', goldData.G9999B, this.yesterdayData.gold?.G9999B, this.previousData.gold?.G9999B);
            this.updateSpotGoldCard('spotGold', goldData.G9999US, this.yesterdayData.gold?.G9999US, this.previousData.gold?.G9999US);
            this.updateGoldKgCard('goldKg', goldData.G9999KG, this.yesterdayData.gold?.G9999KG, this.previousData.gold?.G9999KG);
            this.updateGoldAssocCard('goldAssoc', goldData.G965B, this.yesterdayData.gold?.G965B, this.previousData.gold?.G965B);
        }
        
        if (silverData) {
            this.updateSilverUsdCard('silverUsd', silverData.Silver, this.yesterdayData.silver?.Silver, this.previousData.silver?.Silver);
            this.updateSilverThbCard('silverThb', silverData.Silver, this.yesterdayData.silver?.Silver, this.previousData.silver?.Silver);
        }
    }

    updateGoldCard(cardKey, data, yesterdayData, previousData) {
        const card = this.cardElements[cardKey];
        if (!card || !data) return;
        
        const bidChangeRT = this.calculateChange(data.bid, previousData?.bid);
        const offerChangeRT = this.calculateChange(data.offer, previousData?.offer);
        const overallChange = this.calculateChange(data.offer, yesterdayData?.offer);
        
        this.updateCardClasses(card, bidChangeRT, offerChangeRT);
        this.updatePriceAmount(card, '.price-value:nth-child(1) .price-amount', this.formatNumber(data.bid));
        this.updatePriceAmount(card, '.price-value:nth-child(2) .price-amount', this.formatNumber(data.offer));
        this.updatePriceChange(card, '.price-change', overallChange);
    }

    updateSpotGoldCard(cardKey, data, yesterdayData, previousData) {
        const card = this.cardElements[cardKey];
        if (!card || !data) return;
        
        const bidChangeRT = this.calculateChange(data.bid, previousData?.bid);
        const offerChangeRT = this.calculateChange(data.offer, previousData?.offer);
        const overallChange = this.calculateChange(data.offer, yesterdayData?.offer);
        
        this.updateCardClasses(card, bidChangeRT, offerChangeRT);
        this.updatePriceAmount(card, '.price-value:nth-child(1) .price-amount', `$${this.formatNumber(data.bid, 2)}`);
        this.updatePriceAmount(card, '.price-value:nth-child(2) .price-amount', `$${this.formatNumber(data.offer, 2)}`);
        this.updatePriceChange(card, '.price-change', overallChange, 2);
    }

    updateGoldKgCard(cardKey, data, yesterdayData, previousData) {
        const card = this.cardElements[cardKey];
        if (!card || !data) return;
        
        const bidChangeRT = this.calculateChange(data.bid, previousData?.bid);
        const offerChangeRT = this.calculateChange(data.offer, previousData?.offer);
        const overallChange = this.calculateChange(data.offer, yesterdayData?.offer);
        
        this.updateCardClasses(card, bidChangeRT, offerChangeRT);
        this.updatePriceAmount(card, '.price-value:nth-child(1) .price-amount', this.formatNumber(data.bid));
        this.updatePriceAmount(card, '.price-value:nth-child(2) .price-amount', this.formatNumber(data.offer));
        this.updatePriceChange(card, '.price-change', overallChange);
    }

    updateGoldAssocCard(cardKey, data, yesterdayData, previousData) {
        const card = this.cardElements[cardKey];
        if (!card || !data) return;
        
        const bidChangeRT = this.calculateChange(data.bid_asso, previousData?.bid_asso);
        const offerChangeRT = this.calculateChange(data.offer_asso, previousData?.offer_asso);
        const overallChange = this.calculateChange(data.offer_asso, yesterdayData?.offer_asso);
        
        this.updateCardClasses(card, bidChangeRT, offerChangeRT);
        this.updatePriceAmount(card, '.price-value:nth-child(1) .price-amount', this.formatNumber(data.bid_asso));
        this.updatePriceAmount(card, '.price-value:nth-child(2) .price-amount', this.formatNumber(data.offer_asso));
        this.updatePriceChange(card, '.price-change', overallChange);
    }

    updateSilverUsdCard(cardKey, data, yesterdayData, previousData) {
        const card = this.cardElements[cardKey];
        if (!card || !data) return;
        
        const bidSpot = parseFloat(data.bidspot);
        const offerSpot = parseFloat(data.offerspot);
        const bidChangeRT = this.calculateChange(bidSpot, previousData ? parseFloat(previousData.bidspot) : null);
        const offerChangeRT = this.calculateChange(offerSpot, previousData ? parseFloat(previousData.offerspot) : null);
        const overallChange = this.calculateChange(offerSpot, yesterdayData ? parseFloat(yesterdayData.offerspot) : null);
        
        this.updateCardClasses(card, bidChangeRT, offerChangeRT);
        this.updatePriceAmount(card, '.price-value:nth-child(1) .price-amount', `$${this.formatNumber(bidSpot, 2)}`);
        this.updatePriceAmount(card, '.price-value:nth-child(2) .price-amount', `$${this.formatNumber(offerSpot, 2)}`);
        this.updatePriceChange(card, '.price-change', overallChange, 2);
    }

    updateSilverThbCard(cardKey, data, yesterdayData, previousData) {
        const card = this.cardElements[cardKey];
        if (!card || !data) return;
        
        const bid = parseInt(data.bid);
        const offer = parseInt(data.offer);
        const bidChangeRT = this.calculateChange(bid, previousData ? parseInt(previousData.bid) : null);
        const offerChangeRT = this.calculateChange(offer, previousData ? parseInt(previousData.offer) : null);
        const overallChange = this.calculateChange(offer, yesterdayData ? parseInt(yesterdayData.offer) : null);
        
        this.updateCardClasses(card, bidChangeRT, offerChangeRT);
        this.updatePriceAmount(card, '.price-value:nth-child(1) .price-amount', this.formatNumber(bid));
        this.updatePriceAmount(card, '.price-value:nth-child(2) .price-amount', this.formatNumber(offer));
        this.updatePriceChange(card, '.price-change', overallChange);
    }

    updateCardClasses(card, bidChangeRT, offerChangeRT) {
        // Update main card class only - individual price values inherit colors from card
        card.className = card.className.replace(/\b(price-up|price-down|price-neutral)\b/g, '');
        card.classList.add(this.getCardClass(offerChangeRT));
    }

    updatePriceAmount(card, selector, value) {
        const element = card.querySelector(selector);
        if (element && element.textContent !== value) {
            element.textContent = value;
        }
    }

    updatePriceChange(card, selector, change, decimals = 2) {
        const element = card.querySelector(selector);
        if (element) {
            const newValue = this.formatChange(change, decimals);
            if (element.textContent !== newValue) {
                element.textContent = newValue;
                element.className = element.className.replace(/\b(positive|negative|neutral)\b/g, '');
                element.classList.add('price-change', this.getChangeClass(change));
            }
        }
    }

    updateLastUpdatedTime() {
        const lastUpdatedElement = this.container.querySelector('#lastUpdatedTime');
        const now = new Date();
        const timeString = now.toLocaleString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Bangkok'
        });
        lastUpdatedElement.textContent = timeString + ' น.';
    }

    showErrorState() {
        const priceGrid = this.container.querySelector('#priceGrid');
        priceGrid.innerHTML = `
            <div class="realtime-price-card error-state">
                <div class="price-card-header">
                    <h3 class="price-card-title">ไม่สามารถโหลดข้อมูลได้</h3>
                </div>
                <p>กรุณาลองใหม่อีกครั้ง</p>
            </div>
        `;
    }

    startRealTimeUpdates() {
        // Initial fetch
        this.fetchRealtimePrices();
        
        // Set up interval for updates every 3 seconds
        this.updateTimer = setInterval(() => {
            this.fetchRealtimePrices();
        }, this.options.updateInterval);
    }

    stopRealTimeUpdates() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    destroy() {
        this.stopRealTimeUpdates();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export to global scope
// Ensure GemApp namespace exists
window.GemApp = window.GemApp || {};

window.GemApp.RealtimePriceComponent = RealtimePriceComponent;