import { Router, Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimit } from 'express-rate-limit';

import { authenticateToken } from '../auth/auth';
import connection from '../db/connection';
import { ErrorResponse } from '../util/types';

const router: Router = Router();

router.post('/create', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { markdown, title, roadmapID } = req.body;
        const { userID, userName } = req.user;
    
        // ensure they have access to this roadmap
        const userHasAccessQuery = `SELECT * from ROADMAP WHERE roadmapID = '${roadmapID}' AND userID = '${userID}'`;
        const [foundUser] = await connection.query(userHasAccessQuery) as any;

        if(foundUser.length === 0) {
            // user not authorized
            let error: ErrorResponse = { errors: [] };
            res.status(403);
            error.errors.push('unauthorized');
            return res.json(error);
        }

        // insert stop

        // fix table to get rid of stopNum
        const insertStopQuery = `INSERT INTO STOP`;
        await connection.query(insertStopQuery);
    }

    catch(err) {
        next(err.message);
    }
   
});

export default router;