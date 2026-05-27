/**
 * Serves the IndexNow key verification file at /<key>.txt.
 *
 * IndexNow checks that https://<host>/<INDEXNOW_KEY>.txt returns the key as
 * plain text — that proves we own the host before honoring our pings. We match
 * the full filename via a dynamic segment and validate the .txt suffix here so
 * we don't shadow other root paths.
 */

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ indexnowKey: string }> }
) {
  const { indexnowKey } = await params;
  const expected = process.env.INDEXNOW_KEY;

  if (!expected) {
    return new Response('Not found', { status: 404 });
  }

  // Must look like "<key>.txt", and the key portion must match.
  if (!indexnowKey.endsWith('.txt')) {
    return new Response('Not found', { status: 404 });
  }
  const requestedKey = indexnowKey.slice(0, -'.txt'.length);
  if (requestedKey !== expected) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(expected, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
