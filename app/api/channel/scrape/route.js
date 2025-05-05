import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { url } = body;

    if (!url || !url.includes('youtube.com')) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    try {

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        });

        const $ = cheerio.load(data);
        const title = $('title').text().replace(' - YouTube', '').trim();

        return NextResponse.json({ channelName: title }, { status: 200 });

    } catch (err) {
        console.error('Scrape error:', err.message);
        return NextResponse.json({ error: 'Failed to scrape YouTube page' }, { status: 500 });
    }
}
