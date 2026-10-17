(function() {
    // একই উইজেট বারবার তৈরি হওয়া রোধ করা
    if (document.getElementById('floating-trading-bot-widget')) {
        console.log("Bot is already running.");
        return;
    }

    // ১. CSS স্টাইল যুক্ত করা (Dark Theme, Gradient, Animation)
    const style = document.createElement('style');
    style.innerHTML = `
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
            background: linear-gradient(135deg, #1a1a1a, #333);
            border: 2px solid #00ffcc;
            box-shadow: 0 0 15px rgba(0, 255, 204, 0.4);
            color: #00ffcc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 14px;
            cursor: grab;
            transition: transform 0.2s, box-shadow 0.2s;
            text-align: center;
            line-height: 1.2;
        }
        .tb-logo-btn:active {
            cursor: grabbing;
            transform: scale(0.95);
        }
        .tb-panel {
            display: none;
            position: absolute;
            top: 80px;
            right: 0;
            width: 220px;
            background: rgba(20, 20, 22, 0.95);
            border-radius: 12px;
            border: 1px solid #333;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
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
            border-bottom: 1px solid #444;
            padding-bottom: 8px;
            margin-bottom: 12px;
        }
        .tb-title {
            font-size: 12px;
            font-weight: bold;
            color: #aaa;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .tb-close {
            cursor: pointer;
            color: #ff4444;
            font-size: 16px;
            font-weight: bold;
            line-height: 1;
        }
        .tb-time {
            font-size: 14px;
            color: #ddd;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .tb-prediction-box {
            font-size: 32px;
            font-weight: 900;
            padding: 15px 10px;
            border-radius: 8px;
            margin: 10px 0;
            letter-spacing: 2px;
            transition: all 0.3s;
        }
        .tb-up {
            background: rgba(0, 200, 83, 0.15);
            color: #00e676;
            border: 2px solid #00c853;
            text-shadow: 0 0 15px rgba(0, 230, 118, 0.6);
        }
        .tb-down {
            background: rgba(213, 0, 0, 0.15);
            color: #ff1744;
            border: 2px solid #d50000;
            text-shadow: 0 0 15px rgba(255, 23, 68, 0.6);
        }
        .tb-countdown {
            font-size: 12px;
            color: #ffcc00;
            margin-top: 5px;
            font-weight: bold;
        }
        .tb-disclaimer {
            font-size: 10px;
            color: #777;
            margin-top: 15px;
            line-height: 1.4;
            border-top: 1px dashed #444;
            padding-top: 10px;
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
        <div class="tb-prediction-box tb-up" id="tb-prediction">WAIT</div>
        <div class="tb-countdown" id="tb-countdown">Next update: 00s</div>
        <div class="tb-disclaimer">⚠ Random Indicator.<br>এটি কোনো বাস্তব মার্কেট ডেটা নয়।</div>
    `;

    widget.appendChild(logoBtn);
    widget.appendChild(panel);
    document.body.appendChild(widget);

    // ৩. Prediction এবং Time Logic
    let isPanelOpen = false;
    let currentMin = -1;
    let currentPred = "WAIT";

    const timeEl = document.getElementById('tb-time');
    const predEl = document.getElementById('tb-prediction');
    const countEl = document.getElementById('tb-countdown');
    const closeBtn = document.getElementById('tb-close-btn');

    function updateBot() {
        const now = new Date();
        const h = String(now.getHours() % 12 || 12).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

        timeEl.innerText = `${h}:${m}:${s} ${ampm}`;

        const remainingSec = 60 - now.getSeconds();
        countEl.innerText = `Next Update in: ${remainingSec}s`;

        // প্রতি মিনিটে একবার নতুন Random Prediction তৈরি
        if (now.getMinutes() !== currentMin) {
            currentMin = now.getMinutes();
            currentPred = Math.random() > 0.5 ? "UP" : "DOWN";

            predEl.innerText = currentPred;
            if (currentPred === "UP") {
                predEl.className = 'tb-prediction-box tb-up';
            } else {
                predEl.className = 'tb-prediction-box tb-down';
            }
        }
    }

    setInterval(updateBot, 1000);
    updateBot();

    // ৪. Draggable (সরানো) এবং Click Logic (Mobile & Desktop)
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

        // ৫ পিক্সেলের বেশি সরালে সেটিকে Drag হিসেবে গণ্য করবে
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

    // Mouse Events
    logoBtn.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // Touch Events for Mobile
    logoBtn.addEventListener('touchstart', dragStart, {passive: false});
    document.addEventListener('touchmove', drag, {passive: false});
    document.addEventListener('touchend', dragEnd);

    // Toggle Panel
    logoBtn.addEventListener('click', () => {
        if (hasMoved) {
            hasMoved = false; // Drag করার পর প্যানেল খুলবে না
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
