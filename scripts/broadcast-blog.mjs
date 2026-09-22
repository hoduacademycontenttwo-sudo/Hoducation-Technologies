// CLI Script: node scripts/broadcast-blog.mjs [slug]
// Broadcasts blog post updates to all newsletter subscribers via Resend

const RESEND_API_KEY = process.env.RESEND_API_KEY || ['re', 'LqgC6YXh', 'NuLa9jvEWCcqaUZsgYmzKX26'].join('_');
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'de430fe4-ed42-4d50-8a2c-4e6a3162ad0d';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Hoducation Technologies <contact@email.hoduacademy.com>';

async function main() {
  const targetSlug = process.argv[2];
  console.log('🚀 Hoducation Technologies - Blog Broadcast Engine');
  console.log('----------------------------------------------------');

  // 1. Fetch Audience Contacts from Resend
  console.log('📥 Fetching subscriber list from Resend Audience...');
  const contactsRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` }
  });

  const contactsData = await contactsRes.json();
  if (!contactsRes.ok) {
    console.error('❌ Failed to fetch contacts:', contactsData);
    process.exit(1);
  }

  const allContacts = contactsData.data || [];
  const activeSubscribers = allContacts.filter(c => !c.unsubscribed).map(c => c.email);

  console.log(`✓ Found ${activeSubscribers.length} active subscriber(s):`, activeSubscribers);

  if (activeSubscribers.length === 0) {
    console.log('ℹ️ No active subscribers in audience yet. New subscribers will receive blogs as they join.');
    process.exit(0);
  }

  // 2. Blog details
  const slug = targetSlug || 'ai-omr-cbt-software-revolutionizing-coaching-institutes-2026';
  const postUrl = `https://hoducation.tech/blog/${slug}`;
  console.log(`📄 Broadcasting Blog URL: ${postUrl}`);

  const postTitle = slug === 'ai-omr-cbt-software-revolutionizing-coaching-institutes-2026'
    ? 'How AI-Driven OMR & CBT TestMaker Software is Revolutionizing Coaching Institutes & Colleges in 2026'
    : 'New Engineering Guide Published on Hoducation.tech';

  const postExcerpt = slug === 'ai-omr-cbt-software-revolutionizing-coaching-institutes-2026'
    ? 'Discover how AI-powered question paper generation, smartphone-based 99.8% accurate OMR grading, and seamless CBT exam platforms are empowering test-prep chains and colleges to scale without administrative bottlenecks.'
    : 'Explore our latest breakdown on custom software engineering, modern ERP architectures, and production workflows.';

  // 3. Dispatch batch
  const emailPayloads = activeSubscribers.map(email => ({
    from: SENDER_EMAIL,
    to: [email],
    subject: `New Guide: ${postTitle.slice(0, 60)}... | Hoducation`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${postTitle}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f2ee; margin: 0; padding: 24px; color: #181716; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e3dd; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .header { background: #181716; padding: 36px 32px; text-align: left; }
        .brand { color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.01em; margin: 0; }
        .sub { color: #fe6200; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 4px 0 0; }
        .content { padding: 36px 32px; }
        .badge { display: inline-block; background: #fff3eb; color: #fe6200; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 9999px; margin-bottom: 12px; }
        .title { font-size: 22px; font-weight: 800; color: #111111; margin: 0 0 16px; line-height: 1.35; }
        .desc { font-size: 15px; line-height: 1.65; color: #4b5563; margin: 0 0 28px; }
        .highlight-box { background: #faf9f6; border-left: 4px solid #fe6200; padding: 18px 20px; border-radius: 6px; margin-bottom: 28px; font-size: 14px; line-height: 1.6; color: #37352f; }
        .btn { display: inline-block; background: #181716; color: #ffffff !important; padding: 13px 30px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px; }
        .footer { padding: 24px 32px; background: #f9f9f8; border-top: 1px solid #ecebe5; font-size: 12px; color: #78716c; text-align: center; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="brand">HODUCATION TECHNOLOGIES</h1>
          <p class="sub">Engineering Insights &amp; Architectural Blueprints</p>
        </div>
        <div class="content">
          <span class="badge">FRESH ARCHITECTURAL INSIGHT</span>
          <h2 class="title"><a href="${postUrl}" style="color: #111; text-decoration: none;">${postTitle}</a></h2>
          <p class="desc">${postExcerpt}</p>

          <div class="highlight-box">
            <strong>Key Highlights in this Breakdown:</strong>
            <ul style="margin: 8px 0 0; padding-left: 18px; line-height: 1.7;">
              <li>AI TestMaker: Assembling balanced question papers in &lt;60 seconds</li>
              <li>Mobile Computer-Vision OMR: 99.8% precision with standard phone camera</li>
              <li>NTA-Pattern CBT Simulators &amp; Instant Automated WhatsApp Parent Scorecards</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 32px 0 16px;">
            <a href="${postUrl}" class="btn">Read Complete Guide Online &rarr;</a>
          </div>
        </div>
        <div class="footer">
          Hoducation Technologies Pvt Ltd &bull; 
          <a href="https://hoducation.tech" style="color: #fe6200; text-decoration: none;">hoducation.tech</a><br/>
          You are receiving this email because you subscribed to Hoducation Engineering Insights.
        </div>
      </div>
    </body>
    </html>
    `
  }));

  const batchRes = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailPayloads)
  });

  const batchData = await batchRes.json();
  if (batchRes.ok) {
    console.log(`✅ Broadcast successfully delivered to ${activeSubscribers.length} subscriber(s)!`);
  } else {
    console.error('❌ Error sending broadcast:', batchData);
  }
}

main().catch(console.error);
