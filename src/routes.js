import { Router } from 'express';

import DevController from './app/controllers/DevController';
import LikeController from './app/controllers/LikeController';
import DislikeController from './app/controllers/DislikeController';

const routes = new Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:targetId/likes', LikeController.store);
routes.post('/devs/:targetId/dislikes', DislikeController.store);

export default routes;
