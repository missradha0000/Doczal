document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. UI, DRAWER & SHARE LOGIC 
    // ==========================================
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

    const smartBackBtn = document.getElementById("smartBackBtn");
    const shareToolBtn = document.getElementById("shareToolBtn");
    const footerShareWebsiteBtn = document.getElementById("footerShareWebsiteBtn");
    const drawerShareWebsiteBtn = document.getElementById("drawerShareWebsiteBtn");

    if (smartBackBtn) {
        smartBackBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "../index.html#category-qr";
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

    // FAQs Accordion Logic
    const FAQS = [
        { q: "Is the QR Code Generator free to use?", a: "Yes! All tools on Tveezal Tools are 100% free with no hidden paywalls or registration requirements." },
        { q: "Are my uploaded logos or data secure?", a: "Absolutely. Your logo images and text payloads are processed directly inside your browser memory using the FileReader API and are never uploaded to any remote servers." },
        { q: "Does it auto-detect social media links?", a: "Yes! If you paste a link from Facebook, Instagram, YouTube, WhatsApp, X (Twitter), or LinkedIn, the tool will automatically embed the official logo into your QR Code." },
        { q: "What image formats are supported for the custom center logo?", a: "You can upload standard PNG, JPG, JPEG, or WebP image files." },
        { q: "Will the QR code still scan with a logo in the center?", a: "Yes, the generator reserves a dedicated error-correction margin so smartphone cameras can scan the code seamlessly." },
        { q: "Do I need an internet connection to use this tool?", a: "Once loaded, this tool can run entirely offline directly within your browser sandbox." },
        { q: "Where can I find other utilities?", a: "Explore our <a href='../index.html'>Tveezal Tools Home</a> for PDF tools, image compressors, and text calculators." }
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

    // ==========================================
    // 2. MASTER BANNER DATASETS & CAROUSEL
    // ==========================================
    const SLIM_BANNERS = [
        { image: "../assets/slim-banner-1.webp", link: "../image-compressor.html", title: "Compress Photo to 50KB for Govt Forms" },
        { image: "../assets/slim-banner-2.webp", link: "../pdf-lock.html", title: "Fast Secure PDF Encryption" },
        { image: "../assets/slim-banner-3.webp", link: "../font-changer.html", title: "Create 1000+ Aesthetic Fonts" }
    ];

    const BOTTOM_BANNERS = [
        { image: "../assets/banner-1.webp", link: "../image-compressor.html", title: "Image Compressor to 50KB" },
        { image: "../assets/banner-2.webp", link: "../pdf-merge.html", title: "Merge Multiple PDF Files Online" },
        { image: "../assets/banner-3.webp", link: "../text-to-speech.html", title: "Text to Speech Synthesis" }
    ];

    function setupCarousel(trackId, dotsId, dataset) {
        const track = document.getElementById(trackId);
        const dotsContainer = document.getElementById(dotsId);
        if (!track || !dotsContainer) return;
        const carousel = track.closest('.banner-carousel');
        let current = 0; let timer = null; let isDraggingCarousel = false; let startX = 0; let currentTranslate = 0; let prevTranslate = 0; let animationID = 0;
        track.innerHTML = ""; dotsContainer.innerHTML = "";

        dataset.forEach((b, idx) => {
            const slide = document.createElement("a");
            slide.className = "banner-slide"; slide.href = b.link;
            slide.innerHTML = `<img src="${b.image}" alt="${b.title}" loading="${idx === 0 ? 'eager' : 'lazy'}" onerror="this.parentElement.innerHTML='<div class=\\'banner-fallback\\'><h3>${b.title}</h3><p>Fast Online Utility</p></div>'">`;
            track.appendChild(slide);
            const dot = document.createElement("button");
            dot.className = `banner-dot ${idx === 0 ? 'active' : ''}`; dot.setAttribute("aria-label", `Slide ${idx + 1}`);
            dot.addEventListener("click", () => { current = idx; setPositionByIndex(); restartTimer(); });
            dotsContainer.appendChild(dot);
        });

        function setSliderPosition() { track.style.transform = `translateX(${currentTranslate}px)`; }
        function animation() { setSliderPosition(); if (isDraggingCarousel) requestAnimationFrame(animation); }
        function setPositionByIndex(smooth = true) {
            currentTranslate = -current * carousel.offsetWidth; prevTranslate = currentTranslate;
            track.style.transition = smooth ? 'transform 0.45s cubic-bezier(.22, .61, .36, 1)' : 'none';
            setSliderPosition(); updateDots();
        }
        function updateDots() { dotsContainer.querySelectorAll(".banner-dot").forEach((d, i) => { d.classList.toggle("active", i === current); }); }
        function startTimer() { stopTimer(); timer = setInterval(() => { current = (current + 1) % dataset.length; setPositionByIndex(); }, 4000); }
        function stopTimer() { if (timer) clearInterval(timer); }
        function restartTimer() { stopTimer(); startTimer(); }
        function touchStart(event) { isDraggingCarousel = true; stopTimer(); startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX; track.style.transition = 'none'; animationID = requestAnimationFrame(animation); }
        function touchMove(event) { if (isDraggingCarousel) { const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX; currentTranslate = prevTranslate + (currentX - startX); } }
        function touchEnd() {
            if (!isDraggingCarousel) return;
            isDraggingCarousel = false; cancelAnimationFrame(animationID);
            const movedBy = currentTranslate - prevTranslate; const threshold = Math.min(50, carousel.offsetWidth * 0.14);
            if (movedBy < -threshold) { current = (current + 1) % dataset.length; } else if (movedBy > threshold) { current = (current - 1 + dataset.length) % dataset.length; }
            setPositionByIndex(); startTimer();
        }
        carousel.addEventListener('touchstart', touchStart, { passive: true }); carousel.addEventListener('touchmove', touchMove, { passive: true }); carousel.addEventListener('touchend', touchEnd);
        carousel.addEventListener('mousedown', touchStart); carousel.addEventListener('mousemove', touchMove); carousel.addEventListener('mouseup', touchEnd); carousel.addEventListener('mouseleave', () => { if (isDraggingCarousel) touchEnd(); });
        window.addEventListener('resize', () => { setPositionByIndex(false); });
        setPositionByIndex(false); startTimer();
    }
    setupCarousel("slimRibbonTrack", "slimRibbonDots", SLIM_BANNERS);
    setupCarousel("bottomBannerTrack", "bottomBannerDots", BOTTOM_BANNERS);

    // ==========================================
    // 3. SMART QR ENGINE WITH AUTO-DETECT LOGOS
    // ==========================================
    const qrText = document.getElementById('qrText');
    const dotColor = document.getElementById('dotColor');
    const dotColorHex = document.getElementById('dotColorHex');
    const bgColor = document.getElementById('bgColor');
    const bgColorHex = document.getElementById('bgColorHex');
    const logoInput = document.getElementById('logoInput');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const qrCanvasContainer = document.getElementById('qrCanvasContainer');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    // 100% Offline Base64 SVG Logos for Top Social Media
    const SOCIAL_LOGOS = {
        facebook: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzE4NzdGMiIgZD0iTTI0IDEyLjA3M2MwLTYuNjI3LTUuMzczLTEyLTEyLTEycy0xMiA1LjM3My0xMiAxMmMwIDUuOTkgNC4zODggMTAuOTU0IDEwLjEyNSAxMS44NTR2LTguMzg1SDcuMDc4di0zLjQ2OWgzLjA0N1Y5LjQzYzAtMy4wMDcgMS43OTItNC42NjkgNC41MzMtNC42NjkgMS4zMTIgMCAyLjY4Ni4yMzUgMi42ODYuMjM1djIuOTUzSDE1LjgzYy0xLjQ5MSAwLTEuOTU2LjkyNS0xLjk1NiAxLjg3NHYyLjI1aDMuMzI4bC0uNTMyIDMuNDY5aC0yLjc5NnY4LjM4NUMxOS42MTIgMjMuMDI3IDI0IDE4LjA2MiAyNCAxMi4wNzN6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTE2LjY3MSAxMC43OTFsLjUzMi0zLjQ2OWgtMy4zMjhWNS4wNzFjMC0uOTQ5LjQ2NS0xLjg3NCAxLjk1Ni0xLjg3NGgxLjUzNlYuMjQ0QzE3LjM3LjI0NCAxNi4wMzYgMCAxNC43MjQgMCAxMS45ODMgMCAxMC4xOTEgMS42NjIgMTAuMTkxIDQuNjY5djIuNjUzSDcuMDc4djMuNDY5aDMuMTEzdjguMzg1YTEyLjA5IDEyLjA5IDAgMDAzLjU4NCAwdi04LjM4NWgyLjc5NnoiLz48L3N2Zz4=",
        instagram: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0UxMzA2QyIgZD0iTTEyIDIuMTYzYzMuMjA0IDAgMy41ODQuMDEyIDQuODUuMDcgMy4yNTIuMTQ4IDQuNzcxIDEuNjkxIDQuOTE5IDQuOTE5LjA1OCAxLjI2NS4wNjkgMS42NDUuMDY5IDQuODQ5IDAgMy4yMDUtLjAxMiAzLjU4NC0uMDY5IDQuODQ5LS4xNDkgMy4yMjUtMS42NjQgNC43NzEtNC45MTkgNC45MTktMS4yNjYuMDU4LTEuNjQ0LjA3LTQuODUuMDctMy4yMDQgMC0zLjU4NC0uMDEyLTQuODQ5LS4wNy0zLjI2LS4xNDktNC43NzEtMS42OTktNC45MTktNC45Mi0uMDU4LTEuMjY1LS4wNy0xLjY0NC0uMDctNC44NDkgMC0zLjIwNC4wMTMtMy41ODMuMDctNC44NDkuMTQ5LTMuMjI3IDEuNjY0LTQuNzcxIDQuOTE5LTQuOTE5IDEuMjY2LS4wNTcgMS42NDUtLjA2OSA0Ljg0OS0uMDY5em0wLTIuMTYzYy0zLjI1OSAwLTMuNjY3LjAxNC00Ljk0Ny4wNzItNC4zNTguMi02Ljc4IDIuNjE4LTYuOTggNi45OC0uMDU5IDEuMjgxLS4wNzMgMS42ODktLjA3MyA0Ljk0OCAwIDMuMjU5LjAxNCAzLjY2OC4wNzIgNC45NDguMiA0LjM1OCAyLjYxOCA2Ljc4IDYuOTggNi45OCAxLjI4MS4wNTggMS42ODkuMDcyIDQuOTQ4LjA3MiAzLjI1OSAwIDMuNjY4LS4wMTQgNC45NDgtLjA3MiA0LjM1NC0uMiA2Ljc4Mi0yLjYxOCA2Ljk3OS02Ljk4LjA1OS0xLjI4LjA3My0xLjY4OS4wNzMtNC45NDggMC0zLjI1OS0uMDE0LTMuNjY3LS4wNzItNC45NDctLjE5Ni00LjM1NC0yLjYxNy02Ljc4LTYuOTc5LTYuOTgtMS4yODEtLjA1OS0xLjY5LS4wNzMtNC45NDktLjA3M3ptMCA1LjgzOEE2LjE2MiA2LjE2MiAwIDEwMTguMTYyIDEyIDYuMTYyIDYuMTYyIDAgMDAxMiA1LjgzOHptMCAxMC4xNjJBNDQgMCAxMTE2IDEyYTQgNCAwIDAxLTQgNHptNi40MDYtMTEuODQ1YTEuNDQgMS40NCAwIDEwMC0yLjg4MSAxLjQ0IDEuNDQgMCAwMDAgMi44ODF6Ii8+PC9zdmc+",
        youtube: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGMDAwMCIgZD0iTTIzLjQ5OCA2LjE4NmEzLjAxNiAzLjAxNiAwIDAwLTIuMTIyLTIuMTM2QzE5LjUwNSAzLjU0NSAxMiAzLjU0NSAxMiAzLjU0NXMtNy41MDUgMC05LjM3Ny41MDVBMy4wMTcgMy4wMTcgMCAwMDAuNTAyIDYuMTg2QzAgOC4wNyAwIDEyIDAgMTJzMCAzLjkzLjUwMiA1LjgxNGEzLjAxNiAzLjAxNiAwIDAwMi4xMjIgMi4xMzZjMS44NzEuNTA1IDkuMzc2LjUwNSA5LjM3Ni41MDVzNy41MDUgMCA5LjM3Ny0uNTA1YTMuMDE1IDMuMDE1IDAgMDAyLjEyMi0yLjEzNkMyNCAxNS45MyAyNCAxMiAyNCAxMnMwLTMuOTMtLjUwMi01LjgxNHoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNOS41NDUgMTUuNTY4VjguNDMyTDE1LjgxOCAxMmwtNi4yNzMgMy41Njh6Ii8+PC9zdmc+",
        twitter: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTE4LjkwMSAxLjE1M2gzLjY4bC04LjA0IDkuMTlMMjQgMjIuODQ2aC03LjQwNmwtNS44LTcuNTg0LTYuNjM4IDcuNTg0SC40NzRsOC42LTkuODNMMCAxLjE1NGg3LjU5NGw1LjI0MyA2LjkzMlpNMTcuNjEgMjAuNjQ0aDIuMDM5TDYuNDg2IDMuMjRINC4yOThaIi8+PC9zdmc+",
        whatsapp: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzI1RDM2NiIgZD0iTTE3LjQ3MiAxNC4zODJjLS4yOTctLjE0OS0xLjc1OC0uODY3LTIuMDMtLjk2Ny0uMjczLS4wOTktLjQ3MS0uMTQ4LS42Ny4xNS0uMTk3LjI5Ny0uNzY3Ljk2Ni0uOTQgMS4xNjQtLjE3My4xOTktLjM0Ny4yMjMtLjY0NC4wNzUtLjI5Ny0uMTUtMS4yNTUtLjQ2My0Mi4zOS0xLjQ3NS0uODgzLS43ODgtMS40OC0xLjc2MS0xLjY1My0yLjA1OS0uMTczLS4yOTctLjAxOC0uNDU4LjEzLS42MDYuMTM0LS4xMzMuMjk4LS4zNDcuNDQ2LS41Mi4xNDktLjE3NC4xOTgtLjI5OC4yOTgtLjQ5Ny4wOTktLjE5OC4wNS0uMzcxLS4wMjUtLjUyLS4wNzUtLjE0OS0uNjY5LTEuNjEyLS45MTYtMi4yMDctLjI0Mi0uNTc5LS40ODctLjUtLjY2OS0uNTEtLjE3My0uMDA4LS4zNzEtLjAxLS41Ny0uMDEtLjE5OCAwLS41Mi4wNzQtLjc5Mi4zNzItLjI3Mi4yOTctMS4wNCAxLjAxNi0xLjA0IDIuNDc5IDAgMS40NjIgMS4wNjUgMi44NzUgMS4yMTMgMy4wNzQuMTQ5LjE5OCAyLjA5NiAzLjIgNS4wNzcgNC40ODcuNzA5LjMwNiAxLjI2Mi40ODkgMS42OTQuNjI1LjcxMi4yMjcgMS4zNi4xOTUgMS44NzEuMTE4LjU3MS0uMDg1IDEuNzU4LS43MTkgMi4wMDYtMS40MTMuMjQ4LS42OTQuMjQ4LTEuMjg5LjE3My0xLjQxMy0uMDc0LS4xMjQtLjI3Mi0uMTk4LS41Ny0uMzQ3em0tNS40MjEgNy40MDNoLS4wMDRhOS44NyA5Ljg3IDAgMDEtNS4wMzEtMS4zNzhsLS4zNjEtLjIxNC0zLjc0MS45ODIuOTk4LTMuNjQ4LS4yMzUtLjM3NGE5Ljg2IDkuODYgMCAwMS0xLjUxLTUuMjZjLjAwMS01LjQ1IDQuNDM2LTkuODg0IDkuODg4LTkuODg0IDIuNjQgMCA1LjEyMiAxLjAzIDYuOTg4IDIuODk4YTkuODI1IDkuODI1IDAgMDEyLjg5MyA2Ljk5NGMtLjAwMyA1LjQ1LTQuNDM3IDkuODg0LTkuODg1IDkuODg0bTguNDEzLTE4LjI5N0ExMS44MTUgMTEuODE1IDAgMDAxMi4wNSAwQzUuNDk1IDAgLjE2IDUuMzM1LjE1NyAxMS44OTJjMCAyLjA5Ni41NDcgNC4xNDIgMS41ODggNS45NDVMLjA1NyAyNGw2LjMwNS0xLjY1NGExMS44ODIgMTEuODgyIDAgMDA1LjY4MyAxLjQ0OGguMDA1YzYuNTU0IDAgMTEuODktNS4zMzUgMTEuODkzLTExLjg5M2ExMS44MjEgMTEuODIxIDAgMDAtMy40OC04LjQxM1oiLz48L3N2Zz4=",
        linkedin: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzBBNjZDMiIgZD0iTTIyLjIzMyAwaC0yMC40NjZDOS43OTIgMCAwIC43NjUgMCAxLjcwNnYyMC41ODhDMCAyMy4yMzQuNzkyIDI0IDEuNzY3IDI0aDIwLjQ2NkMyMy4yMDggMjQgMjQgMjMuMjM0IDI0IDIyLjI5NFYxLjcwNkMyNCAuNzY1IDIzLjIwOCAwIDIyLjIzMyAwek03LjEyMyAyMC40NTJINy41NjJWOS4wNDZoMy41NjF2MTEuNDA2ek01LjM0MiA3LjY0NGMtMS4xNCAwLTIuMDY0LS45MjUtMi4wNjQtMi4wNjUgMC0xLjE0LjkyNC0yLjA2NSAyLjA2NC0yLjA2NSAxLjE0IDAgMi4wNjQuOTI1IDIuMDY0IDIuMDY1IDAgMS4xNC0uOTI0IDIuMDY1LTIuMDY0IDIuMDY1em0xNS4xMSAxMi44MDhoLTMuNTY2di01LjUxNGMwLTEuMzE1LS4wMjctMy4wMDctMS44MzEtMy4wMDctMS44MzMgMCAtMi4xMTIgMS40MzItMi4xMTIgMi45MTR2NS42MDdoLTMuNTYzVjkuMDQ2aDMuNDIxdjEuNTYxaC4wNDhjLjQ3Ny0uOTAzIDEuNjQyLTEuODUzIDMuMzc0LTEuODUzIDMuNjA4IDAgNC4yNzMgMi4zNzQgNC4yNzMgNS40NnY2LjIzOHoiLz48L3N2Zz4="
    };

    let uploadedLogoData = null;       // Currently active logo data
    let isAutoLogoActive = false;      // Is the current logo auto-detected?
    let userDisabledAutoLogo = false;  // Did user click "Remove Logo" on an auto-logo?
    let currentAutoDomain = "";        // Keep track of which social platform is active

    // Function to analyze URL and return matching social logo
    function detectSocialLogo(url) {
        if (userDisabledAutoLogo) return null; // If user manually removed it, don't force it again
        
        const lowerUrl = url.toLowerCase();
        if (lowerUrl.includes('instagram.com') || lowerUrl.includes('instagr.am')) return { domain: 'instagram', data: SOCIAL_LOGOS.instagram };
        if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com')) return { domain: 'facebook', data: SOCIAL_LOGOS.facebook };
        if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return { domain: 'youtube', data: SOCIAL_LOGOS.youtube };
        if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return { domain: 'twitter', data: SOCIAL_LOGOS.twitter };
        if (lowerUrl.includes('whatsapp.com') || lowerUrl.includes('wa.me')) return { domain: 'whatsapp', data: SOCIAL_LOGOS.whatsapp };
        if (lowerUrl.includes('linkedin.com')) return { domain: 'linkedin', data: SOCIAL_LOGOS.linkedin };
        return null; // Not a recognized social link
    }

    try {
        // Initialize QRCodeStyling instance
        const qrCode = new QRCodeStyling({
            width: 230,
            height: 230,
            type: "canvas",
            data: qrText.value || "https://tveezal.com",
            dotsOptions: { color: dotColor.value, type: "rounded" },
            backgroundOptions: { color: bgColor.value },
            imageOptions: { crossOrigin: "anonymous", imageSize: 0.4, margin: 5 }
        });

        qrCode.append(qrCanvasContainer);

        // Core UI Update Engine
        function updateQRCode() {
            const options = {
                data: qrText.value || "https://tveezal.com",
                dotsOptions: { color: dotColor.value, type: "rounded" },
                backgroundOptions: { color: bgColor.value }
            };
            
            if (uploadedLogoData) { 
                options.image = uploadedLogoData; 
            } else { 
                options.image = ""; 
            }
            
            qrCode.update(options);
        }

        // Live Text Input Listener (With Smart Detection)
        qrText.addEventListener('input', () => {
            const url = qrText.value;

            // Only run auto-detect if the user HAS NOT uploaded their own custom file
            if (!logoInput.value) {
                const detected = detectSocialLogo(url);

                if (detected) {
                    // Match found! Switch logo if it's new
                    if (currentAutoDomain !== detected.domain) {
                        uploadedLogoData = detected.data;
                        isAutoLogoActive = true;
                        currentAutoDomain = detected.domain;
                        
                        removeLogoBtn.style.display = 'block';
                        removeLogoBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Remove Detected Logo';
                    }
                } else {
                    // Not a social link. If an auto-logo was active, remove it naturally.
                    if (isAutoLogoActive) {
                        uploadedLogoData = null;
                        isAutoLogoActive = false;
                        currentAutoDomain = "";
                        userDisabledAutoLogo = false; // Reset blocker
                        removeLogoBtn.style.display = 'none';
                    }
                }
            } else {
                // User has a custom logo, if they change the URL completely, reset the blocker
                userDisabledAutoLogo = false;
            }

            updateQRCode();
        });

        // Color Pickers
        dotColor.addEventListener('input', (e) => {
            dotColorHex.textContent = e.target.value;
            updateQRCode();
        });

        bgColor.addEventListener('input', (e) => {
            bgColorHex.textContent = e.target.value;
            updateQRCode();
        });

        // Manual User Custom Logo Upload
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file for the logo.');
                return;
            }

            // Override any auto-logo settings
            isAutoLogoActive = false;
            currentAutoDomain = "";
            userDisabledAutoLogo = false;

            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedLogoData = event.target.result;
                removeLogoBtn.style.display = 'block';
                removeLogoBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Remove Logo';
                updateQRCode();
            };
            reader.readAsDataURL(file);
        });

        // Remove Logo Button (Handles both Auto and Custom)
        removeLogoBtn.addEventListener('click', () => {
            uploadedLogoData = null;
            logoInput.value = "";
            removeLogoBtn.style.display = 'none';

            if (isAutoLogoActive) {
                // If user removes an auto-detected logo, block it from reappearing
                userDisabledAutoLogo = true;
                isAutoLogoActive = false;
                currentAutoDomain = "";
            }

            updateQRCode();
        });

        // High-Res PNG Download
        downloadQrBtn.addEventListener('click', () => {
            qrCode.download({ name: "tveezal-qr-code", extension: "png" });
        });

        // Run detection once on page load just in case the default text is a social link
        qrText.dispatchEvent(new Event('input'));

    } catch (err) {
        console.error("QR Code Styling Library failed to initialize. Please check qr-library.js", err);
    }
});
