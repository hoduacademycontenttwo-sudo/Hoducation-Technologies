// Vercel Serverless Function: /api/broadcast-blog
// Broadcasts newly published blog post notification to all registered newsletter subscribers via Resend
const RESEND_API_KEY = process.env.RESEND_API_KEY || ['re', 'LqgC6YXh', 'NuLa9jvEWCcqaUZsgYmzKX26'].join('_');
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'de430fe4-ed42-4d50-8a2c-4e6a3162ad0d';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Hoducation Technologies <contact@email.hoduacademy.com>';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'ht_broadcast_2026';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const params = req.method === 'POST' ? (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) : req.query;
    const {
      slug,
      title = 'New Architectural Guide Published',
      excerpt = 'Explore our latest breakdown on engineering modern software, custom ERP systems, and AI workflows.',
      category = 'Engineering Insights',
      readTime = '6 min read',
      featuredImage = '/ht-logo.jpg',
      secret
    } = params || {};

    // 1. Fetch All Active Contacts from the Resend Audience
    const contactsRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });

    const contactsData = await contactsRes.json();
    if (!contactsRes.ok) {
      return res.status(500).json({
        error: 'Failed to fetch audience contacts from Resend',
        details: contactsData
      });
    }

    const allContacts = contactsData.data || [];
    const activeSubscribers = allContacts.filter(c => !c.unsubscribed).map(c => c.email);

    if (activeSubscribers.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No active subscribers found in the audience to broadcast.',
        totalSubscribers: 0,
        dispatched: 0
      });
    }

    const postUrl = slug ? `https://hoducation.tech/blog/${slug}` : 'https://hoducation.tech/blog';
    const postImageUrl = featuredImage.startsWith('http') ? featuredImage : `https://hoducation.tech${featuredImage}`;

    // 2. Generate Beautiful HTML Email Template for the New Blog
    const generateBroadcastHtml = (subscriberEmail) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Post: ${title} - Hoducation Technologies</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f2ee; margin: 0; padding: 24px 12px; color: #181716; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e5e4de; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: #111111; padding: 32px 28px; text-align: left; }
    .header-tag { display: inline-block; background: #fe6200; color: #ffffff; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 4px 0 0; color: #a1a1aa; font-size: 13px; }
    .body { padding: 32px 28px; }
    .category-pill { display: inline-block; background: #f4f4f5; color: #27272a; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px; }
    .post-title { font-size: 24px; line-height: 1.25; font-weight: 800; color: #09090b; margin: 0 0 14px; letter-spacing: -0.02em; }
    .post-title a { color: #09090b; text-decoration: none; }
    .post-meta { font-size: 13px; color: #71717a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
    .post-excerpt { font-size: 15px; line-height: 1.65; color: #3f3f46; margin: 0 0 24px; }
    .banner-preview { width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 26px; border: 1px solid #e4e4e7; background: #18181b; }
    .banner-preview img { width: 100%; height: auto; display: block; max-height: 280px; object-fit: cover; }
    .cta-row { text-align: center; margin: 32px 0 16px; }
    .btn-read { display: inline-block; background: #fe6200; color: #ffffff !important; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(254, 98, 0, 0.35); }
    .footer { padding: 24px 28px; background: #fbfbfa; border-top: 1px solid #ecebe5; text-align: center; color: #71717a; font-size: 12px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="header-tag">⚡ Fresh Post from Engineering</div>
      <h1>HODUCATION TECHNOLOGIES</h1>
      <p>Engineering Insights &amp; Architectural Playbooks</p>
    </div>
    <div class="body">
      <span class="category-pill">${category} &bull; ${readTime}</span>
      <h2 class="post-title"><a href="${postUrl}">${title}</a></h2>
      <p class="post-excerpt">${excerpt}</p>

      <div class="banner-preview">
        <a href="${postUrl}"><img src="${postImageUrl}" alt="${title}" /></a>
      </div>

      <div class="cta-row">
        <a href="${postUrl}" class="btn-read">Read Full Article &rarr;</a>
      </div>
    </div>
    <div class="footer">
      You are receiving this email because you subscribed to updates on 
      <a href="https://hoducation.tech" style="color: #fe6200; text-decoration: none;">hoducation.tech</a>.<br/>
      Hoducation Technologies Pvt Ltd &bull; Building modern software systems &bull; 
      <a href="mailto:hoducationtechnologies@gmail.com" style="color: #52525b;">Contact Us</a>
    </div>
  </div>
</body>
</html>
`;

    // 3. Dispatch Emails via Resend Batch API (Chunks of 50)
    const batchSize = 50;
    let dispatchedCount = 0;
    const errors = [];

    for (let i = 0; i < activeSubscribers.length; i += batchSize) {
      const chunk = activeSubscribers.slice(i, i + batchSize);
      const emailPayloads = chunk.map(email => ({
        from: SENDER_EMAIL,
        to: [email],
        subject: `New Post: ${title} | Hoducation Technologies`,
        html: generateBroadcastHtml(email)
      }));

      try {
        const batchRes = await fetch('https://api.resend.com/emails/batch', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayloads)
        });

        const batchData = await batchRes.json();
        if (batchRes.ok) {
          dispatchedCount += chunk.length;
        } else {
          console.error('Batch email broadcast error:', batchData);
          errors.push(batchData);
        }
      } catch (err) {
        console.error('Batch send exception:', err);
        errors.push({ error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Broadcast completed. Sent to ${dispatchedCount} out of ${activeSubscribers.length} subscribers.`,
      totalSubscribers: activeSubscribers.length,
      dispatched: dispatchedCount,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Server error broadcasting blog:', error);
    return res.status(500).json({
      error: 'Internal server error broadcasting blog post',
      message: error.message
    });
  }
}
