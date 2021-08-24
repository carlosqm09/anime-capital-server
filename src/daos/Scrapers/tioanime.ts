import { IAnime, IEpisode, IServer } from '@entities/Anime';
import { IScraper } from '@entities/Scraper';

import axios from 'axios';
import * as cheerio from 'cheerio';
import {File} from 'megajs';
import deasync from 'deasync'


export class TioanimeScraper implements IScraper {
    public readonly baseUrl = "https://tioanime.com";

    public async recentEmitted(): Promise<IAnime[]> {
        const doc = await axios.get(this.baseUrl);
        const $ = cheerio.load(doc.data);

        const episodes = $('article.episode').toArray();

        const list: IAnime[] = episodes.map(episode => {
            const $episode = $(episode).find('a');
            const anime: IAnime = {
                name: $episode.find('h3').text()!,
                url: $episode.attr('href')!,
                image: this.baseUrl + $episode.find('div').find('figure').find('img').attr('src')!
            };
            return anime;
        })

        return list;
    }

    public async episode(url: string): Promise<IEpisode> {
        const doc = await axios.get(this.baseUrl + url);
        const $ = cheerio.load(doc.data, { xml: true });

        const title: string = $('h1.anime-title').text();

        const scripts = $('script').map((i, el) => el.children as any);

        const script = scripts[scripts.length - 1].data;

        const links = JSON.parse(script.match(/[^\n\n    $(document).ready(function () {\n        initEpisode();\n    }); var videos = \r].*/g)!
            .join('')
            .slice(0, -1));

        const servers: IServer[] = links.map((server: Array<any>) => ({server: server[0], url: server[1]}));

        const episode: IEpisode = {
            title,
            servers
        };

        return episode;
    }

    public async download(url: string): Promise<string>{
        const doc = await axios.get(this.baseUrl + url);
        const $ = cheerio.load(doc.data, { xml: true });

        const a = $('a.btn.btn-success.btn-download.btn-sm.rounded-pill');

        return a.attr('href')!;
    }
}