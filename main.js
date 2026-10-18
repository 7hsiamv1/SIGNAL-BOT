(function() {
    // ====================================================
    // এখানে আপনার লোগোর Direct Image URL বসান
    // ====================================================
    const CUSTOM_LOGO_URL = "https://i.ibb.co.com/CpKQ5qBP/IMG-20261017-192542-718.jpg";

    // আগে থেকে কোনো উইজেট থাকলে সেটি মুছে নতুন আপডেট লোড করবে
    const oldWidget = document.getElementById('floating-trading-bot-widget');
    if (oldWidget) oldWidget.remove();
    const oldOverlay = document.getElementById('tb-scan-overlay');
    if (oldOverlay) oldOverlay.remove();
    const oldStyle = document.getElementById('tb-bot-styles');
    if (oldStyle) oldStyle.remove();

    // ১. CSS স্টাইল
    const style = document.createElement('style');
    style.id = 'tb-bot-styles';
    style.innerHTML = `
        #floating-trading-bot-widget {
            position: fixed;
            top: 22%;
            right: 20px;
            z-index: 9999999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            user-select: none;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* রাউন্ড লোগো বাটন */
        .tb-logo-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: grab;
        }
        .tb-logo-wrapper:active {
            cursor: grabbing;
        }
        .tb-logo-circle {
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background: radial-gradient(circle, #2a0808 0%, #0a0e1a 80%);
            border: 3.5px solid #00ff66;
            box-shadow: 0 0 18px rgba(0, 255, 102, 0.6), inset 0 0 12px rgba(255, 0, 55, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .tb-logo-circle:hover {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(0, 255, 102, 0.9);
        }
        .tb-custom-logo-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }
        .tb-logo-inner-text {
            background: #111;
            border: 1px solid #00c9ff;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 900;
            color: #fff;
            letter-spacing: 0.5px;
            text-align: center;
            line-height: 1.1;
            box-shadow: 0 0 8px rgba(0, 201, 255, 0.5);
        }
        .tb-logo-inner-text span {
            color: #ff2a5f;
            font-size: 8px;
            display: block;
        }
        .tb-badge-close {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #ff2a75;
            color: #fff;
            font-size: 11px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.6);
            cursor: pointer;
            z-index: 2;
        }

        /* নিচের টেক্সট (Rainbow Color Animation) */
        .tb-bot-label {
            margin-top: 5px;
            font-size: 10px;
            font-weight: 900;
            background: linear-gradient(90deg, #ff0040, #ff8000, #ffff00, #00ff55, #00ffff, #bfff00, #ff00cc, #ff0040);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.95));
            animation: tbRainbowMove 2.5s linear infinite;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            white-space: nowrap;
        }
        @keyframes tbRainbowMove {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
        }

        /* ছোট ও কম্প্যাক্ট সিগন্যাল প্যানেল (বাটনের নিচে) */
        .tb-panel {
            display: none;
            position: absolute;
            top: 92px;
            right: 0;
            width: 185px;
            background: #0d1b2a;
            border: 1px solid #00c9ff66;
            border-radius: 10px;
            padding: 10px;
            color: #e0e6f0;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.85), 0 0 15px rgba(0, 201, 255, 0.2);
            animation: tbPopIn 0.2s ease-out;
        }
        @keyframes tbPopIn {
            from { opacity: 0; transform: scale(0.92) translateY(-8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .tb-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #1e3a5f;
            padding-bottom: 6px;
            margin-bottom: 8px;
        }
        .tb-panel-title {
            font-size: 11px;
            font-weight: 800;
            color: #00c9ff;
            letter-spacing: 1px;
            text-shadow: 0 0 10px #00c9ff66;
        }
        .tb-panel-close {
            cursor: pointer;
            color: #7a9abf;
            font-size: 13px;
            font-weight: bold;
        }
        .tb-panel-close:hover {
            color: #e74c3c;
        }

        .tb-time-row {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #7a9abf;
            margin-bottom: 8px;
            background: #111e30;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid #1e3a5f;
        }
        .tb-time-val {
            color: #00c9ff;
            font-weight: 700;
        }

        /* টাইমফ্রেম সিলেক্টর */
        .tb-timeframe-selector {
            width: 100%;
            background: #111e30;
            color: #00c9ff;
            border: 1px solid #1e3a5f;
            border-radius: 6px;
            padding: 6px;
            font-size: 11px;
            margin-bottom: 8px;
            outline: none;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .tb-timeframe-selector option {
            background: #0d1b2a;
            color: #e0e6f0;
        }

        .tb-analyse-btn {
            width: 100%;
            padding: 8px;
            font-size: 10.5px;
            font-weight: 700;
            letter-spacing: 1px;
            background: linear-gradient(135deg, #005b8e, #0099cc);
            color: #fff;
            border: none;
            border-radius: 7px;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.2s;
            box-shadow: 0 3px 10px rgba(0, 201, 255, 0.25);
            margin-bottom: 8px;
        }
        .tb-analyse-btn:hover {
            background: linear-gradient(135deg, #006fa8, #00b8f0);
        }
        .tb-analyse-btn:disabled {
            background: #1e3a5f;
            color: #5a7a9a;
            cursor: not-allowed;
            box-shadow: none;
        }

        /* ছোট সিগন্যাল বক্স (UP / DOWN) */
        .tb-signal-box {
            border-radius: 8px;
            padding: 10px 6px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            border: 1px solid #1e3a5f;
            background: #111e30;
            margin-bottom: 8px;
            transition: all 0.3s;
        }
        .tb-signal-box.up {
            background: #0a2e1a;
            border-color: #27ae60;
            box-shadow: 0 0 18px rgba(39, 174, 96, 0.3);
        }
        .tb-signal-box.down {
            background: #2e0a0a;
            border-color: #e74c3c;
            box-shadow: 0 0 18px rgba(231, 76, 60, 0.3);
        }
        .tb-sig-label {
            font-size: 8.5px;
            letter-spacing: 1px;
            color: #7a9abf;
            text-transform: uppercase;
        }
        .tb-sig-arrow {
            font-size: 28px;
            line-height: 1;
            margin: 2px 0;
            color: #4a6a8a;
        }
        .tb-signal-box.up .tb-sig-arrow {
            color: #2ecc71;
            text-shadow: 0 0 15px rgba(46, 204, 113, 0.6);
        }
        .tb-signal-box.down .tb-sig-arrow {
            color: #e74c3c;
            text-shadow: 0 0 15px rgba(231, 76, 60, 0.6);
        }
        .tb-sig-text {
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #7a9abf;
        }
        .tb-signal-box.up .tb-sig-text { color: #2ecc71; }
        .tb-signal-box.down .tb-sig-text { color: #e74c3c; }
        .tb-sig-sub {
            font-size: 8px;
            color: #5a7a9a;
        }

        /* টাইমার প্রগ্রেস বার */
        .tb-timer-label {
            font-size: 9px;
            letter-spacing: 0.5px;
            color: #7a9abf;
            margin-bottom: 4px;
            text-transform: uppercase;
            display: flex;
            justify-content: space-between;
        }
        .tb-timer-bar-wrap {
            background: #111e30;
            border-radius: 5px;
            height: 5px;
            overflow: hidden;
            border: 1px solid #1e3a5f;
        }
        .tb-timer-bar {
            height: 100%;
            background: linear-gradient(90deg, #005b8e, #00c9ff);
            border-radius: 5px;
            transition: width 1s linear;
        }

        /* ফুল স্ক্রিন স্ক্যানিং অ্যানিমেশন (মাঝখানের লেখা ছাড়া) */
        #tb-scan-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999998;
            display: none;
            overflow: hidden;
            background: rgba(0, 201, 255, 0.03);
        }
        .tb-scan-laser {
            position: absolute;
            left: 0;
            width: 100%;
            height: 120px;
            background: linear-gradient(to bottom, transparent, rgba(0, 255, 170, 0.25), rgba(0, 201, 255, 0.75));
            border-bottom: 3px solid #00ffcc;
            box-shadow: 0 8px 30px rgba(0, 255, 204, 0.8);
            animation: tbLaserMove 1.1s ease-in-out infinite alternate;
        }
        .tb-scan-grid {
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(rgba(0, 201, 255, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 201, 255, 0.08) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        @keyframes tbLaserMove {
            0% { top: -120px; }
            100% { top: 100%; }
        }
    `;
    document.head.appendChild(style);

    // ২. উইজেট এবং স্ক্যানার এলিমেন্ট তৈরি করা
    const widget = document.createElement('div');
    widget.id = 'floating-trading-bot-widget';

    widget.innerHTML = `
        <div class="tb-logo-wrapper" id="tb-logo-trigger">
            <div class="tb-logo-circle">
                <div class="tb-badge-close" id="tb-kill-btn" title="Remove Bot">✖</div>
                <img src="${CUSTOM_LOGO_URL}" class="tb-custom-logo-img" id="tb-logo-img" alt="Logo">
                <div class="tb-logo-inner-text" id="tb-logo-fallback" style="display: none;">
                    CODER
                    <span>SIAM</span>
                </div>
            </div>
            <div class="tb-bot-label">CODER SIAM BOT</div>
        </div>

        <div class="tb-panel" id="tb-main-panel">
            <div class="tb-panel-header">
                <span class="tb-panel-title">⚡ QUOTEX SIGNAL</span>
                <span class="tb-panel-close" id="tb-panel-close">✖</span>
            </div>
            <div class="tb-time-row">
                <span>Time:</span>
                <span class="tb-time-val" id="tb-clock">00:00:00</span>
            </div>
            
            <select class="tb-timeframe-selector" id="tb-timeframe-select">
                <option value="5000">5 Seconds</option>
                <option value="30000">30 Seconds</option>
                <option value="60000" selected>1 Minute</option>
                <option value="300000">5 Minutes</option>
            </select>

            <button class="tb-analyse-btn" id="tb-scan-btn">🔍 ANALYSES CHART</button>
            <div class="tb-signal-box" id="tb-sig-box">
                <div class="tb-sig-label" id="tb-sig-label">1 Minute Signal</div>
                <div class="tb-sig-arrow" id="tb-sig-arrow">●</div>
                <div class="tb-sig-text" id="tb-sig-text">READY</div>
                <div class="tb-sig-sub" id="tb-sig-sub">Click Analyses to Scan</div>
            </div>
            <div class="tb-timer-wrap">
                <div class="tb-timer-label">
                    <span>⏱ Next Signal In</span>
                    <span id="tb-timer-count">00:00</span>
                </div>
                <div class="tb-timer-bar-wrap">
                    <div class="tb-timer-bar" id="tb-timer-bar" style="width: 100%;"></div>
                </div>
            </div>
        </div>
    `;

    const scanOverlay = document.createElement('div');
    scanOverlay.id = 'tb-scan-overlay';
    scanOverlay.innerHTML = `
        <div class="tb-scan-grid"></div>
        <div class="tb-scan-laser"></div>
    `;

    document.body.appendChild(widget);
    document.body.appendChild(scanOverlay);

    // কাস্টম লোগো URL ভুল থাকলে বা লোড না হলে ডিফল্ট টেক্সট লোগো দেখাবে
    const logoImgEl = document.getElementById('tb-logo-img');
    const logoFallbackEl = document.getElementById('tb-logo-fallback');
    if (!CUSTOM_LOGO_URL || CUSTOM_LOGO_URL === "https://your-image-link.com/logo.png") {
        logoImgEl.style.display = 'none';
        logoFallbackEl.style.display = 'block';
    } else {
        logoImgEl.onerror = () => {
            logoImgEl.style.display = 'none';
            logoFallbackEl.style.display = 'block';
        };
    }

    // ৩. এলিমেন্ট রেফারেন্স এবং ভেরিয়েবল
    const panel = document.getElementById('tb-main-panel');
    const logoTrigger = document.getElementById('tb-logo-trigger');
    const panelClose = document.getElementById('tb-panel-close');
    const killBtn = document.getElementById('tb-kill-btn');
    const scanBtn = document.getElementById('tb-scan-btn');
    const clockEl = document.getElementById('tb-clock');
    const sigBox = document.getElementById('tb-sig-box');
    const sigLabel = document.getElementById('tb-sig-label');
    const sigArrow = document.getElementById('tb-sig-arrow');
    const sigText = document.getElementById('tb-sig-text');
    const sigSub = document.getElementById('tb-sig-sub');
    const timerCount = document.getElementById('tb-timer-count');
    const timerBar = document.getElementById('tb-timer-bar');
    const timeframeSelect = document.getElementById('tb-timeframe-select');

    let isPanelOpen = false;
    let isScanning = false;
    let currentSignal = null;
    let lastSignal = null;
    let streakCount = 0;

    // Lock System Variables
    let lockedUntil = 0; 
    let activeTimeframe = 60000; // ডিফল্ট ১ মিনিট (ms)
    let activeTimeframeLabel = '1 Minute';

    // প্রকৃত Random ফাংশন
    function generateTrueRandom() {
        let pick;
        if (window.crypto && window.crypto.getRandomValues) {
            const arr = new Uint32Array(1);
            window.crypto.getRandomValues(arr);
            pick = (arr[0] % 2 === 0) ? 'UP' : 'DOWN';
        } else {
            pick = Math.random() >= 0.5 ? 'UP' : 'DOWN';
        }

        if (pick === lastSignal) {
            streakCount++;
            if (streakCount > 3) {
                pick = (lastSignal === 'UP') ? 'DOWN' : 'UP';
                streakCount = 1;
            }
        } else {
            streakCount = 1;
        }
        lastSignal = pick;
        return pick;
    }

    // সিগন্যাল ডিসপ্লে আপডেট
    function renderSignal(signal, minuteFormatted) {
        const isUp = signal === 'UP';
        sigBox.className = 'tb-signal-box ' + (isUp ? 'up' : 'down');
        sigArrow.textContent = isUp ? '▲' : '▼';
        sigText.textContent = isUp ? 'UP' : 'DOWN';
        sigSub.textContent = `Synced for ${minuteFormatted}`;
    }

    // স্ক্রিন স্ক্যান এবং সিগন্যাল জেনারেট/লক ফাংশন
    function runChartScan() {
        if (isScanning) return;
        isScanning = true;

        const selectedTimeMs = parseInt(timeframeSelect.value);
        const selectedLabel = timeframeSelect.options[timeframeSelect.selectedIndex].text;

        scanOverlay.style.display = 'block';
        scanBtn.disabled = true;
        scanBtn.textContent = '⏳ SCANNING...';
        sigText.textContent = 'SCANNING';
        sigArrow.textContent = '⚡';
        sigBox.className = 'tb-signal-box';

        setTimeout(() => {
            scanOverlay.style.display = 'none';
            isScanning = false;
            scanBtn.disabled = false;
            scanBtn.textContent = '🔍 SCAN AGAIN';

            const nowMs = Date.now();

            // লজিক: যদি নতুন টাইমফ্রেম সিলেক্ট করা হয়, অথবা আগের টাইম শেষ হয়ে যায়, বা প্রথমবার ক্লিক করে
            if (selectedTimeMs !== activeTimeframe || nowMs >= lockedUntil || !currentSignal) {
                currentSignal = generateTrueRandom();
                activeTimeframe = selectedTimeMs;
                activeTimeframeLabel = selectedLabel;
                lockedUntil = nowMs + activeTimeframe; // নতুন সময়ের জন্য সিগন্যাল লক
            } 
            // অন্যথায়: আগের সিগন্যাল এবং টাইমার লকই থাকবে, শুধু ডিসপ্লে আপডেট হবে

            sigLabel.textContent = `${activeTimeframeLabel} Signal`;

            const now = new Date();
            const h = String(now.getHours() % 12 || 12).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            renderSignal(currentSignal, `${h}:${m} ${ampm}`);
        }, 2000); // ২ সেকেন্ড স্ক্যানিং অ্যানিমেশন
    }

    // প্রতি সেকেন্ডে ঘড়ি এবং লক টাইমার প্রগ্রেস আপডেট
    const botInterval = setInterval(() => {
        if (!document.getElementById('floating-trading-bot-widget')) {
            clearInterval(botInterval);
            return;
        }

        const now = new Date();
        const nowMs = now.getTime();
        
        // ঘড়ি আপডেট
        const h = String(now.getHours() % 12 || 12).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        clockEl.textContent = `${h}:${m}:${s} ${ampm}`;

        // লক টাইমার হিসাব
        let remainingMs = lockedUntil - nowMs;
        if (remainingMs < 0) remainingMs = 0;

        const remSecTotal = Math.ceil(remainingMs / 1000);
        const remM = String(Math.floor(remSecTotal / 60)).padStart(2, '0');
        const remS = String(remSecTotal % 60).padStart(2, '0');
        
        timerCount.textContent = `${remM}:${remS}`;
        
        // প্রগ্রেস বার পার্সেন্টেজ
        let pct = 0;
        if (activeTimeframe > 0) {
            pct = (remainingMs / activeTimeframe) * 100;
        }
        timerBar.style.width = `${pct}%`;

        // নির্দিষ্ট লক টাইম শেষ হলে অটোমেটিকভাবে নতুন সিগন্যাল আপডেট হওয়া
        if (currentSignal && nowMs >= lockedUntil && !isScanning) {
            currentSignal = generateTrueRandom();
            lockedUntil = nowMs + activeTimeframe; // পুনরায় একই টাইমফ্রেমের জন্য লক
            
            sigLabel.textContent = `${activeTimeframeLabel} Signal`;
            renderSignal(currentSignal, `${h}:${m} ${ampm}`);
        }
    }, 1000);

    // ৪. ড্র্যাগ (স্থান পরিবর্তন) এবং ক্লিক ইভেন্ট
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, initLeft, initTop;

    function startDrag(e) {
        if (e.target === killBtn) return;
        isDragging = true;
        hasMoved = false;
        const pt = e.type.includes('mouse') ? e : e.touches[0];
        startX = pt.clientX;
        startY = pt.clientY;
        const rect = widget.getBoundingClientRect();
        initLeft = rect.left;
        initTop = rect.top;
    }

    function moveDrag(e) {
        if (!isDragging) return;
        const pt = e.type.includes('mouse') ? e : e.touches[0];
        const dx = pt.clientX - startX;
        const dy = pt.clientY - startY;

        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
            hasMoved = true;
            widget.style.left = `${initLeft + dx}px`;
            widget.style.top = `${initTop + dy}px`;
            widget.style.right = 'auto';
            widget.style.bottom = 'auto';
            if (e.cancelable) e.preventDefault();
        }
    }

    function stopDrag() {
        isDragging = false;
    }

    logoTrigger.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', stopDrag);

    logoTrigger.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('touchend', stopDrag);

    // লোগোতে ক্লিক করলে প্যানেল খুলবে এবং স্ক্যান শুরু করবে
    logoTrigger.addEventListener('click', (e) => {
        if (e.target === killBtn) return;
        if (hasMoved) {
            hasMoved = false;
            return;
        }
        isPanelOpen = !isPanelOpen;
        panel.style.display = isPanelOpen ? 'block' : 'none';
        // প্রথমবার প্যানেল ওপেন হলে স্ক্যান শুরু হবে
        if (isPanelOpen && !currentSignal) {
            runChartScan();
        }
    });

    scanBtn.addEventListener('click', runChartScan);

    panelClose.addEventListener('click', () => {
        isPanelOpen = false;
        panel.style.display = 'none';
    });

    killBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPanelOpen) {
            isPanelOpen = false;
            panel.style.display = 'none';
        } else {
            widget.remove();
            scanOverlay.remove();
        }
    });
})();
