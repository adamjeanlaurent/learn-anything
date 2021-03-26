import { NextFunction , Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import connection from '../db/connection';
import _CONFIG from '../util/config';
import { comparePasswords } from './bcrypt';

// middleware that authenticates a json web token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // get auth header
    const authHeader: string | undefined = req.headers['authorization'];

    // parse header for token 
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.sendStatus(403);
    }
    
    jwt.verify(token, _CONFIG.AUTH.ACCESS_TOKEN_SECRET!, (err, user: any) => {
        if(err) {
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    });
}

export const createNewToken = async (userName: string, userPasswordPlaintext: string): Promise<string> => {
    
    try {
        // get user from DB
        const findUserQuery: string = `SELECT * FROM USER WHERE userName = '${userName}'`;
        const [foundUser] = await connection.query(findUserQuery) as any;

        // if user not found
        if(foundUser.length === 0) return '';

        // compare passwords
        const user = foundUser[0];
        const hashedPwdFromDb = user.pass;
        const passwordsMatch: boolean = comparePasswords(userPasswordPlaintext, hashedPwdFromDb);

        if(!passwordsMatch) return '';
        
        const accessToken: string = jwt.sign({ userID: user.userID }, _CONFIG.AUTH.ACCESS_TOKEN_SECRET!);

        return accessToken;
    }

    catch {
        throw new Error('DB error');
    }
}
