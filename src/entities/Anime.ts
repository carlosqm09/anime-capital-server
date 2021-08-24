export interface IAnime{
    name: string;
    url: string;
    image: string;
}

export interface IServer{
    server: string;
    url: string;
}

export interface IEpisode{
    title: string;
    servers: IServer[];
}

export interface IAnimeDao{
    recentEmitted: () => Promise<IAnime[] | undefined>;
    episode: (url: string) => Promise<IEpisode | undefined>;
}