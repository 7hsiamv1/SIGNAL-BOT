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

    // ১. CSS স্টাইল (প্রোফেশনাল ও প্রিমিয়াম ডিজাইন)
    const style = document.createElement('style');
    style.id = 'tb-bot-styles';
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

        #floating-trading-bot-widget {
            position: fixed;
            top: 22%;
            right: 20px;
            z-index: 9999999;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: #0a0f1a;
            border: 2px solid #00c9ff;
            box-shadow: 0 0 15px rgba(0, 201, 255, 0.4), inset 0 0 10px rgba(0, 201, 255, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tb-logo-circle:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(0, 201, 255, 0.6);
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
            font-weight: 800;
            color: #fff;
            letter-spacing: 0.5px;
            text-align: center;
            line-height: 1.1;
        }
        .tb-logo-inner-text span {
            color: #00c9ff;
            font-size: 8px;
            display: block;
        }
        .tb-badge-close {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #e74c3c;
            color: #fff;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.5);
            cursor: pointer;
            z-index: 2;
            transition: background 0.2s;
        }
        .tb-badge-close:hover {
            background: #c0392b;
        }

        /* নিচের টেক্সট (Premium Gradient) */
        .tb-bot-label {
            margin-top: 8px;
            font-size: 10px;
            font-weight: 800;
            background: linear-gradient(90deg, #00c9ff, #92fe9d);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
            letter-spacing: 1px;
            text-transform: uppercase;
            white-space: nowrap;
        }

        /* ছোট ও কম্প্যাক্ট সিগন্যাল প্যানেল (Glassmorphism Effect) */
        .tb-panel {
            display: none;
            position: absolute;
            top: 92px;
            right: 0;
            width: 190px;
            background: rgba(10, 15, 26, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 201, 255, 0.25);
            border-radius: 12px;
            padding: 12px;
            color: #e0e6f0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 201, 255, 0.1);
            animation: tbPopIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes tbPopIn {
            from { opacity: 0; transform: scale(0.9) translateY(-10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .tb-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 8px;
            margin-bottom: 10px;
        }
        .tb-panel-title {
            font-size: 11px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1px;
        }
        .tb-panel-close {
            cursor: pointer;
            color: #7a9abf;
            font-size: 14px;
            transition: color 0.2s;
        }
        .tb-panel-close:hover {
            color: #e74c3c;
        }

        .tb-time-row {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #a0aec0;
            margin-bottom: 10px;
            background: rgba(0, 0, 0, 0.4);
            padding: 6px 10px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tb-time-val {
            color: #00c9ff;
            font-weight: 600;
        }

        /* টাইমফ্রেম সিলেক্টর */
        .tb-timeframe-selector {
            width: 100%;
            background: rgba(0, 0, 0, 0.4);
            color: #00c9ff;
            border: 1px solid rgba(0, 201, 255, 0.2);
            border-radius: 6px;
            padding: 8px;
            font-size: 11px;
            margin-bottom: 10px;
            outline: none;
            font-weight: 600;
            cursor: pointer;
            transition: border-color 0.2s;
        }
        .tb-timeframe-selector:focus {
            border-color: #00c9ff;
        }
        .tb-timeframe-selector option {
            background: #0a0f1a;
            color: #e0e6f0;
        }

        .tb-analyse-btn {
            width: 100%;
            padding: 10px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1px;
            background: linear-gradient(135deg, #0072ff, #00c6ff);
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
            margin-bottom: 10px;
        }
        .tb-analyse-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0, 201, 255, 0.4);
        }
        .tb-analyse-btn:disabled {
            background: #2c3e50;
            color: #7f8c8d;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        /* ছোট সিগন্যাল বক্স (UP / DOWN) */
        .tb-signal-box {
            border-radius: 8px;
            padding: 12px 6px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            background: rgba(0, 0, 0, 0.3);
            margin-bottom: 10px;
            transition: all 0.3s ease;
        }
        .tb-signal-box.up {
            background: rgba(39, 174, 96, 0.15);
            border-color: rgba(39, 174, 96, 0.4);
            box-shadow: 0 0 20px rgba(39, 174, 96, 0.15);
        }
        .tb-signal-box.down {
            background: rgba(231, 76, 60, 0.15);
            border-color: rgba(231, 76, 60, 0.4);
            box-shadow: 0 0 20px rgba(231, 76, 60, 0.15);
        }
        .tb-sig-label {
            font-size: 8.5px;
            letter-spacing: 1px;
            color: #a0aec0;
            text-transform: uppercase;
        }
        .tb-sig-arrow {
            font-size: 26px;
            line-height: 1;
            margin: 2px 0;
            color: #4a5568;
            transition: color 0.3s, text-shadow 0.3s;
        }
        .tb-signal-box.up .tb-sig-arrow {
            color: #2ecc71;
            text-shadow: 0 0 15px rgba(46, 204, 113, 0.5);
        }
        .tb-signal-box.down .tb-sig-arrow {
            color: #e74c3c;
            text-shadow: 0 0 15px rgba(231, 76, 60, 0.5);
        }
        .tb-sig-text {
            font-size: 15px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #a0aec0;
        }
        .tb-signal-box.up .tb-sig-text { color: #2ecc71; }
        .tb-signal-box.down .tb-sig-text { color: #e74c3c; }
        .tb-sig-sub {
            font-size: 8px;
            color: #718096;
            margin-top: 2px;
        }

        /* টাইমার প্রগ্রেস বার */
        .tb-timer-label {
            font-size: 9px;
            letter-spacing: 0.5px;
            color: #a0aec0;
            margin-bottom: 6px;
            text-transform: uppercase;
            display: flex;
            justify-content: space-between;
            font-weight: 600;
        }
        .tb-timer-bar-wrap {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            height: 6px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tb-timer-bar {
            height: 100%;
            background: linear-gradient(90deg, #0072ff, #00c6ff);
            border-radius: 5px;
            transition: width 0.1s linear;
        }

        /* ফুল স্ক্রিন স্ক্যানিং অ্যানিমেশন */
        #tb-scan-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999998;
            display: none;
            overflow: hidden;
            background: rgba(0, 201, 255, 0.02);
        }
        .tb-scan-laser {
            position: absolute;
            left: 0;
            width: 100%;
            height: 150px;
            background: linear-gradient(to bottom, transparent, rgba(0, 201, 255, 0.1), rgba(0, 201, 255, 0.4));
            border-bottom: 2px solid #00c9ff;
            box-shadow: 0 8px 30px rgba(0, 201, 255, 0.5);
            animation: tbLaserMove 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
        .tb-scan-grid {
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(rgba(0, 201, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 201, 255, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
        }
        @keyframes tbLaserMove {
            0% { top: -150px; }
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
    let activeTimeframe = 60000; 
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

            if (selectedTimeMs !== activeTimeframe || nowMs >= lockedUntil || !currentSignal) {
                currentSignal = generateTrueRandom();
                activeTimeframe = selectedTimeMs;
                activeTimeframeLabel = selectedLabel;
                
                // রিয়েল টাইম ক্যান্ডেল বাউন্ডারির সাথে সিংক করা
                let nextBoundary = Math.ceil(nowMs / activeTimeframe) * activeTimeframe;
                if (nextBoundary - nowMs < 1000) {
                    nextBoundary += activeTimeframe;
                }
                lockedUntil = nextBoundary;
            } 

            sigLabel.textContent = `${activeTimeframeLabel} Signal`;

            const now = new Date();
            const h = String(now.getHours() % 12 || 12).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            renderSignal(currentSignal, `${h}:${m} ${ampm}`);
        }, 2000);
    }

    // প্রতি ১০০ মিলি-সেকেন্ডে ঘড়ি এবং লক টাইমার প্রগ্রেস আপডেট
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
        if (activeTimeframe > 0 && currentSignal) {
            pct = (remainingMs / activeTimeframe) * 100;
        }
        timerBar.style.width = `${pct}%`;

        // নির্দিষ্ট লক টাইম শেষ হলে সিগন্যাল রিসেট করে ইউজারকে ম্যানুয়াল স্ক্যান করতে বলা হচ্ছে
        if (currentSignal && nowMs >= lockedUntil && !isScanning) {
            currentSignal = null; 
            lockedUntil = 0;
            
            sigBox.className = 'tb-signal-box';
            sigLabel.textContent = `${activeTimeframeLabel} Signal`;
            sigArrow.textContent = '●';
            sigText.textContent = 'TIME OVER';
            sigSub.textContent = 'Click Analyses to Scan Again';
            scanBtn.textContent = '🔍 ANALYSES CHART';
        }
    }, 100);

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

    logoTrigger.addEventListener('click', (e) => {
        if (e.target === killBtn) return;
        if (hasMoved) {
            hasMoved = false;
            return;
        }
        isPanelOpen = !isPanelOpen;
        panel.style.display = isPanelOpen ? 'block' : 'none';
        if (isPanelOpen && !currentSignal) {
            // প্যানেল ওপেন হলে আর অটো স্ক্যান করবে না, ইউজারের জন্য অপেক্ষা করবে
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
