const express = require('express');
const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'running', 
        time: new Date().toISOString()
    });
});

// ==================== PAYMENT SUCCESS - GET ====================
app.get('/payment/success', (req, res) => {
    const paymentKey = req.query.paymentkey || req.query.payment_key || req.query.key;
    const reference = req.query.reference || req.query.ref || '';
    const user_id = req.query.user_id || req.query.uid || '';
    const amount = req.query.amount || req.query.amt || '';
    
    // বট রেফারেল লিংক তৈরি
    const botLink = `https://t.me/Paid_LK_bot?start=${reference}`;
    
    console.log('✅ Payment Success (GET):', paymentKey);
    console.log('🔗 Reference:', reference);
    console.log('👤 User:', user_id);
    console.log('💰 Amount:', amount);
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Successful - ৳${amount}</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .container {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 450px;
                width: 90%;
                backdrop-filter: blur(10px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            }
            .checkmark {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                animation: scaleIn 0.5s ease;
            }
            .checkmark svg {
                width: 40px;
                height: 40px;
                animation: drawCheck 0.5s ease 0.3s both;
            }
            .title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #00ff88, #00cc6a);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .amount-display {
                font-size: 42px;
                font-weight: 800;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 15px 0;
            }
            .subtitle {
                color: #aaa;
                margin-bottom: 25px;
                font-size: 14px;
            }
            .info-box {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                text-align: left;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .info-row:last-child { border-bottom: none; }
            .info-label { color: #888; font-size: 13px; }
            .info-value { 
                color: #fff; 
                font-weight: 600; 
                font-size: 13px; 
                word-break: break-all;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .status-badge {
                display: inline-block;
                background: rgba(0,255,136,0.15);
                color: #00ff88;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .claim-btn {
                display: inline-block;
                background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
                color: #000;
                padding: 15px 40px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 700;
                font-size: 18px;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
                animation: pulse 2s infinite;
                position: relative;
                overflow: hidden;
                -webkit-tap-highlight-color: transparent;
            }
            .claim-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(0,255,136,0.3);
            }
            .claim-btn:active {
                transform: scale(0.95);
            }
            .claim-btn::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: shimmer 2s infinite;
            }
            .auto-redirect {
                color: #666;
                margin-top: 20px;
                font-size: 12px;
                animation: fadeIn 0.5s ease 0.5s both;
            }
            .countdown {
                color: #00ff88;
                font-weight: 600;
            }
            .protected-text {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-touch-callout: none;
            }
            .no-copy {
                pointer-events: auto;
                -webkit-touch-callout: none;
            }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            @keyframes drawCheck {
                from { stroke-dashoffset: 50; }
                to { stroke-dashoffset: 0; }
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
                70% { box-shadow: 0 0 0 20px rgba(0,255,136,0); }
                100% { box-shadow: 0 0 0 0 rgba(0,255,136,0); }
            }
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animated { animation: fadeInUp 0.6s ease both; }
            .delay-1 { animation-delay: 0.2s; }
            .delay-2 { animation-delay: 0.4s; }
            .delay-3 { animation-delay: 0.6s; }
        </style>
    </head>
    <body oncontextmenu="return false;" ondragstart="return false;" onselectstart="return false;">
        <div class="container no-copy">
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            
            <div class="status-badge animated">✅ Payment Verified</div>
            <h1 class="title animated delay-1">Payment Successful!</h1>
            
            <div class="amount-display animated delay-1">৳${amount}</div>
            
            <p class="subtitle animated delay-1 protected-text">Amount has been added to your balance</p>
            
            <div class="info-box animated delay-2">
                <div class="info-row">
                    <span class="info-label">🔑 Payment ID</span>
                    <span class="info-value">${paymentKey ? paymentKey.substring(0, 16) + '...' : 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">👤 User ID</span>
                    <span class="info-value">${user_id}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📅 Date</span>
                    <span class="info-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">⏰ Time</span>
                    <span class="info-value">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🌐 Status</span>
                    <span class="info-value" style="color: #00ff88;">✅ Completed</span>
                </div>
            </div>
            
            <a href="${botLink}" class="claim-btn animated delay-3 no-copy" id="claimBtn">
                🎉 CLAIM BALANCE
            </a>
            
            <p class="auto-redirect protected-text">
                Auto redirecting in <span class="countdown" id="countdown">3</span> seconds...
            </p>
        </div>
        
        <script>
            // Right-click disable
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Keyboard shortcuts disable (Ctrl+C, Ctrl+U, etc)
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a')) {
                    e.preventDefault();
                    return false;
                }
                if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                    e.preventDefault();
                    return false;
                }
            });
            
            // Copy disable
            document.addEventListener('copy', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Cut disable
            document.addEventListener('cut', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Claim button click tracking
            document.getElementById('claimBtn').addEventListener('click', function(e) {
                console.log('✅ Claim button clicked - Redirecting to bot');
                // Short vibration feedback for mobile
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            });
            
            // Auto redirect countdown
            let countdown = 3;
            const countdownEl = document.getElementById('countdown');
            const botLink = '${botLink}';
            
            const countdownInterval = setInterval(function() {
                countdown--;
                countdownEl.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    console.log('🔄 Auto redirecting to bot...');
                    window.location.href = botLink;
                }
            }, 1000);
            
            // Touch & hold disable
            document.addEventListener('touchstart', function(e) {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    return true;
                }
            });
            
            // Prevent long press
            let longPressTimer;
            document.addEventListener('touchstart', function(e) {
                longPressTimer = setTimeout(function() {
                    e.preventDefault();
                }, 500);
            });
            
            document.addEventListener('touchend', function() {
                clearTimeout(longPressTimer);
            });
            
            document.addEventListener('touchmove', function() {
                clearTimeout(longPressTimer);
            });
            
            console.log('🔒 Security enabled - Copy & Right-click disabled');
            console.log('⏰ Auto redirect in 3 seconds');
        </script>
    </body>
    </html>
    `);
});

// ==================== PAYMENT SUCCESS - POST ====================
app.post('/payment/success', (req, res) => {
    console.log('✅ Payment Success (POST):', JSON.stringify(req.body, null, 2));
    
    const paymentKey = req.body.paymentkey || req.body.payment_key || req.body.key;
    const metadata = req.body.metadata || {};
    const reference = metadata.reference || req.body.reference || '';
    const user_id = metadata.user_id || req.body.user_id || '';
    const amount = metadata.amount || req.body.amount || '';
    
    const botLink = `https://t.me/FFX_LIKEBD_BOT?start=${reference}`;
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Successful</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                -webkit-user-select: none;
                user-select: none;
            }
            .container {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 450px;
                width: 90%;
                backdrop-filter: blur(10px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            }
            .checkmark {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                animation: scaleIn 0.5s ease;
            }
            .checkmark svg { width: 40px; height: 40px; }
            .amount-display {
                font-size: 42px;
                font-weight: 800;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 15px 0;
            }
            .title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #00ff88, #00cc6a);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .subtitle { color: #aaa; margin-bottom: 25px; font-size: 14px; }
            .status-badge {
                display: inline-block;
                background: rgba(0,255,136,0.15);
                color: #00ff88;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .claim-btn {
                display: inline-block;
                background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
                color: #000;
                padding: 15px 40px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 700;
                font-size: 18px;
                transition: all 0.3s;
                animation: pulse 2s infinite;
            }
            .claim-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 30px rgba(0,255,136,0.3);
            }
            .auto-redirect { color: #666; margin-top: 20px; font-size: 12px; }
            .countdown { color: #00ff88; font-weight: 600; }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
                70% { box-shadow: 0 0 0 20px rgba(0,255,136,0); }
                100% { box-shadow: 0 0 0 0 rgba(0,255,136,0); }
            }
        </style>
    </head>
    <body oncontextmenu="return false;">
        <div class="container">
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="status-badge">✅ Transaction Verified</div>
            <h1 class="title">Payment Successful!</h1>
            <div class="amount-display">৳${amount}</div>
            <p class="subtitle">Your balance has been added</p>
            <a href="${botLink}" class="claim-btn">🎉 CLAIM BALANCE</a>
            <p class="auto-redirect">Auto redirect in <span class="countdown" id="countdown">3</span> seconds...</p>
        </div>
        
        <script>
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('copy', e => e.preventDefault());
            document.addEventListener('cut', e => e.preventDefault());
            
            let countdown = 3;
            const countdownEl = document.getElementById('countdown');
            
            setInterval(() => {
                countdown--;
                if (countdownEl) countdownEl.textContent = countdown;
                if (countdown <= 0) {
                    window.location.href = '${botLink}';
                }
            }, 1000);
        </script>
    </body>
    </html>
    `);
});

// ==================== PAYMENT CANCEL ====================
app.get('/payment/cancel', (req, res) => {
    console.log('❌ Payment Cancelled (GET)');
    
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Cancelled</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                -webkit-user-select: none;
                user-select: none;
            }
            .container {
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                max-width: 450px;
                width: 90%;
                backdrop-filter: blur(10px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            }
            .cancel-icon {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #ff4757, #ff6b81);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                animation: scaleIn 0.5s ease;
            }
            .cancel-icon svg { width: 40px; height: 40px; }
            .title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #ff4757, #ff6b81);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .subtitle { color: #aaa; margin-bottom: 25px; font-size: 14px; }
            .status-badge {
                display: inline-block;
                background: rgba(255,71,87,0.15);
                color: #ff4757;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .bot-btn {
                display: inline-block;
                background: linear-gradient(135deg, #0088cc, #006699);
                color: #fff;
                padding: 12px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s;
            }
            .bot-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0,136,204,0.3);
            }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
        </style>
    </head>
    <body oncontextmenu="return false;">
        <div class="container">
            <div class="cancel-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            <div class="status-badge">❌ Order Cancelled</div>
            <h1 class="title">Payment Cancelled</h1>
            <p class="subtitle">No charges were made. You can try again anytime.</p>
            <a href="https://t.me/FFX_LIKEBD_BOT" class="bot-btn">🤖 Return to Bot</a>
        </div>
    </body>
    </html>
    `);
});

app.post('/payment/cancel', (req, res) => {
    console.log('❌ Payment Cancelled (POST)');
    res.json({ status: 'cancelled' });
});

// Root
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Bot Webhook Server</title>
        <style>
            body { font-family: Arial; text-align: center; padding: 50px; background: #0a0a0a; color: white; }
            .status { color: #00ff88; font-size: 24px; }
        </style>
    </head>
    <body>
        <h1>🤖 Free Fire Like Bot</h1>
        <p class="status">✅ Webhook Server Running</p>
        <p>Time: ${new Date().toLocaleString()}</p>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Webhook running on port ${PORT}`));
