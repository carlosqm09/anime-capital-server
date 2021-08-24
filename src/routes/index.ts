import { Router } from 'express';
// import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import {getEpisode, getRecentEmitted} from './Animes';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const docs = YAML.load('../shared/swagger.yaml')


// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

// Anime routes
const animeRouter = Router();
animeRouter.get('/recents', getRecentEmitted);
animeRouter.get('/episode', getEpisode);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/anime', animeRouter);
baseRouter.use('/api-docs', swagger.serve, swagger.setup(docs));
// baseRouter.use('/users', userRouter);
export default baseRouter;
