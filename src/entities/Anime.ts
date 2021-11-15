export interface IProvider{
    key: string;
    icon: string;
    enabled: boolean;
}

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
    getProviders: () => IProvider[];
    recentEmitted: (provider: string) => Promise<IAnime[] | undefined>;
    episode: (provider: string, url: string) => Promise<IEpisode | undefined>;
}

