/**
 * Gem Banner Components CDN
 * Version: 1.0.0
 * 
 * Responsive banner component with desktop and mobile image support
 * สำหรับแสดง banner ที่รองรับ desktop และ mobile แบบ responsive
 */

(function(window) {
    'use strict';

    // Default configuration
    const DEFAULT_CONFIG = {
        title: 'Bangkok Gems & Jewelry Fair 2025',
        description: 'งานแสดงอัญมณีและเครื่องประดับระดับโลกครั้งที่ 72',
        buttonText: 'เรียนรู้เพิ่มเติม',
        buttonUrl: '#',
        desktopImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop&auto=format',
        mobileImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&auto=format',
        buttonColor: '#002458',
        overlayColor: 'rgba(0, 36, 88, 0.4)',
        contentPosition: 'left'
    };

    const HERO_DEFAULT_CONFIG = {
        title: 'Ausiris Gold & Silver',
        subtitle: 'ผู้ผลิตและจัดจำหน่ายทองคำแท่งและเงินแท่งคุณภาพสูง',
        description: 'ราคาทองคำตามราคาตลาดโลก พร้อมบริการรับซื้อคืนทุกน้ำหนัก',
        primaryButton: { text: 'ทองคำแท่งของเรา', url: 'http://www.ausiris.co.th/content/index/products/information-products.html' },
        secondaryButton: { text: 'ติดต่อเรา', url: 'https://page.line.me/lgy9487c?openQrModal=true' },
        desktopImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&auto=format',
        mobileImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&auto=format',
        overlayColor: 'rgba(0, 36, 88, 0.5)',
        contentPosition: 'center',
        fullWidth: false,
        showText: true,
        showButton: true
    };

    // CSS Styles
    const CSS_STYLES = `
        .gem-banner {
            position: relative;
            width: 100%;
            min-height: 300px;
            margin-bottom: 40px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
        }

        .gem-banner.full-width {
            border-radius: 0;
        }
        
        /* Desktop - ไม่เต็มจอ */
        @media (min-width: 769px) {
            .gem-banner.full-width {
                width: 100%;
                margin-left: 0;
                margin-right: 0;
            }
        }
        
        /* Mobile - เต็มจอ */
        @media (max-width: 768px) {
            .gem-banner.full-width {
                width: 100vw;
                margin-left: calc(-50vw + 50%);
                margin-right: 0;
                border-radius: 0;
            }
        }

        .gem-banner-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: all 0.3s ease;
            border-radius: inherit;
        }
        
        /* Mobile - เอา border-radius ออกจาก background */
        @media (max-width: 768px) {
            .gem-banner.full-width .gem-banner-background {
                border-radius: 0;
            }
        }

        .gem-banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 36, 88, 0.4);
            transition: all 0.3s ease;
        }

        .gem-banner-content {
            position: relative;
            z-index: 2;
            padding: 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .gem-banner-content.center {
            align-items: center;
            text-align: center;
        }

        .gem-banner-content.left {
            align-items: flex-start;
            text-align: left;
        }

        .gem-banner-content.right {
            align-items: flex-end;
            text-align: right;
        }

        .gem-banner-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 16px;
            line-height: 1.2;
            letter-spacing: -0.02em;
        }

        .gem-banner-subtitle {
            font-size: 1.4rem !important;
            font-weight: 500;
            margin-bottom: 12px;
            opacity: 0.95;
            line-height: 1.3;
        }

        .gem-banner-description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 24px;
            opacity: 0.9;
            max-width: 600px;
        }

        .gem-banner-button {
            display: inline-flex;
            align-items: center;
            padding: 14px 32px;
            background: #002458;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.5rem !important;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: none;
            cursor: pointer;
            margin-right: 12px;
            margin-bottom: 8px;
        }

        .gem-banner-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            background: #003a6b;
        }

        .gem-banner-button.secondary {
            background: transparent;
            border: 2px solid rgba(255, 255, 255, 0.8);
            color: white;
        }

        .gem-banner-button.secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
        }

        .gem-banner-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        /* Hero Banner Specific Styles */
        .gem-hero-banner {
            min-height: 500px;
        }

        .gem-hero-banner .gem-banner-title {
            font-size: 3rem !important;
            margin-bottom: 20px;
        }

        .gem-hero-banner .gem-banner-subtitle {
            font-size: 2.6rem !important;
            margin-bottom: 16px;
        }

        .gem-hero-banner .gem-banner-description {
            font-size: 1.7rem !important;
            margin-bottom: 32px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .gem-banner {
                min-height: 250px;
                border-radius: 8px;
            }

            .gem-banner-content {
                padding: 24px;
            }

            .gem-banner-title {
                font-size: 1.8rem;
                margin-bottom: 12px;
            }

            .gem-banner-subtitle {
                font-size: 1.1rem;
                margin-bottom: 8px;
            }

            .gem-banner-description {
                font-size: 0.95rem;
                margin-bottom: 20px;
                line-height: 1.5;
            }

            .gem-banner-button {
                padding: 12px 24px;
                font-size: 1.2rem !important;
                margin-right: 8px;
                margin-bottom: 8px;
            }

            .gem-banner-buttons {
                flex-direction: column;
                align-items: stretch;
            }

            .gem-banner-buttons .gem-banner-button {
                margin-right: 0;
                text-align: center;
                justify-content: center;
            }

            /* Hero Banner Mobile */
            .gem-hero-banner {
                min-height: 400px;
            }

            .gem-hero-banner .gem-banner-title {
                font-size: 2.2rem;
                margin-bottom: 16px;
            }

            .gem-hero-banner .gem-banner-subtitle {
                font-size: 1.2rem;
                margin-bottom: 12px;
            }

            .gem-hero-banner .gem-banner-description {
                font-size: 1rem;
                margin-bottom: 24px;
            }
        }

        @media (max-width: 480px) {
            .gem-banner-content {
                padding: 20px;
            }

            .gem-banner-title {
                font-size: 1.5rem;
            }

            .gem-banner-subtitle {
                font-size: 1rem;
            }

            .gem-banner-description {
                font-size: 0.9rem;
            }

            .gem-hero-banner .gem-banner-title {
                font-size: 1.8rem;
            }

            .gem-hero-banner .gem-banner-subtitle {
                font-size: 1.1rem;
            }
        }
    `;

    // Function to inject CSS
    function injectCSS() {
        if (document.getElementById('gem-banner-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'gem-banner-styles';
        style.textContent = CSS_STYLES;
        document.head.appendChild(style);
    }

    // Function to get responsive image URL
    function getResponsiveImage(config) {
        const isMobile = window.innerWidth <= 768;
        return isMobile ? config.mobileImage : config.desktopImage;
    }

    // Function to create basic banner
    function createBanner(containerId, userConfig = {}) {
        injectCSS();
        
        const config = { ...DEFAULT_CONFIG, ...userConfig };
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        const imageUrl = getResponsiveImage(config);
        
        const bannerClass = config.fullWidth ? 'gem-banner full-width' : 'gem-banner';
        const contentClass = config.showText === false ? 'gem-banner-content no-text' : `gem-banner-content ${config.contentPosition}`;
        const imageOnlyClass = config.showText === false && config.showButton === false ? ' image-only' : '';
        
        let contentHTML = '';
        if (config.showText !== false || config.showButton !== false) {
            contentHTML = `
                <div class="${contentClass}">
                    ${config.showText !== false ? `
                        <h2 class="gem-banner-title">${config.title}</h2>
                        <p class="gem-banner-description">${config.description}</p>
                    ` : ''}
                    ${config.showButton !== false ? `
                        <a href="${config.buttonUrl}" class="gem-banner-button" style="background: ${config.buttonColor}">
                            ${config.buttonText}
                        </a>
                    ` : ''}
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="${bannerClass}${imageOnlyClass}">
                <div class="gem-banner-background" style="background-image: url('${imageUrl}')"></div>
                <div class="gem-banner-overlay" style="background: ${config.overlayColor}"></div>
                ${contentHTML}
            </div>
        `;

        // Update image on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newImageUrl = getResponsiveImage(config);
                const backgroundEl = container.querySelector('.gem-banner-background');
                if (backgroundEl && backgroundEl.style.backgroundImage !== `url("${newImageUrl}")`) {
                    backgroundEl.style.backgroundImage = `url('${newImageUrl}')`;
                }
            }, 250);
        });
    }

    // Function to create hero banner
    function createHeroBanner(containerId, userConfig = {}) {
        injectCSS();
        
        const config = { ...HERO_DEFAULT_CONFIG, ...userConfig };
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        const imageUrl = getResponsiveImage(config);
        
        const bannerClass = config.fullWidth ? 'gem-banner gem-hero-banner full-width' : 'gem-banner gem-hero-banner';
        const contentClass = config.showText === false ? 'gem-banner-content no-text' : `gem-banner-content ${config.contentPosition}`;
        const imageOnlyClass = config.showText === false && config.showButton === false ? ' image-only' : '';
        
        let contentHTML = '';
        if (config.showText !== false || config.showButton !== false) {
            const buttonsHTML = config.showButton !== false ? `
                <div class="gem-banner-buttons">
                    ${config.primaryButton ? `<a href="${config.primaryButton.url}" class="gem-banner-button">${config.primaryButton.text}</a>` : ''}
                    ${config.secondaryButton ? `<a href="${config.secondaryButton.url}" class="gem-banner-button secondary">${config.secondaryButton.text}</a>` : ''}
                </div>
            ` : '';
            
            contentHTML = `
                <div class="${contentClass}">
                    ${config.showText !== false ? `
                        <h1 class="gem-banner-title">${config.title}</h1>
                        ${config.subtitle ? `<h2 class="gem-banner-subtitle">${config.subtitle}</h2>` : ''}
                        <p class="gem-banner-description">${config.description}</p>
                    ` : ''}
                    ${buttonsHTML}
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="${bannerClass}${imageOnlyClass}">
                <div class="gem-banner-background" style="background-image: url('${imageUrl}')"></div>
                <div class="gem-banner-overlay" style="background: ${config.overlayColor}"></div>
                ${contentHTML}
            </div>
        `;

        // Update image on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newImageUrl = getResponsiveImage(config);
                const backgroundEl = container.querySelector('.gem-banner-background');
                if (backgroundEl && backgroundEl.style.backgroundImage !== `url("${newImageUrl}")`) {
                    backgroundEl.style.backgroundImage = `url('${newImageUrl}')`;
                }
            }, 250);
        });
    }

    // Function to update all banners on resize
    function updateAllBannersOnResize() {
        // This function can be called to manually refresh all banners
        window.dispatchEvent(new Event('resize'));
    }

    // Public API
    window.GemBanner = {
        createBanner: createBanner,
        createHeroBanner: createHeroBanner,
        updateAllBanners: updateAllBannersOnResize,
        version: '1.0.0'
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCSS);
    } else {
        injectCSS();
    }

})(window);