# Action Plan

- URL: `https://hoducation.tech`
- Overall score: `59/100`

## Priority Fixes

1. **8 orphan page(s) with zero inbound internal links.**
   - Priority: `Critical`
   - Area: `link_profile`
   - Evidence: See audit output.
   - Fix: Add internal links from relevant content pages to these orphan pages.
2. **sameAs URL returns HTTP 429: https://www.linkedin.com/in/rohit-jain-522138177/**
   - Priority: `Warning`
   - Area: `entity`
   - Evidence: See audit output.
   - Fix: Update sameAs URL for LinkedIn to a valid, non-redirecting destination.
3. **1 security headers missing**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: Missing headers reduce trust and can expose the site to browser/security risks.
   - Fix: Set missing security headers at web server or CDN layer.
4. **No llms.txt found**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: AI crawlers and assistants have no curated machine-readable guidance for key pages.
   - Fix: Add `/llms.txt` at site root with concise site description and key URLs.
5. **2 broken links detected**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: Broken internal links hurt crawl flow and user trust.
   - Fix: Repair or remove broken internal links and refresh outdated navigation targets.
6. **Social meta tags are incomplete**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: Missing OG/Twitter tags weakens social previews and share quality.
   - Fix: Update page templates to set complete title/meta/OG/Twitter tags.
7. **Content readability is difficult**
   - Priority: `Warning`
   - Area: `environment`
   - Evidence: Long, complex text can reduce engagement and comprehension.
   - Fix: Rewrite key sections with shorter sentences (15-20 words), shorter paragraphs (2-4 sentences), and clearer subheadings.
8. **2 page(s) with no outbound internal links (dead ends).**
   - Priority: `Warning`
   - Area: `link_profile`
   - Evidence: See audit output.
   - Fix: Add contextual internal links to related content from these pages.
9. **No Wikidata entry found for 'Hoducation Technologies Pvt Ltd'.**
   - Priority: `Info`
   - Area: `Wikidata`
   - Evidence: See audit output.
   - Fix: If the entity meets Wikidata notability guidelines, create or improve an item with accurate third-party references. Do not create one solely for SEO.
10. **No Wikipedia article found for 'Hoducation Technologies Pvt Ltd'.**
   - Priority: `Info`
   - Area: `Wikipedia`
   - Evidence: See audit output.
   - Fix: Only pursue Wikipedia if the entity meets independent notability standards. Otherwise, strengthen official schema, sameAs profiles, citations, and About/Contact signals.
11. **Performance measurement incomplete**
   - Priority: `Info`
   - Area: `environment`
   - Evidence: PageSpeed API returned an error, so CWV recommendations are less reliable.
   - Fix: Set `PAGESPEED_API_KEY` in your environment or `.env` file (see `.env.example`), then rerun. The CLI also accepts `--api-key`. Prioritize LCP/INP/CLS fixes from that output.
12. **Missing sameAs link to Wikipedia (Primary KG signal).**
   - Priority: `Info`
   - Area: `sameAs`
   - Evidence: See audit output.
   - Fix: Add the existing official 'wikipedia.org' URL to sameAs; do not create this profile solely for SEO.
13. **Missing sameAs link to Wikidata (Primary KG signal).**
   - Priority: `Info`
   - Area: `sameAs`
   - Evidence: See audit output.
   - Fix: Add the existing official 'wikidata.org' URL to sameAs; do not create this profile solely for SEO.
14. **Missing sameAs link to Twitter/X (Strong KG signal).**
   - Priority: `Info`
   - Area: `sameAs`
   - Evidence: See audit output.
   - Fix: Add 'x.com' profile URL to sameAs array in your entity schema.
