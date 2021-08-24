import { IAnime, IEpisode } from "./Anime";

export interface IScraper{
    readonly baseUrl: String;
    recentEmitted: () => Promise<IAnime[]>;
    episode: (url: string) => Promise<IEpisode>;
    download?: (url: string) => Promise<string>;
}