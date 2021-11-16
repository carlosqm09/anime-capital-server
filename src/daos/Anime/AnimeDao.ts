import { IAnime, IAnimeDao, IEpisode, IProvider } from '@entities/Anime';
import { TioanimeScraper } from '@daos/Scrapers/tioanime';
import { IScraper } from '@entities/Scraper';
import { JkanimeScrapper } from '@daos/Scrapers/jkanime';
import axios from 'axios';
import { config } from 'dotenv';
const { v4: uuidv4 } = require('uuid');


const providers: { [key: string]: IScraper } = {
    tioanime: new TioanimeScraper(),
    jkanime: new JkanimeScrapper()
}

export class AnimeDao implements IAnimeDao {

    /**
     * 
     */
    public getProviders(): IProvider[] {
        return [
            {
                key: "tioanime",
                icon: "https://tioanime.com/assets/img/logo.png",
                enabled: true
            },
            {
                key: "jkanime",
                icon: "https://cdn.jkanime.net/assets2/css/img/logo.png",
                enabled: false
            },
            {
                key: "monoschinos",
                icon: "https://monoschinos2.com/assets/img/logo.png",
                enabled: false
            },
            {
                key: "animeflv",
                icon: "https://www3.animeflv.net/assets/animeflv/img/logo.png?v=2.3",
                enabled: false
            }
        ]
    }

    /**
     * @param provider
     */
    public async recentEmitted(provider: string): Promise<IAnime[] | undefined> {
        try {
            const recentEmitted = await providers[provider].recentEmitted();
            return recentEmitted;
        } catch (e) {

        }
    }

    /**
     * @param provider
     * @param url
     */
    public async episode(provider: string, url: string): Promise<IEpisode | undefined> {
        try {
            const episode = await providers[provider].episode(url);
            return episode;
        } catch (e) {

        }
    }

    public async getNewSeason(): Promise<any | undefined> {
        try {
            const url = "https://api.jikan.moe/v3/season/later";
            const list = await axios.get(url);
            const res = list.data;
            return res;

        } catch (e) {
            console.log(e);
        }
    }


    /**
 * @param txt
 * @param to
 */
    public async translateData(txt: string, to: string) {
        try {
            const apikey = "c3f68e236d2047b69d65b187e386c093";
            const location = "centralus";
            const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${to}`;
            const list = await axios.post(url, [{
                'text': txt
            }], {
                headers: {
                    "Ocp-Apim-Subscription-Key": apikey,
                    "Ocp-Apim-Subscription-Region": location,
                    "Content-type": "application/json",

                }
            });

            const res = list.data;
            return res;

        } catch (e) {
            throw e;
        }
    }


}
