/**
 * IndexNow Submission Script
 * Submits URLs to Bing, Yandex, and other search engines using the IndexNow protocol.
 * 
 * Usage:
 *   node scripts/submit-indexnow.mjs                  # Submits all URLs from sitemap.xml
 *   node scripts/submit-indexnow.mjs <url1> <url2>   # Submits specific updated/new URLs
 */

const HOST = 'vnhax.net';
const KEY = 'fbd3858267f07d306ac018da59edad99';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getUrls() {
  const customUrls = process.argv.slice(2).filter((u) => u.startsWith('http'));
  if (customUrls.length > 0) {
    return customUrls;
  }

  console.log(`[IndexNow] Fetching sitemap from ${SITEMAP_URL}...`);
  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`);
    }
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return urls;
  } catch (err) {
    console.error(`[IndexNow] Error fetching sitemap:`, err.message);
    return [`https://${HOST}/`];
  }
}

async function submitIndexNow() {
  console.log('================================================================');
  console.log('              INDEXNOW SEARCH ENGINE SUBMISSION');
  console.log('================================================================\n');

  const urlList = await getUrls();
  console.log(`[IndexNow] Preparing to submit ${urlList.length} URLs to IndexNow...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    console.log(`[IndexNow] Sending request to ${INDEXNOW_ENDPOINT}...`);
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = res.status;
    console.log(`[IndexNow] HTTP Response Status: ${status}`);

    if (status === 200) {
      console.log('✅ [200 OK] URLs submitted successfully!');
    } else if (status === 202) {
      console.log('✅ [202 Accepted] URLs received and accepted. Key verification in progress.');
    } else if (status === 400) {
      console.error('❌ [400 Bad Request] Invalid format or payload.');
    } else if (status === 403) {
      console.error('❌ [403 Forbidden] Key not valid or key file not found on server.');
    } else if (status === 422) {
      console.error('❌ [422 Unprocessable] URLs do not belong to the host.');
    } else if (status === 429) {
      console.error('❌ [429 Too Many Requests] Rate limited.');
    } else {
      const text = await res.text();
      console.log(`[IndexNow] Response body:`, text);
    }
  } catch (err) {
    console.error('[IndexNow] Submission network error:', err);
  }

  console.log('\n================================================================');
  console.log('IndexNow protocol distributes submissions to Bing, Yandex, etc.');
  console.log('================================================================');
}

submitIndexNow();
