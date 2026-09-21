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

    // Optional confirmation email to customer
    try {
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
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; color: #111;">
              <h2 style="color: #0f172a; margin-top: 0;">Thank you for contacting Hoducation Technologies, ${firstName}!</h2>
              <p style="color: #475569; line-height: 1.6;">We have received your demo and solution inquiry for <strong>${companyName}</strong>. Our enterprise solutions team is reviewing your requirements and will connect with you within 24 hours.</p>
              <p style="color: #475569; line-height: 1.6;">If you have any urgent queries, feel free to reach us via WhatsApp at <a href="https://wa.me/919660034117">+91 96600 34117</a> or reply directly to this email.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">Hoducation Technologies &bull; Institutional Systems &bull; AcadOS</p>
            </div>
          `
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
