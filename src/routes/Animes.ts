import StatusCodes from "http-status-codes";
import {Request, Response} from 'express';
import {AnimeDao} from '@daos/Anime/AnimeDao'

const {OK, BAD_REQUEST} = StatusCodes;
const animes = new AnimeDao();

/**
 * @param req
 * @param res
 * @returns
 */
export function redir(req: Request, res: Response){
    res.redirect('/api/api-docs');
}


/**
 * @param req
 * @param res
 * @returns
 */
export function getProviders(req: Request, res: Response){
    const providersList = animes.getProviders();
    res.status(OK).json(providersList);
}

/**
 * @param req
 * @param res|
 * @returns
 */
export async function getRecentEmitted(req: Request, res: Response) {
    const {provider} = req.headers;
    const list = await animes.recentEmitted(provider as string);
    res.status(OK).json(list);
}

/**
 * @param req
 * @param res
 * @returns
 */

export async function getEpisode(req: Request, res: Response){
    const {url} = req.query;
    const {provider} = req.headers;

    const episode = await animes.episode(provider as string, url!.toString());
    res.status(OK).json(episode);
}