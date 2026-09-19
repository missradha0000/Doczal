document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const qrText = document.getElementById('qrText');
    const dotColor = document.getElementById('dotColor');
    const dotColorHex = document.getElementById('dotColorHex');
    const bgColor = document.getElementById('bgColor');
    const bgColorHex = document.getElementById('bgColorHex');
    const logoInput = document.getElementById('logoInput');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const qrCanvasContainer = document.getElementById('qrCanvasContainer');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    let uploadedLogoData = null;

    // Initialize QRCodeStyling instance
    const qrCode = new QRCodeStyling({
        width: 230,
        height: 230,
        type: "canvas",
        data: qrText.value || "https://tveezal.com",
        dotsOptions: {
            color: dotColor.value,
            type: "rounded"
        },
        backgroundOptions: {
            color: bgColor.value,
        },
        imageOptions: {
            crossOrigin: "anonymous",
            imageSize: 0.4,
            margin: 5
        }
    });

    // Append generated QR code to container
    qrCode.append(qrCanvasContainer);

    // Update Function
    function updateQRCode() {
        const options = {
            data: qrText.value || "https://tveezal.com",
            dotsOptions: {
                color: dotColor.value,
                type: "rounded"
            },
            backgroundOptions: {
                color: bgColor.value
            }
        };

        if (uploadedLogoData) {
            options.image = uploadedLogoData;
        } else {
            options.image = "";
        }

        qrCode.update(options);
    }

    // Event Listeners for Live Preview
    qrText.addEventListener('input', updateQRCode);

    dotColor.addEventListener('input', (e) => {
        dotColorHex.textContent = e.target.value;
        updateQRCode();
    });

    bgColor.addEventListener('input', (e) => {
        bgColorHex.textContent = e.target.value;
        updateQRCode();
    });

    // FileReader API for local logo processing
    logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file for the logo.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedLogoData = event.target.result;
            removeLogoBtn.style.display = 'block';
            updateQRCode();
        };
        reader.readAsDataURL(file);
    });

    // Remove Logo Button
    removeLogoBtn.addEventListener('click', () => {
        uploadedLogoData = null;
        logoInput.value = "";
        removeLogoBtn.style.display = 'none';
        updateQRCode();
    });

    // Download QR Code as PNG
    downloadQrBtn.addEventListener('click', () => {
        qrCode.download({ name: "tveezal-qr-code", extension: "png" });
    });

    // FAQs Accordion Logic
    const FAQS = [
        { q: "Is the QR Code Generator free to use?", a: "Yes! All tools on Tveezal Tools are 100% free with no hidden paywalls or registration requirements." },
        { q: "Are my uploaded logos or data secure?", a: "Absolutely. Your logo images and text payloads are processed directly inside your browser memory using the FileReader API and are never uploaded to any remote servers." },
        { q: "Can I use the generated QR codes commercially?", a: "Yes, all QR codes generated are static and permanently yours to use on packaging, menus, websites, and marketing materials." },
        { q: "What image formats are supported for the center logo?", a: "You can upload standard PNG, JPG, JPEG, or WebP image files." },
        { q: "Will the QR code still scan with a logo in the center?", a: "Yes, the generator reserves a dedicated error-correction margin so smartphone cameras can scan the code seamlessly." },
        { q: "Do I need an internet connection to use this tool?", a: "Once loaded, this tool can run entirely offline directly within your browser sandbox." },
        { q: "Where can I find other utilities?", a: "Explore our <a href='index.html'>Tveezal Tools Home</a> for PDF tools, image compressors, and text calculators." }
    ];

    const faqList = document.getElementById("faqList");
    if (faqList) {
        FAQS.forEach(item => {
            const div = document.createElement("div");
            div.className = "faq-item";
            div.innerHTML = `
                <button class="faq-question">
                    <span>${item.q}</span>
                    <i class="fas fa-chevron-down" style="color:var(--muted); font-size:12px;"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-inner">${item.a}</div>
                </div>
            `;
            div.querySelector(".faq-question").addEventListener("click", () => {
                div.classList.toggle("open");
                const icon = div.querySelector(".fa-chevron-down");
                if (icon) icon.style.transform = div.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
            });
            faqList.appendChild(div);
        });
    }

    // Smart Back & Share Buttons
    const smartBackBtn = document.getElementById("smartBackBtn");
    const shareToolBtn = document.getElementById("shareToolBtn");
    const footerShareWebsiteBtn = document.getElementById("footerShareWebsiteBtn");
    const drawerShareWebsiteBtn = document.getElementById("drawerShareWebsiteBtn");

    const referrer = document.referrer;
    const isFromHome = referrer && (referrer.includes("index.html") || referrer.includes(window.location.hostname));

    if (smartBackBtn) {
        smartBackBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (isFromHome && window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html#category-qr";
            }
        });
    }

    if (shareToolBtn) {
        shareToolBtn.addEventListener("click", () => {
            if (navigator.share) {
                navigator.share({
                    title: "Advanced QR Code Generator – Tveezal Tools",
                    text: "Create custom branded QR codes instantly for free in your browser!",
                    url: window.location.href
                }).catch(() => {});
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Tool link copied to clipboard!");
            }
        });
    }

    function shareFullWebsite() {
        const homeUrl = window.location.origin + "/index.html";
        if (navigator.share) {
            navigator.share({
                title: "Tveezal Tools – Free Online Utilities",
                text: "Explore 34+ free browser tools for PDF, image compression, fancy fonts, and calculations!",
                url: homeUrl
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(homeUrl);
            alert("Website link copied to clipboard!");
        }
    }
    if (footerShareWebsiteBtn) footerShareWebsiteBtn.addEventListener("click", shareFullWebsite);
    if (drawerShareWebsiteBtn) drawerShareWebsiteBtn.addEventListener("click", shareFullWebsite);

    // Side Drawer Controls
    const menuBtn = document.getElementById("menuButton");
    const drawer = document.getElementById("navDrawer");
    const overlay = document.getElementById("menuOverlay");
    const drawerClose = document.getElementById("drawerClose");

    function openDrawer() {
        if (drawer) drawer.classList.add("active");
        if (overlay) overlay.classList.add("active");
    }
    function closeDrawer() {
        if (drawer) drawer.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
    }
    if (menuBtn) menuBtn.addEventListener("click", openDrawer);
    if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    // Master Banner Datasets for Carousels
    const SLIM_BANNERS = [
        { image: "assets/slim-banner-1.webp", link: "image-compressor.html", title: "Compress Photo to 50KB for Govt Forms" },
        { image: "assets/slim-banner-2.webp", link: "pdf-lock.html", title: "Fast Secure PDF Encryption" },
        { image: "assets/slim-banner-3.webp", link: "font-changer.html", title: "Create 1000+ Aesthetic Fonts" },
        { image: "assets/slim-banner-4.webp", link: "internet-speed-test.html", title: "Check 5G & Fiber Latency" },
        { image: "assets/slim-banner-5.webp", link: "word-counter.html", title: "Accurate Word Reading Meter" },
        { image: "assets/slim-banner-6.webp", link: "qr-scanner.html", title: "Fast Camera QR Scanner" },
        { image: "assets/slim-banner-7.webp", link: "loan-interest-calculator.html", title: "Instant EMI Loan Calculator" },
        { image: "assets/slim-banner-8.webp", link: "area-converter.html", title: "Convert Acres, Hectares & Bigha" },
        { image: "assets/slim-banner-9.webp", link: "text-repeater.html", title: "Repeat Messages 10,000 Times" },
        { image: "assets/slim-banner-10.webp", link: "format-converter.html", title: "Convert WebP to JPG Cleanly" }
    ];

    const BOTTOM_BANNERS = [
        { image: "assets/banner-1.webp", link: "image-compressor.html", title: "Image Compressor to 50KB" },
        { image: "assets/banner-2.webp", link: "pdf-merge.html", title: "Merge Multiple PDF Files Online" },
        { image: "assets/banner-3.webp", link: "text-to-speech.html", title: "Text to Speech Synthesis" },
        { image: "assets/banner-4.webp", link: "internet-speed-test.html", title: "Live Internet Speed & Public IP" },
        { image: "assets/banner-5.webp", link: "word-counter.html", title: "Word & Character Counter" },
        { image: "assets/banner-6.webp", link: "qr-generator.html", title: "All-in-One Custom QR Generator" },
        { image: "assets/banner-7.webp", link: "font-changer.html", title: "Fancy Font Changer for Social Media" },
        { image: "assets/banner-8.webp", link: "age-calculator.html", title: "Accurate Age Calculator" },
        { image: "assets/banner-9.webp", link: "background-remover.html", title: "AI Background Remover" },
        { image: "assets/banner-10.webp", link: "format-converter.html", title: "Image Format Converter" }
    ];

    // Carousel Engine
    function setupCarousel(trackId, dotsId, dataset) {
        const track = document.getElementById(trackId);
        const dotsContainer = document.getElementById(dotsId);
        if (!track || !dotsContainer) return;

        const carousel = track.closest('.banner-carousel');
        let current = 0;
        let timer = null;

        let isDraggingCarousel = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;

        track.innerHTML = "";
        dotsContainer.innerHTML = "";

        dataset.forEach((b, idx) => {
            const slide = document.createElement("a");
            slide.className = "banner-slide";
            slide.href = b.link;
            slide.innerHTML = `
                <img src="${b.image}" alt="${b.title}" loading="${idx === 0 ? 'eager' : 'lazy'}" onerror="this.parentElement.innerHTML='<div class=\\'banner-fallback\\'><h3>${b.title}</h3><p>Fast Online Utility on Tveezal Tools</p></div>'">
            `;
            track.appendChild(slide);

            const dot = document.createElement("button");
            dot.className = `banner-dot ${idx === 0 ? 'active' : ''}`;
            dot.setAttribute("aria-label", `Slide ${idx + 1}`);
            dot.addEventListener("click", () => {
                current = idx;
                setPositionByIndex();
                restartTimer();
            });
            dotsContainer.appendChild(dot);
        });

        function setSliderPosition() {
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        function animation() {
            setSliderPosition();
            if (isDraggingCarousel) requestAnimationFrame(animation);
        }

        function setPositionByIndex(smooth = true) {
            currentTranslate = -current * carousel.offsetWidth;
            prevTranslate = currentTranslate;
            track.style.transition = smooth ? 'transform 0.45s cubic-bezier(.22, .61, .36, 1)' : 'none';
            setSliderPosition();
            updateDots();
        }

        function updateDots() {
            dotsContainer.querySelectorAll(".banner-dot").forEach((d, i) => {
                d.classList.toggle("active", i === current);
            });
        }

        function startTimer() {
            stopTimer();
            timer = setInterval(() => {
                current = (current + 1) % dataset.length;
                setPositionByIndex();
            }, 4000);
        }

        function stopTimer() {
            if (timer) clearInterval(timer);
        }

        function restartTimer() {
            stopTimer();
            startTimer();
        }

        function touchStart(event) {
            isDraggingCarousel = true;
            stopTimer();
            startX = getPositionX(event);
            track.style.transition = 'none';
            animationID = requestAnimationFrame(animation);
        }

        function touchMove(event) {
            if (isDraggingCarousel) {
                const currentX = getPositionX(event);
                const diff = currentX - startX;
                currentTranslate = prevTranslate + diff;
            }
        }

        function touchEnd() {
            if (!isDraggingCarousel) return;
            isDraggingCarousel = false;
            cancelAnimationFrame(animationID);

            const movedBy = currentTranslate - prevTranslate;
            const threshold = Math.min(50, carousel.offsetWidth * 0.14);

            if (movedBy < -threshold) {
                current = (current + 1) % dataset.length;
            } else if (movedBy > threshold) {
                current = (current - 1 + dataset.length) % dataset.length;
            }

            setPositionByIndex();
            startTimer();
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        carousel.addEventListener('touchstart', touchStart, { passive: true });
        carousel.addEventListener('touchmove', touchMove, { passive: true });
        carousel.addEventListener('touchend', touchEnd);

        carousel.addEventListener('mousedown', touchStart);
        carousel.addEventListener('mousemove', touchMove);
        carousel.addEventListener('mouseup', touchEnd);
        carousel.addEventListener('mouseleave', () => { if (isDraggingCarousel) touchEnd(); });

        window.addEventListener('resize', () => {
            setPositionByIndex(false);
        });

        setPositionByIndex(false);
        startTimer();
    }

    setupCarousel("slimRibbonTrack", "slimRibbonDots", SLIM_BANNERS);
    setupCarousel("bottomBannerTrack", "bottomBannerDots", BOTTOM_BANNERS);
});

