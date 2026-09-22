# Full Audit Report

- URL: `https://hoducation.tech`
- Generated: `2026-09-22T13:11:54.907869`
- Overall score: `59/100`
- Score confidence: `Medium`
- Scoring version: `1`

## Score Card

| Category | Weight | Score |
| --- | ---: | ---: |
| Security Headers | 8 | 85 |
| Social Meta | 5 | 38 |
| Robots and Crawlers | 8 | 88 |
| Broken Links | 10 | 67 |
| Internal Links | 8 | 60 |
| Redirects | 3 | 100 |
| AI Search | 5 | 0 |
| Performance and Core Web Vitals | 13 | 0 |
| On-Page SEO | 10 | 100 |
| Readability | 8 | 1 |
| Entity SEO | 5 | 0 |
| Link Profile | 7 | 49 |
| Hreflang | 5 | 0 |
| Content Uniqueness | 5 | 100 |

## Findings

| Severity | Area | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- |
| Critical | broken_links | 🔴 2 broken link(s) found |  |  |
| Critical | link_profile | 8 orphan page(s) with zero inbound internal links. |  | Add internal links from relevant content pages to these orphan pages. |
| Critical | social | 🔴 Missing required: og:image |  |  |
| Warning | entity | sameAs URL returns HTTP 429: https://www.linkedin.com/in/rohit-jain-522138177/ |  | Update sameAs URL for LinkedIn to a valid, non-redirecting destination. |
| Warning | environment | 1 security headers missing | Missing headers reduce trust and can expose the site to browser/security risks. | Set missing security headers at web server or CDN layer. |
| Warning | environment | No llms.txt found | AI crawlers and assistants have no curated machine-readable guidance for key pages. | Add `/llms.txt` at site root with concise site description and key URLs. |
| Warning | environment | 2 broken links detected | Broken internal links hurt crawl flow and user trust. | Repair or remove broken internal links and refresh outdated navigation targets. |
| Warning | environment | Social meta tags are incomplete | Missing OG/Twitter tags weakens social previews and share quality. | Update page templates to set complete title/meta/OG/Twitter tags. |
| Warning | environment | Content readability is difficult | Long, complex text can reduce engagement and comprehension. | Rewrite key sections with shorter sentences (15-20 words), shorter paragraphs (2-4 sentences), and clearer subheadings. |
| Warning | internal_links | ⚠️ 3 potential orphan page(s) (≤1 internal link pointing to them) |  |  |
| Warning | internal_links | ⚠️ 4 page(s) have fewer than 3 internal links |  |  |
| Warning | link_profile | 2 page(s) with no outbound internal links (dead ends). |  | Add contextual internal links to related content from these pages. |
| Warning | readability | ⚠️ Content is difficult to read (Flesch: 0.8) — may reduce engagement |  |  |
| Warning | readability | ⚠️ 33.8% complex words (3+ syllables) — consider simplifying |  |  |
| Warning | readability | ⚠️ Thin content (142 words) — may rank poorly |  |  |
| Warning | robots | ⚠️ 7 AI crawlers not explicitly managed: ChatGPT-User, Applebot-Extended, Bytespider, CCBot, anthropic-ai |  |  |
| Warning | security | ⚠️ 1 security header(s) missing |  |  |
| Warning | social | ⚠️ og:title is too long (64 chars, max 60) |  |  |
| Warning | social | ⚠️ Missing: twitter:card |  |  |
| Info | Wikidata | No Wikidata entry found for 'Hoducation Technologies Pvt Ltd'. |  | If the entity meets Wikidata notability guidelines, create or improve an item with accurate third-party references. Do not create one solely for SEO. |
| Info | Wikipedia | No Wikipedia article found for 'Hoducation Technologies Pvt Ltd'. |  | Only pursue Wikipedia if the entity meets independent notability standards. Otherwise, strengthen official schema, sameAs profiles, citations, and About/Contact signals. |
| Info | environment | Performance measurement incomplete | PageSpeed API returned an error, so CWV recommendations are less reliable. | Set `PAGESPEED_API_KEY` in your environment or `.env` file (see `.env.example`), then rerun. The CLI also accepts `--api-key`. Prioritize LCP/INP/CLS fixes from that output. |
| info | pagespeed | pagespeed measurement incomplete | Rate limited by Google API. Wait a few minutes or add an API key. | Rerun this check after resolving the environment/API/network limitation. |
| Info | sameAs | Missing sameAs link to Wikipedia (Primary KG signal). |  | Add the existing official 'wikipedia.org' URL to sameAs; do not create this profile solely for SEO. |
| Info | sameAs | Missing sameAs link to Wikidata (Primary KG signal). |  | Add the existing official 'wikidata.org' URL to sameAs; do not create this profile solely for SEO. |
| Info | sameAs | Missing sameAs link to Twitter/X (Strong KG signal). |  | Add 'x.com' profile URL to sameAs array in your entity schema. |

## Measurement Notes

1 checks returned errors or incomplete measurements; treat affected scores as directional.
