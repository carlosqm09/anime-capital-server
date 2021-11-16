import { Router } from 'express';
// import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import {getEpisode, getProviders, getRecentEmitted,getNewSeason, translateData ,redir} from './Animes';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const docs = YAML.load(path.join(__dirname, '/../shared/swagger.yaml'))


// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

// Anime routes
const animeRouter = Router();
animeRouter.get('/',)
animeRouter.get('/get-providers', getProviders)
animeRouter.get('/recents', getRecentEmitted);
animeRouter.get('/episode', getEpisode);
animeRouter.get('/new-season', getNewSeason)
animeRouter.post('/anime-trad', translateData)


// Export the base-router
const baseRouter = Router();


baseRouter.use('/anime', animeRouter);
baseRouter.get('/', redir);
baseRouter.use('/api-docs', swagger.serve, swagger.setup(docs));
// baseRouter.use('/users', userRouter);
export default baseRouter;
