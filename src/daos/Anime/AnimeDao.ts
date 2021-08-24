import {IAnime, IAnimeDao, IEpisode} from '@entities/Anime';
import {TioanimeScraper} from '@daos/Scrapers/tioanime';

const tioAnime = new TioanimeScraper();

export class AnimeDao implements IAnimeDao{
    /**
     * 
     */
    public async recentEmitted(): Promise<IAnime[] | undefined>{
        try{
            const recentEmitted = await tioAnime.recentEmitted();
            return recentEmitted;
        }catch(e){

        }
    }

    /**
     * @param url
     */
    public async episode(url: string): Promise<IEpisode | undefined>{
        try{
            const episode = await tioAnime.episode(url);
            return episode;
        }catch(e){
            
        }
    }
}
