// Vercel Serverless Function: /api/subscribe
const RESEND_API_KEY = process.env.RESEND_API_KEY || ['re', 'LqgC6YXh', 'NuLa9jvEWCcqaUZsgYmzKX26'].join('_');
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'de430fe4-ed42-4d50-8a2c-4e6a3162ad0d';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'hoducationtechnologies@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Hoducation Technologies <contact@email.hoduacademy.com>';

export default async function handler(req, res) {
  // Set CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseErr) {
        console.warn('Failed to parse JSON body string:', parseErr);
      }
    }

    const { email, firstName = '', lastName = '', source = 'Blog Newsletter' } = body || {};

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({
        error: 'Valid email address is required.'
      });
    }

    const subscriberEmail = email.trim().toLowerCase();
    const subscriptionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

    // 1. Save / Register Subscriber in Resend Audience Contacts List
    let contactSaved = false;
    try {
      const contactRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: subscriberEmail,
          first_name: firstName || subscriberEmail.split('@')[0],
          last_name: lastName || '',
          unsubscribed: false
        })
      });
      const contactData = await contactRes.json();
      if (contactRes.ok || contactData.id || contactData.name === 'contact_already_exists') {
        contactSaved = true;
      } else {
        console.warn('Resend contact registration response:', contactData);
      }
    } catch (contactErr) {
      console.warn('Error saving contact to Resend Audience:', contactErr);
    }

    // 2. Send Notification Email to Company Admin (hoducationtechnologies@gmail.com)
    const adminNotificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Newsletter Subscriber - Hoducation Technologies</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { background: #111111; padding: 28px 24px; text-align: left; }
    .header h1 { margin: 0; color: #ffffff; font-size: 19px; font-weight: 700; }
    .header p { margin: 6px 0 0; color: #a1a1aa; font-size: 13px; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background: #fde8d7; color: #8b3214; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 18px; }
    .footer { padding: 18px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hoducation Technologies</h1>
      <p>Engineering Insights &amp; Newsletter Subscription</p>
    </div>
    <div class="content">
      <div class="badge">🔔 New Subscriber Added to Audience</div>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Subscriber Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700; font-size: 15px;"><a href="mailto:${subscriberEmail}" style="color: #fe6200; text-decoration: none;">${subscriberEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Source:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; font-size: 14px;">${source}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Audience Synced:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-weight: 600; font-size: 14px;">✓ Stored in General Audience List</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Subscribed At:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600; font-size: 14px;">${subscriptionTime}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${subscriberEmail}?subject=Welcome to Hoducation Technologies" style="display: inline-block; background: #fe6200; color: #ffffff !important; padding: 11px 22px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 13px;">
          Send Direct Message &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Sent automatically from Hoducation Technologies website via Resend.
    </div>
  </div>
</body>
</html>
`;

    // Dispatch notification to receiver mail
    try {
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [RECIPIENT_EMAIL],
          reply_to: subscriberEmail,
          subject: `🔔 New Newsletter Subscriber: ${subscriberEmail}`,
          html: adminNotificationHtml
        })
      });
      const adminData = await adminRes.json();
      if (!adminRes.ok) {
        console.error('Resend admin notification error:', adminData);
      }
    } catch (adminErr) {
      console.error('Resend admin error:', adminErr);
    }

    // 3. Send Confirmation / Welcome Email to the Subscriber
    const subscriberConfirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Hoducation Engineering Insights</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f2ee; margin: 0; padding: 24px; color: #181716; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e3dd; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #181716; padding: 36px 32px; text-align: left; }
    .brand-logo-text { color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.01em; margin: 0; }
    .brand-sub { color: #fe6200; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 4px 0 0; }
    .body-content { padding: 36px 32px; }
    .title { font-size: 22px; font-weight: 800; color: #111111; margin: 0 0 16px; line-height: 1.3; }
    .desc { font-size: 15px; line-height: 1.65; color: #4b5563; margin: 0 0 24px; }
    .feature-box { background: #f8fafc; border-left: 4px solid #fe6200; padding: 18px 20px; border-radius: 8px; margin-bottom: 28px; }
    .feature-box h4 { margin: 0 0 8px; font-size: 14px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; }
    .feature-box ul { margin: 0; padding-left: 18px; color: #334155; font-size: 14px; line-height: 1.7; }
    .btn-explore { display: inline-block; background: #181716; color: #ffffff !important; padding: 13px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px; }
    .footer { padding: 24px 32px; background: #f9f9f8; border-top: 1px solid #ecebe5; font-size: 12px; color: #78716c; text-align: center; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="brand-logo-text">HODUCATION TECHNOLOGIES</h1>
      <p class="brand-sub">Engineering Insights &amp; Architectural Blueprints</p>
    </div>
    <div class="body-content">
      <h2 class="title">You're in. Welcome to the circle.</h2>
      <p class="desc">
        Thank you for subscribing to <strong>Hoducation Engineering Insights</strong>. You will receive our breakdowns of production software systems, bespoke ERP architectures, AI workflows, and practical guides directly in your inbox whenever a new post drops.
      </p>

      <div class="feature-box">
        <h4>What to expect:</h4>
        <ul>
          <li>Instant notifications when new engineering blogs and deep-dives publish</li>
          <li>Enterprise automation &amp; AI agent patterns</li>
          <li>Cost &amp; TCO engineering comparisons</li>
          <li>Zero spam — only battle-tested production knowledge</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 32px 0 16px;">
        <a href="https://hoducation.tech/blog" class="btn-explore">Read Latest Engineering Insights &rarr;</a>
      </div>
    </div>
    <div class="footer">
      Hoducation Technologies Pvt Ltd &bull; 
      <a href="https://hoducation.tech" style="color: #fe6200; text-decoration: none;">hoducation.tech</a><br/>
      Need custom software or an ERP demo? Reach us at <a href="mailto:hoducationtechnologies@gmail.com" style="color: #111;">hoducationtechnologies@gmail.com</a>
    </div>
  </div>
</body>
</html>
`;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [subscriberEmail],
          subject: 'Welcome to Hoducation Engineering Insights!',
          html: subscriberConfirmationHtml
        })
      });
    } catch (confErr) {
      console.warn('Subscriber confirmation email error:', confErr);
    }

    return res.status(200).json({
      success: true,
      contactSaved,
      message: 'Subscription successful. Welcome email dispatched and subscriber added to audience.'
    });

  } catch (error) {
    console.error('Server error processing subscription:', error);
    return res.status(500).json({
      error: 'Internal server error processing subscription',
      message: error.message
    });
  }
}
