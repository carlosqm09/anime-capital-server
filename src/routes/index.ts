import { Router } from 'express';
// import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import {getEpisode, getProviders, getRecentEmitted, redir} from './Animes';
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


// Export the base-router
const baseRouter = Router();

baseRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

baseRouter.use('/anime', animeRouter);
baseRouter.get('/', redir);
baseRouter.use('/api-docs', swagger.serve, swagger.setup(docs));
// baseRouter.use('/users', userRouter);
export default baseRouter;
