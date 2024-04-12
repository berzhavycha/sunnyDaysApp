import { authMiddleware } from './authMiddleware';
import { urlMiddleware } from './urlMiddleware';

export const middleware = [authMiddleware, urlMiddleware];
