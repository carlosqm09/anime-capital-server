import StatusCodes from "http-status-codes";
import {Request, Response} from 'express';
import {AnimeDao} from '@daos/Anime/AnimeDao'

const {OK, BAD_REQUEST} = StatusCodes;
const animes = new AnimeDao();

/**
 * @param req
 * @param res|
 * @returns
 */
export async function getRecentEmitted(req: Request, res: Response) {
    const list = await animes.recentEmitted();
    res.status(OK).json(list);
}

/**
 * @param req
 * @param res
 * @returns
 */

export async function getEpisode(req: Request, res: Response){
    const {url} = req.query;
    const episode = await animes.episode(url!.toString());
    res.status(OK).json(episode);
}