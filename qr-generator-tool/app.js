document.addEventListener("DOMContentLoaded", () => {
    
    // UI Drawer & Navigation Handlers
    const menuBtn = document.getElementById("menuButton");
    const drawer = document.getElementById("navDrawer");
    const overlay = document.getElementById("menuOverlay");
    const drawerClose = document.getElementById("drawerClose");
    
    function openDrawer() { if(drawer) drawer.classList.add("active"); if(overlay) overlay.classList.add("active"); }
    function closeDrawer() { if(drawer) drawer.classList.remove("active"); if(overlay) overlay.classList.remove("active"); }
    
    if(menuBtn) menuBtn.addEventListener("click", openDrawer);
    if(drawerClose) drawerClose.addEventListener("click", closeDrawer);
    if(overlay) overlay.addEventListener("click", closeDrawer);

    const smartBackBtn = document.getElementById("smartBackBtn");
    if (smartBackBtn) {
        smartBackBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "../index.html#category-qr";
        });
    }

    // QR Engine Variables
    const qrText = document.getElementById('qrText');
    const dotColor = document.getElementById('dotColor');
    const dotColorHex = document.getElementById('dotColorHex');
    const bgColor = document.getElementById('bgColor');
    const bgColorHex = document.getElementById('bgColorHex');
    const dotStyle = document.getElementById('dotStyle');
    const cornerStyle = document.getElementById('cornerStyle');
    const logoInput = document.getElementById('logoInput');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const qrCanvasContainer = document.getElementById('qrCanvasContainer');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    let uploadedLogoData = null; // User manual upload
    let autoFetchedLogoData = null; // API fetched from URL
    let typingTimer;

    // Helper Function: Check if string is a valid URL & extract domain
    function extractDomain(str) {
        try {
            let urlObj = new URL(str.trim());
            // Exclude localhost or generic IP if needed, but simple check is enough
            return urlObj.hostname;
        } catch (e) {
            // Check if user just typed "youtube.com" without https
            const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
            if (domainRegex.test(str.trim())) return str.trim();
            return null;
        }
    }

    // Secure Client-Side Image Fetcher via Free Public CORS API (Clearbit)
    async function fetchDomainLogo(domain) {
        try {
            // Using Clearbit Logo API which sends proper CORS headers
            const response = await fetch(`https://logo.clearbit.com/${domain}`);
            if (!response.ok) return null;
            
            const blob = await response.blob();
            // Convert to base64 so Canvas export doesn't throw Tainted error
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            return null;
        }
    }

    // Initialize QR Code Styling Object
    const qrCode = new QRCodeStyling({
        width: 230,
        height: 230,
        type: "canvas",
        data: qrText.value || "https://tveezal.com",
        dotsOptions: {
            color: dotColor.value,
            type: dotStyle.value
        },
        cornersSquareOptions: {
            color: dotColor.value,
            type: cornerStyle.value
        },
        backgroundOptions: {
            color: bgColor.value,
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 8,              // Gives space around the logo
            imageSize: 0.35,        // Appropriate size for original look
            hideBackgroundDots: true // Removes dots behind logo to create a clean Box
        }
    });

    qrCode.append(qrCanvasContainer);

    // Update Function
    function updateQRCode() {
        // Determine which logo to show (Manual upload gets priority over auto-fetched)
        let finalImage = "";
        if (uploadedLogoData) {
            finalImage = uploadedLogoData;
        } else if (autoFetchedLogoData) {
            finalImage = autoFetchedLogoData;
            removeLogoBtn.style.display = 'block';
            removeLogoBtn.textContent = 'Remove Auto Logo';
        }

        const options = {
            data: qrText.value || "https://tveezal.com",
            dotsOptions: {
                color: dotColor.value,
                type: dotStyle.value
            },
            cornersSquareOptions: {
                type: cornerStyle.value
            },
            backgroundOptions: {
                color: bgColor.value
            },
            image: finalImage
        };

        qrCode.update(options);
    }

    // Input Listeners
    qrText.addEventListener('input', (e) => {
        clearTimeout(typingTimer);
        const textVal = e.target.value;
        
        // Instant update QR pattern with text
        updateQRCode();

        // Delay checking URL so we don't spam the API on every single keystroke
        typingTimer = setTimeout(async () => {
            if (!uploadedLogoData) {
                const domain = extractDomain(textVal);
                if (domain) {
                    const fetchedLogo = await fetchDomainLogo(domain);
                    if (fetchedLogo) {
                        autoFetchedLogoData = fetchedLogo;
                        updateQRCode();
                    }
                } else {
                    autoFetchedLogoData = null;
                    if (!uploadedLogoData) removeLogoBtn.style.display = 'none';
                    updateQRCode();
                }
            }
        }, 800);
    });

    dotStyle.addEventListener('change', updateQRCode);
    cornerStyle.addEventListener('change', updateQRCode);

    dotColor.addEventListener('input', (e) => {
        dotColorHex.textContent = e.target.value;
        updateQRCode();
    });

    bgColor.addEventListener('input', (e) => {
        bgColorHex.textContent = e.target.value;
        updateQRCode();
    });

    // Custom Logo File Upload
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
            removeLogoBtn.textContent = 'Remove Logo';
            updateQRCode();
        };
        reader.readAsDataURL(file);
    });

    // Remove Logo Button (Works for both manual and auto)
    removeLogoBtn.addEventListener('click', () => {
        uploadedLogoData = null;
        autoFetchedLogoData = null;
        logoInput.value = "";
        removeLogoBtn.style.display = 'none';
        updateQRCode();
    });

    // Download PNG
    downloadQrBtn.addEventListener('click', () => {
        qrCode.download({ name: "tveezal-custom-qr", extension: "png" });
    });

});
