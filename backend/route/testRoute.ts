import { Router, Request, Response, NextFunction } from 'express';

import { authenticateToken } from '../auth/auth';

const router: Router = Router();

router.post('/testToken', authenticateToken, (req, res, next) => {
    res.send(req.user);
}); 

export default router;