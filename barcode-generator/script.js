document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const barcodeData = document.getElementById("barcodeData");
    const barcodeType = document.getElementById("barcodeType");
    const outputBox = document.getElementById("outputBox");
    const errorMsg = document.getElementById("errorMsg");
    const downloadBtn = document.getElementById("downloadBtn");
    
    // Barcode Generate Karne Ka Function
    generateBtn.addEventListener("click", () => {
        const textValue = barcodeData.value.trim();
        const formatValue = barcodeType.value;
        
        // Agar input khali hai
        if (!textValue) {
            showError("Please enter some text or numbers!");
            outputBox.style.display = "none";
            return;
        }

        try {
            // JsBarcode Library ko call karna
            JsBarcode("#barcodeCanvas", textValue, {
                format: formatValue,
                lineColor: "#0f172a",
                width: 2,
                height: 80,
                displayValue: true,
                fontSize: 16,
                margin: 10,
                background: "#ffffff"
            });
            
            // Success hone par output dikhana
            errorMsg.style.display = "none";
            outputBox.style.display = "block";
            
        } catch (error) {
            // EAN ya UPC mein galat digits dalne par error
            showError("Invalid data for the selected barcode format. (e.g. EAN-13 requires exactly 12 or 13 numbers).");
            outputBox.style.display = "none";
        }
    });

    // Error message dikhane ka function
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = "block";
    }

    // SVG se PNG banakar Download Karne Ka Function
    downloadBtn.addEventListener("click", () => {
        const svgElement = document.getElementById("barcodeCanvas");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Image Download trigger karna
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `Tveezal-Barcode-${Date.now()}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    });
});
