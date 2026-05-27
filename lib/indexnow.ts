/**
 * IndexNow integration — instantly notifies Bing/Yandex (and other participating
 * search engines) when blog content changes. Google does NOT participate in
 * IndexNow as of late 2025; for Google, rely on sitemap + Search Console.
 *
 * Requires INDEXNOW_KEY to be set in env (any 8-128 char hex/alphanumeric string).
 * Generate one with: openssl rand -hex 16
 *
 * The key must also be retrievable at https://<host>/<key>.txt — handled by
 * app/[indexnowKey]/route.ts.
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const HOST = 'speechontheslope.com';

export async function pingIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    // Silently no-op when not configured — the rest of the app still works.
    return;
  }
  if (urls.length === 0) return;

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${key}.txt`,
        urlList: urls,
      }),
    });
    // 200/202 = accepted. 422 = invalid URLs/host. Log non-success but don't throw.
    if (!res.ok && res.status !== 202) {
      console.warn(`IndexNow ping returned ${res.status} for ${urls.length} url(s)`);
    }
  } catch (err) {
    console.warn('IndexNow ping failed:', err);
  }
}
