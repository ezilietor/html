const CHANNEL_ID = 'UChd_dPZeIPZoSDEih7_jCTw'; // @ezilietor
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeEntities(str = '') {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extract(regex, block) {
  const match = block.match(regex);
  return match ? match[1] : null;
}

/**
 * El feed RSS público de YouTube no requiere API key y trae los últimos
 * 15 videos del canal. Lo parseamos con regex simple (sin dependencias)
 * porque la estructura del feed es estable y predecible.
 */
export async function getYoutubeVideos() {
  try {
    const res = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'portafolio-ezequiel-build' },
    });

    if (!res.ok) {
      console.warn(`[youtube] el feed RSS respondió ${res.status}.`);
      return [];
    }

    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    return entries
      .slice(0, 6)
      .map((block) => {
        const videoId = extract(/<yt:videoId>(.*?)<\/yt:videoId>/, block);
        const title =
          extract(/<media:title>([\s\S]*?)<\/media:title>/, block) ||
          extract(/<title>([\s\S]*?)<\/title>/, block);
        const published = extract(/<published>(.*?)<\/published>/, block);
        const thumb = extract(/<media:thumbnail url="(.*?)"/, block);

        if (!videoId || !title) return null;

        return {
          id: videoId,
          title: decodeEntities(title),
          publishedAt: published,
          thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.warn('[youtube] no se pudieron obtener los videos:', err.message);
    return [];
  }
}

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@ezilietor';
