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

// Payment Success Page - GET & POST
app.get('/payment/success', (req, res) => {
    const paymentKey = req.query.paymentkey || req.query.payment_key || req.query.key;
    console.log('✅ Payment Success (GET):', paymentKey);
    console.log('Full Query:', req.query);
    
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
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .info-label {
                color: #888;
                font-size: 13px;
            }
            .info-value {
                color: #fff;
                font-weight: 600;
                font-size: 13px;
                word-break: break-all;
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
            .close-btn {
                display: inline-block;
                background: linear-gradient(135deg, #ff6b35, #ff4500);
                color: #fff;
                padding: 12px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s;
                border: none;
                cursor: pointer;
            }
            .close-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(255,107,53,0.3);
            }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            @keyframes drawCheck {
                from { stroke-dashoffset: 50; }
                to { stroke-dashoffset: 0; }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animated { animation: fadeInUp 0.6s ease both; }
            .delay-1 { animation-delay: 0.2s; }
            .delay-2 { animation-delay: 0.4s; }
            .delay-3 { animation-delay: 0.6s; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            
            <div class="status-badge animated">✅ Transaction Verified</div>
            <h1 class="title animated delay-1">Payment Successful!</h1>
            <p class="subtitle animated delay-1">Your payment has been processed successfully</p>
            
            <div class="info-box animated delay-2">
                <div class="info-row">
                    <span class="info-label">🔑 Payment Key</span>
                    <span class="info-value">${paymentKey || 'N/A'}</span>
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
                    <span class="info-value" style="color: #00ff88;">Completed</span>
                </div>
            </div>
            
            <p class="subtitle animated delay-3" style="font-size: 12px; margin-bottom: 15px;">
                🎉 Your balance will be added automatically within 30 seconds
            </p>
            
            <a href="https://t.me/FFX_LIKEBD_BOT" class="close-btn animated delay-3">Return to Bot</a>
        </div>
    </body>
    </html>
    `);
});

app.post('/payment/success', (req, res) => {
    console.log('✅ Payment Success (POST):', JSON.stringify(req.body, null, 2));
    const paymentKey = req.body.paymentkey || req.body.payment_key || req.body.key;
    
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
            .subtitle { color: #aaa; margin-bottom: 25px; font-size: 14px; }
            .info-box {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                text-align: left;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .info-row:last-child { border-bottom: none; }
            .info-label { color: #888; font-size: 13px; }
            .info-value { color: #fff; font-weight: 600; font-size: 13px; word-break: break-all; }
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
            .close-btn {
                display: inline-block;
                background: linear-gradient(135deg, #ff6b35, #ff4500);
                color: #fff;
                padding: 12px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s;
            }
            .close-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(255,107,53,0.3);
            }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            @keyframes drawCheck {
                from { stroke-dashoffset: 50; }
                to { stroke-dashoffset: 0; }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animated { animation: fadeInUp 0.6s ease both; }
            .delay-1 { animation-delay: 0.2s; }
            .delay-2 { animation-delay: 0.4s; }
            .delay-3 { animation-delay: 0.6s; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="status-badge animated">✅ Transaction Verified</div>
            <h1 class="title animated delay-1">Payment Successful!</h1>
            <p class="subtitle animated delay-1">Your payment has been processed successfully</p>
            <div class="info-box animated delay-2">
                <div class="info-row">
                    <span class="info-label">🔑 Payment Key</span>
                    <span class="info-value">${paymentKey || 'N/A'}</span>
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
                    <span class="info-value" style="color: #00ff88;">Completed</span>
                </div>
            </div>
            <p class="subtitle animated delay-3" style="font-size: 12px; margin-bottom: 15px;">🎉 Your balance will be added automatically within 30 seconds</p>
            <a href="https://t.me/FFX_LIKEBD_BOT" class="close-btn animated delay-3">Return to Bot</a>
        </div>
    </body>
    </html>
    `);
});

// Payment Cancel Page
app.get('/payment/cancel', (req, res) => {
    console.log('❌ Payment Cancelled');
    
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
            .cancel-icon svg {
                width: 40px;
                height: 40px;
            }
            .title {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #ff4757, #ff6b81);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .subtitle { color: #aaa; margin-bottom: 25px; font-size: 14px; }
            .info-box {
                background: rgba(255,255,255,0.05);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
                text-align: left;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255,255,255,0.05);
            }
            .info-row:last-child { border-bottom: none; }
            .info-label { color: #888; font-size: 13px; }
            .info-value { color: #fff; font-weight: 600; font-size: 13px; }
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
            .close-btn {
                display: inline-block;
                background: linear-gradient(135deg, #ff6b35, #ff4500);
                color: #fff;
                padding: 12px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s;
            }
            .close-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(255,107,53,0.3);
            }
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animated { animation: fadeInUp 0.6s ease both; }
            .delay-1 { animation-delay: 0.2s; }
            .delay-2 { animation-delay: 0.4s; }
            .delay-3 { animation-delay: 0.6s; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="cancel-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            
            <div class="status-badge animated">❌ Order Cancelled</div>
            <h1 class="title animated delay-1">Payment Cancelled</h1>
            <p class="subtitle animated delay-1">Your payment has been cancelled. No charges were made.</p>
            
            <div class="info-box animated delay-2">
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
                    <span class="info-value" style="color: #ff4757;">Cancelled</span>
                </div>
            </div>
            
            <p class="subtitle animated delay-3" style="font-size: 12px; margin-bottom: 15px;">💡 You can try again anytime</p>
            
            <a href="https://t.me/FFX_LIKEBD_BOT" class="close-btn animated delay-3">Return to Bot</a>
        </div>
    </body>
    </html>
    `);
});

app.post('/payment/cancel', (req, res) => {
    console.log('❌ Payment Cancelled (POST)');
    res.send('<h1>Payment Cancelled</h1><p>Return to bot to try again.</p>');
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

// ✅ শুধু এই লাইনটা চেঞ্জ করা
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Webhook running on port ${PORT}`));
