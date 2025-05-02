import axios from "axios";
import * as cheerio from 'cheerio';


export async function getChannelName(url) {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0', // Pretend to be a browser
            },
        });

        const $ = cheerio.load(data);
        return $('meta[name="title"]').attr('content');
    } catch (err) {
        console.error('Error fetching channel name:', err.message);
        return null;
    }
}