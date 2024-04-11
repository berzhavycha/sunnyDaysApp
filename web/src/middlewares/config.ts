import { authMiddleware } from './authMiddleware';
import { searchParamsMiddleware } from './searchParamsMiddleware';

export const middleware = [
    authMiddleware,
    searchParamsMiddleware,
]