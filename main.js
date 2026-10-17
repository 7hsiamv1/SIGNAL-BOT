(function() {
    // একই উইজেট বারবার তৈরি হওয়া রোধ করা
    if (document.getElementById('floating-trading-bot-widget')) {
        console.log("Bot is already running.");
        return;
    }

    // ১. CSS স্টাইল যুক্ত করা (Dark Theme, Gradient, Scanner Animation)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Widget & Button Styles */
        #floating-trading-bot-widget {
            position: fixed;
            top: 20%;
            right: 20px;
            z-index: 9999999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            user-select: none;
        }
        .tb-logo-btn {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0d1b2a, #1a2744);
            border: 2px solid #00c9ff;
            box-shadow: 0 0 15px rgba(0, 201, 255, 0.4);
            color: #00c9ff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 13px;
            cursor: grab;
            transition: transform 0.2s, box-shadow 0.2s;
            text-align: center;
            line-height: 1.2;
        }
        .tb-logo-btn:active {
            cursor: grabbing;
            transform: scale(0.95);
        }
        
        /* Panel Styles */
        .tb-panel {
            display: none;
            position: absolute;
            top: 80px;
            right: 0;
            width: 240px;
            background: rgba(13, 27, 42, 0.95);
            border-radius: 12px;
            border: 1px solid #1e3a5f;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
            padding: 15px;
            color: white;
            text-align: center;
            backdrop-filter: blur(10px);
            animation: tbFadeIn 0.3s ease-out;
        }
        @keyframes tbFadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .tb-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #1e3a5f;
            padding-bottom: 8px;
            margin-bottom: 12px;
        }
        .tb-title {
            font-size: 13px;
            font-weight: bold;
            color: #00c9ff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .tb-close {
            cursor: pointer;
            color: #e74c3c;
            font-size: 16px;
            font-weight: bold;
        }
        .tb-time {
            font-size: 14px;
            color: #ddd;
            margin-bottom: 10px;
            font-weight: bold;
        }
        
        /* Prediction Box */
        .tb-prediction-box {
            font-size: 28px;
            font-weight: 900;
            padding: 15px 10px;
            border-radius: 8px;
            margin: 10px 0;
            letter-spacing: 2px;
            transition: all 0.3s;
            border: 2px dashed #4a6a8a;
            color: #7a9abf;
            background: #111e30;
        }
        .tb-up {
            background: rgba(46, 204, 113, 0.15);
            color: #2ecc71;
            border: 2px solid #2ecc71;
            text-shadow: 0 0 15px rgba(46, 204, 113, 0.6);
        }
        .tb-down {
            background: rgba(231, 76, 60, 0.15);
            color: #e74c3c;
            border: 2px solid #e74c3c;
            text-shadow: 0 0 15px rgba(231, 76, 60, 0.6);
        }
        
        /* Analyze Button */
        .tb-analyze-btn {
            width: 100%;
            padding: 12px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 1px;
            background: linear-gradient(135deg, #005b8e, #0099cc);
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.2s;
            margin-bottom: 10px;
            box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
        }
        .tb-analyze-btn:hover {
            background: linear-gradient(135deg, #006fa8, #00b8f0);
        }
        .tb-analyze-btn:disabled {
            background: #1e3a5f;
            color: #4a6a8a;
            cursor: not-allowed;
            box-shadow: none;
        }

        /* Scanner Animation Overlay (Full Screen) */
        .tb-scan-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            pointer-events: none; /* যাতে পেজে ক্লিক করা যায় */
            z-index: 9999998;
            display: none;
            overflow: hidden;
        }
        .tb-scan-line {
            position: absolute;
            width: 100%;
            height: 150px;
            background: linear-gradient(to bottom, rgba(0,201,255,0) 0%, rgba(0,201,255,0.1) 80%, rgba(0,201,255,0.6) 100%);
            border-bottom: 3px solid #00c9ff;
            box-shadow: 0 5px 20px rgba(0, 201, 255, 0.7);
            animation: scanSweep 1.5s ease-in-out infinite alternate;
        }
        @keyframes scanSweep {
            0% { top: -150px; }
            100% { top: 100%; }
        }
    `;
    document.head.appendChild(style);

    // ২. HTML এলিমেন্ট তৈরি করা
    const widget = document.createElement('div');
    widget.id = 'floating-trading-bot-widget';

    const logoBtn = document.createElement('div');
    logoBtn.className = 'tb-logo-btn';
    logoBtn.innerHTML = 'AUTO<br>BOT';

    const panel = document.createElement('div');
    panel.className = 'tb-panel';

    panel.innerHTML = `
        <div class="tb-header">
            <span class="tb-title">Scanner Bot</span>
            <span class="tb-close" id="tb-close-btn">✖</span>
        </div>
        <div class="tb-time" id="tb-time">00:00:00</div>
        
        <button class="tb-analyze-btn" id="tb-analyze-btn">🔍 Analyze Market</button>
        
        <div class="tb-prediction-box" id="tb-prediction">WAIT</div>
    `;

    // ফুল স্ক্রিন স্ক্যানার ওভারলে
    const scanOverlay = document.createElement('div');
    scanOverlay.className = 'tb-scan-overlay';
    scanOverlay.id = 'tb-scan-overlay';
    scanOverlay.innerHTML = `<div class="tb-scan-line"></div>`;

    widget.appendChild(logoBtn);
    widget.appendChild(panel);
    document.body.appendChild(widget);
    document.body.appendChild(scanOverlay);

    // ৩. Logic এবং Variables
    let isPanelOpen = false;
    let isScanning = false;
    let cachedPrediction = null;
    let lastScanMinute = -1;

    const timeEl = document.getElementById('tb-time');
    const predEl = document.getElementById('tb-prediction');
    const analyzeBtn = document.getElementById('tb-analyze-btn');
    const closeBtn = document.getElementById('tb-close-btn');
    const overlay = document.getElementById('tb-scan-overlay');

    // ঘড়ি আপডেট করা
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours() % 12 || 12).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        timeEl.innerText = `${h}:${m}:${s} ${ampm}`;
        
        // নতুন মিনিট শুরু হলে Prediction রিসেট করা
        if (now.getMinutes() !== lastScanMinute && !isScanning && cachedPrediction) {
            predEl.innerText = "WAIT";
            predEl.className = 'tb-prediction-box';
            cachedPrediction = null;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // স্ক্যানিং এবং সিগন্যাল তৈরি লজিক
    analyzeBtn.addEventListener('click', () => {
        const now = new Date();
        const currentMinute = now.getMinutes();

        // স্ক্যান অ্যানিমেশন শুরু
        isScanning = true;
        analyzeBtn.disabled = true;
        analyzeBtn.innerText = "⏳ SCANNING...";
        overlay.style.display = 'block';
        
        predEl.innerText = "---";
        predEl.className = 'tb-prediction-box';

        setTimeout(() => {
            // অ্যানিমেশন শেষ
            isScanning = false;
            overlay.style.display = 'none';
            analyzeBtn.disabled = false;
            analyzeBtn.innerText = "🔍 ANALYZE AGAIN";

            // যদি একই মিনিটে আগে স্ক্যান করা থাকে, তবে আগেরটাই দেখাবে
            if (currentMinute === lastScanMinute && cachedPrediction) {
                applyPrediction(cachedPrediction);
            } else {
                // নতুন সিগন্যাল (Random UP/DOWN)
                lastScanMinute = currentMinute;
                cachedPrediction = Math.random() > 0.5 ? "UP" : "DOWN";
                applyPrediction(cachedPrediction);
            }
        }, 3000); // ৩ সেকেন্ড স্ক্যানিং চলবে
    });

    function applyPrediction(signal) {
        predEl.innerText = signal + (signal === "UP" ? " ▲" : " ▼");
        if (signal === "UP") {
            predEl.className = 'tb-prediction-box tb-up';
        } else {
            predEl.className = 'tb-prediction-box tb-down';
        }
    }

    // ৪. Draggable (সরানো) লজিক
    let hasMoved = false;
    let isMouseDown = false;
    let startX, startY, initialX, initialY;

    function dragStart(e) {
        isMouseDown = true;
        hasMoved = false;
        const event = e.type.includes('mouse') ? e : e.touches[0];
        startX = event.clientX;
        startY = event.clientY;
        initialX = widget.offsetLeft;
        initialY = widget.offsetTop;
    }

    function drag(e) {
        if (!isMouseDown) return;
        const event = e.type.includes('mouse') ? e : e.touches[0];
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasMoved = true;
            widget.style.left = `${initialX + dx}px`;
            widget.style.top = `${initialY + dy}px`;
            widget.style.right = 'auto'; 
            if(e.type === 'touchmove') e.preventDefault();
        }
    }

    function dragEnd() {
        isMouseDown = false;
    }

    logoBtn.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    logoBtn.addEventListener('touchstart', dragStart, {passive: false});
    document.addEventListener('touchmove', drag, {passive: false});
    document.addEventListener('touchend', dragEnd);

    // প্যানেল খোলা এবং বন্ধ করা
    logoBtn.addEventListener('click', () => {
        if (hasMoved) {
            hasMoved = false; 
            return;
        }
        isPanelOpen = !isPanelOpen;
        panel.style.display = isPanelOpen ? 'block' : 'none';
    });

    closeBtn.addEventListener('click', () => {
        isPanelOpen = false;
        panel.style.display = 'none';
    });

})();
