import {IAnime, IAnimeDao, IEpisode, IProvider} from '@entities/Anime';
import {TioanimeScraper} from '@daos/Scrapers/tioanime';
import { IScraper } from '@entities/Scraper';

const providers: {[key: string]: IScraper} = {
    tioanime: new TioanimeScraper()
}

export class AnimeDao implements IAnimeDao{

    /**
     * 
     */
    public getProviders(): IProvider[]{
        return [
            {
                key: "tioanime",
                icon: "https://tioanime.com/assets/img/logo.png"
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
