import {IAnime, IAnimeDao, IEpisode, IProvider} from '@entities/Anime';
import {TioanimeScraper} from '@daos/Scrapers/tioanime';
import { IScraper } from '@entities/Scraper';
import { JkanimeScrapper } from '@daos/Scrapers/jkanime';

const providers: {[key: string]: IScraper} = {
    tioanime: new TioanimeScraper(),
    jkanime: new JkanimeScrapper()
}

export class AnimeDao implements IAnimeDao{

    /**
     * 
     */
    public getProviders(): IProvider[]{
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
    public async recentEmitted(provider: string): Promise<IAnime[] | undefined>{
        try{
            const recentEmitted = await providers[provider].recentEmitted();
            return recentEmitted;
        }catch(e){

        }
    }

    /**
     * @param provider
     * @param url
     */
    public async episode(provider: string, url: string): Promise<IEpisode | undefined>{
        try{
            const episode = await providers[provider].episode(url);
            return episode;
        }catch(e){
            
        }
    }
}
