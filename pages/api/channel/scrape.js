import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.body;

    if (!url || !url.includes('youtube.com')) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        });

        const $ = cheerio.load(data);
        const title = $('title').text().replace(' - YouTube', '').trim();

        // Find ytInitialData
        const script = $('script').toArray().find(el => {
            const html = $(el).html();
            return html && html.includes('var ytInitialData =');
        });

        if (!script) {
            return res.status(404).json({ error: 'ytInitialData not found' });
        }

        const scriptContent = $(script).html();
        const jsonText = scriptContent
                .match(/var ytInitialData = ({.*});<\/script>/s)?.[1] ||
            scriptContent.replace('var ytInitialData = ', '').replace(/;$/, '');

        const ytInitialData = JSON.parse(jsonText);

        // Attempt to drill into channel icon
        const iconUrl =
            ytInitialData?.header?.c4TabbedHeaderRenderer?.avatar?.thumbnails?.pop()?.url ||
            null;
        console.log(iconUrl)
        if (!iconUrl) {
            return res.status(200).json({ channelName: title, channelIcon: null });
        }

        return res.status(200).json({ channelName: title, channelIcon: iconUrl });
    } catch (err) {
        console.error('Scrape error:', err.message);
        return res.status(500).json({ error: 'Failed to scrape YouTube page' });
    }
}
