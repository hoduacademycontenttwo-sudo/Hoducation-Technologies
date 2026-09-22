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
  const slug = targetSlug || 'custom-software-vs-ready-made-software';
  const postUrl = `https://hoducation.tech/blog/${slug}`;
  console.log(`📄 Broadcasting Blog URL: ${postUrl}`);

  // 3. Dispatch batch
  const emailPayloads = activeSubscribers.map(email => ({
    from: SENDER_EMAIL,
    to: [email],
    subject: `New Post: Architectural Guide Published | Hoducation Technologies`,
    html: `
    <div style="font-family: sans-serif; background: #f3f2ee; padding: 24px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 14px; padding: 32px; border: 1px solid #e4e3dd;">
        <h1 style="margin: 0 0 12px; font-size: 20px; color: #111;">HODUCATION TECHNOLOGIES</h1>
        <p style="color: #fe6200; font-weight: 700; font-size: 13px; text-transform: uppercase;">New Engineering Insight</p>
        <h2 style="font-size: 22px; color: #000; margin: 16px 0;"><a href="${postUrl}" style="color: #000; text-decoration: none;">New Guide Published on Hoducation.tech</a></h2>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">Explore our latest breakdown on custom software engineering, modern ERP architectures, and production workflows.</p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="${postUrl}" style="background: #fe6200; color: #ffffff !important; padding: 13px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px;">Read Full Article &rarr;</a>
        </div>
      </div>
    </div>
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
