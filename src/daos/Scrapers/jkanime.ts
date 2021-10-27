import { IAnime, IEpisode } from "@entities/Anime";
import { IScraper } from "@entities/Scraper";

import axios from 'axios';
import * as cheerio from 'cheerio';

export class JkanimeScrapper implements IScraper{
    readonly baseUrl = "https://jkanime.net";

    public async recentEmitted(): Promise<IAnime[]>{
        const doc = await axios.get(this.baseUrl);
        const $ = cheerio.load(doc.data);

        const links = $('.listadoanime-home > .maximoaltura > a').toArray();

        const list: IAnime[] = links.map(link => {
            const $link = $(link);

            const anime: IAnime = {
                name: $link.find('div.anime__sidebar__comment__item__text').find('h5') + " " + $link.find('div.anime__sidebar__comment__item__text').find('h6').text().replace('<h5>', '').replace('</h5>', ''),
                image: $link.find('div.anime__sidebar__comment__item__pic').find('img').attr('src')!,
                url: $link.attr('href')?.toString().replace(this.baseUrl, "")!
            };
            return anime;
        });

        return list;
    }

    public async episode(url: string): Promise<IEpisode>{
        let episode: IEpisode = {servers:[], title: ""};

        return episode;
    }
}