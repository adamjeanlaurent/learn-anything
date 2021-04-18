import { Router, Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimit } from 'express-rate-limit';

import { authenticateToken } from '../auth/auth';
import connection from '../db/connection';

const router: Router = Router();

router.post('/create', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    // { userID: user.userID, userName: userName }

    try {
        const { userID, userName } = req.user;
        let { title } = req.body;

        title = title.replace('%20', ' ');
    
        const createRoadmapQuery = `INSERT INTO ROADMAP(userID, roadmapTitle, likes) VALUES('${userID}','${title}',${0})`;
        await connection.query(createRoadmapQuery);

        res.send({ message: 'success' });
    }

    catch(error) {
        next(error);
    }
});

// router.delete('delete/:title', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { userID, userName } = req.user;
//         const { title } = req.params;
        
//         const deleteRoadmapQuery = `DELETE `;
//         await connection.query();
//     }

//     catch(error) {
//         next(error);
//     }
// });

export default router;