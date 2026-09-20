:root {
    --bg: #f8fafc;
    --white: #ffffff;
    --dark: #0f172a;
    --muted: #64748b;
    --line: #e2e8f0;
    --blue: #2563eb;
    --blue-hover: #1d4ed8;
    --green: #059669;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--dark);
    line-height: 1.6;
}

/* Header */
.tool-header {
    background: #ffffff;
    border-bottom: 1px solid var(--line);
    padding: 15px 20px;
    position: sticky;
    top: 0;
}

.header-content {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back-btn {
    text-decoration: none;
    color: var(--muted);
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
}

.back-btn:hover { color: var(--blue); }

.brand-name {
    font-weight: 800;
    font-size: 18px;
    color: var(--dark);
}
.brand-name span { color: var(--blue); }

/* Main Container */
.tool-container {
    max-width: 700px;
    margin: 40px auto;
    padding: 0 20px;
}

.tool-header-text {
    text-align: center;
    margin-bottom: 30px;
}

.tool-header-text h1 {
    font-size: 26px;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
}

.tool-header-text p {
    color: var(--muted);
    font-size: 14px;
}

/* Tool Box */
.tool-box {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--dark);
}

.input-group input, .input-group select {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid var(--line);
    border-radius: 12px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    transition: 0.2s;
    background: #f8fafc;
}

.input-group input:focus, .input-group select:focus {
    border-color: var(--blue);
    background: var(--white);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.primary-btn {
    width: 100%;
    background: var(--blue);
    color: var(--white);
    border: none;
    padding: 14px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.primary-btn:hover { background: var(--blue-hover); transform: translateY(-1px); }

.error-text {
    color: #dc2626;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    margin-top: 12px;
    display: none;
}

/* Output Box */
.output-box {
    margin-top: 25px;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.output-box h3 {
    font-size: 18px;
    margin-bottom: 20px;
}

.barcode-wrapper {
    background: #ffffff;
    border: 1.5px dashed var(--line);
    padding: 20px;
    border-radius: 12px;
    display: inline-block;
    margin-bottom: 20px;
    overflow-x: auto;
    max-width: 100%;
}

.download-btn {
    background: var(--green);
    color: var(--white);
    border: none;
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.download-btn:hover { background: #047857; transform: translateY(-2px); }
