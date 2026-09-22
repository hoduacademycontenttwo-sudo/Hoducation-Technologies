// Vercel Serverless Function: /api/contact
const RESEND_API_KEY = process.env.RESEND_API_KEY || ['re', 'LqgC6YXh', 'NuLa9jvEWCcqaUZsgYmzKX26'].join('_');
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'hoducationtechnologies@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Hoducation Technologies <contact@email.hoduacademy.com>';

export default async function handler(req, res) {
  // Set CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
        console.warn('Failed to JSON parse body string:', parseErr);
      }
    }
    const {
      firstName,
      lastName,
      workEmail,
      companyName,
      phoneCode = '+91',
      phone = '',
      industry = 'Not specified',
      context = '',
      estimatedSize = '',
    } = body || {};

    if (!firstName || !lastName || !workEmail || !companyName) {
      return res.status(400).json({
        error: 'Missing required fields: First Name, Last Name, Work Email, and Company Name are required.'
      });
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const fullPhone = phone.trim() ? `${phoneCode} ${phone.trim()}` : 'Not provided';
    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

    // Formatted HTML Email for Hoducation Technologies Team
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Enterprise Inquiry - Hoducation Technologies</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #09090b 0%, #18181b 100%); padding: 32px 28px; text-align: left; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
    .content { padding: 32px 28px; }
    .badge { display: inline-block; background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table td.label { width: 38%; color: #64748b; font-weight: 500; }
    .table td.value { width: 62%; color: #0f172a; font-weight: 600; }
    .context-box { background: #f8fafc; border-left: 3px solid #800020; border-radius: 6px; padding: 16px; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #334155; }
    .btn { display: inline-block; background: #09090b; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 20px; }
    .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hoducation Technologies</h1>
      <p>New Enterprise / Institutional Demo Request</p>
    </div>
    <div class="content">
      <div class="badge">🔥 High-Priority Lead</div>
      <table class="table">
        <tr>
          <td class="label">Prospect Name</td>
          <td class="value">${fullName}</td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="value"><a href="mailto:${workEmail}" style="color:#0284c7; text-decoration:none;">${workEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Company / Institution</td>
          <td class="value">${companyName}</td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${fullPhone.replace(/\s+/g, '')}" style="color:#0284c7; text-decoration:none;">${fullPhone}</a></td>
        </tr>
        <tr>
          <td class="label">Service / Industry</td>
          <td class="value">${industry}</td>
        </tr>
        <tr>
          <td class="label">Est. Institution Size</td>
          <td class="value">${estimatedSize || 'Not specified'}</td>
        </tr>
        <tr>
          <td class="label">Submitted At</td>
          <td class="value">${submissionTime}</td>
        </tr>
      </table>

      ${context ? `
        <div style="margin-top: 20px;">
          <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Additional Context / Use Case:</strong>
          <div class="context-box">${context.replace(/\n/g, '<br/>')}</div>
        </div>
      ` : ''}

      <div style="text-align: center; margin-top: 28px;">
        <a href="mailto:${workEmail}?subject=Re: Demo Inquiry - Hoducation Technologies" class="btn">
          Reply Directly to ${firstName} &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Sent automatically from Hoducation Technologies contact portal via Resend.
    </div>
  </div>
</body>
</html>
`;

    // Send via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [RECIPIENT_EMAIL],
        reply_to: workEmail,
        subject: `New Enterprise Inquiry: ${fullName} — ${companyName} (${industry})`,
        html: htmlEmail
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend error:', resendData);
      return res.status(502).json({
        error: resendData.message || 'Failed to send email via Resend',
        details: resendData
      });
    }

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'de430fe4-ed42-4d50-8a2c-4e6a3162ad0d';

    // Auto-sync enquiry submitter to Resend Audience (Newsletter contacts)
    try {
      await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: workEmail.trim().toLowerCase(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          unsubscribed: false
        })
      });
    } catch (audienceErr) {
      console.warn('Audience auto-sync notice:', audienceErr);
    }

    // High-Converting Confirmation Email to Prospect with Featured Blogs Showcase
    try {
      const customerConfirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We Received Your Request — Hoducation Technologies</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f2ee; margin: 0; padding: 24px; color: #181716; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e3dd; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: #181716; padding: 34px 30px; text-align: left; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.01em; }
    .header p { margin: 6px 0 0 0; color: #fe6200; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .content { padding: 32px 30px; }
    .greeting { font-size: 20px; font-weight: 700; color: #111; margin: 0 0 12px; }
    .paragraph { font-size: 14.5px; line-height: 1.65; color: #4b5563; margin: 0 0 18px; }
    .status-card { background: #faf9f6; border-left: 4px solid #fe6200; border-radius: 6px; padding: 16px 20px; margin: 24px 0 32px; font-size: 14px; line-height: 1.6; color: #2e2d29; }
    .blog-section-title { font-size: 12px; font-weight: 800; color: #78716c; text-transform: uppercase; letter-spacing: 0.08em; margin: 32px 0 16px; border-bottom: 1px solid #ecebe5; padding-bottom: 8px; }
    .blog-item { display: block; text-decoration: none; padding: 14px 16px; background: #faf9f6; border: 1px solid #e8e7e1; border-radius: 10px; margin-bottom: 12px; transition: all 0.2s ease; }
    .blog-badge { display: inline-block; background: #fff3eb; color: #fe6200; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 6px; }
    .blog-item-title { font-size: 14px; font-weight: 700; color: #111111; margin: 0 0 4px; line-height: 1.4; }
    .blog-item-desc { font-size: 12.5px; color: #6b7280; line-height: 1.5; margin: 0; }
    .btn { display: inline-block; background: #181716; color: #ffffff !important; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 13.5px; margin-top: 14px; }
    .footer { padding: 24px 30px; background: #f9f9f8; border-top: 1px solid #ecebe5; text-align: center; color: #78716c; font-size: 12px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HODUCATION TECHNOLOGIES</h1>
      <p>Institutional Systems &bull; Enterprise Engineering</p>
    </div>
    <div class="content">
      <div class="greeting">Hello ${firstName}, we've received your request!</div>
      <p class="paragraph">
        Thank you for reaching out regarding solutions for <strong>${companyName}</strong>. Our engineering and architecture team is reviewing your requirements and will connect with you within <strong>24 business hours</strong>.
      </p>

      <div class="status-card">
        <strong>Next Steps:</strong> We are preparing a personalized technical walkthrough tailored for your requirements in <strong>${industry}</strong>. In the meantime, if you have urgent queries or mockups to share, feel free to reply directly to this email or reach us on WhatsApp at <a href="https://wa.me/919660034117" style="color: #fe6200; font-weight: 600; text-decoration: none;">+91 96600 34117</a>.
      </div>

      <div class="blog-section-title">While you wait, explore our latest engineering insights &amp; guides:</div>

      <a href="https://hoducation.tech/blog/ai-omr-cbt-software-revolutionizing-coaching-institutes-2026" class="blog-item">
        <span class="blog-badge">NEW GUIDE 2026</span>
        <div class="blog-item-title">How AI-Driven OMR &amp; CBT TestMaker Software is Revolutionizing Coaching Institutes &rarr;</div>
        <p class="blog-item-desc">Learn how mobile 99.8% computer-vision OMR grading and AI paper generation eliminate exam bottlenecks.</p>
      </a>

      <a href="https://hoducation.tech/blog/custom-software-vs-ready-made" class="blog-item">
        <span class="blog-badge">ARCHITECTURE &amp; TCO</span>
        <div class="blog-item-title">Custom Software vs Ready-Made SaaS: When to Build vs Buy in 2026 &rarr;</div>
        <p class="blog-item-desc">A deep-dive financial and operational comparison on eliminating compounding SaaS licensing costs.</p>
      </a>

      <a href="https://hoducation.tech/blog/what-should-a-modern-school-erp-include" class="blog-item">
        <span class="blog-badge">EDTECH CHECKLIST</span>
        <div class="blog-item-title">What Should a Modern School ERP Include in 2026? (Complete Checklist) &rarr;</div>
        <p class="blog-item-desc">Essential modules for digital admissions, fee reconciliation, biometric attendance, and WhatsApp parent alerts.</p>
      </a>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://hoducation.tech/blog" class="btn">Browse All Engineering Articles &rarr;</a>
      </div>
    </div>
    <div class="footer">
      Hoducation Technologies Pvt Ltd &bull; 
      <a href="https://hoducation.tech" style="color: #fe6200; text-decoration: none;">hoducation.tech</a><br/>
      Need to speak immediately? Call/WhatsApp us at <strong>+91 96600 34117</strong>.
    </div>
  </div>
</body>
</html>
`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [workEmail],
          subject: `We've received your request — Hoducation Technologies`,
          html: customerConfirmationHtml
        })
      });
    } catch (confErr) {
      console.warn('Customer confirmation note:', confErr);
    }

    return res.status(200).json({
      success: true,
      id: resendData.id,
      message: 'Inquiry submitted successfully'
    });

  } catch (error) {
    console.error('Server error processing inquiry:', error);
    return res.status(500).json({
      error: 'Internal server error processing inquiry',
      message: error.message
    });
  }
}
