import { NextFunction , Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _CONFIG from '../util/config';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // get auth header
    const authHeader: string | undefined = req.headers['authorization'];

    // parse header for token 
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(403);
    }
    
    jwt.verify(token, _CONFIG.AUTH.ACCESS_TOKEN_SECRET!, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

export default authenticateToken;