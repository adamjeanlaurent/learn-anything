import { Router, Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimit } from 'express-rate-limit';

import { ErrorResponse } from '../util/types';
import { registerUser, createNewToken } from '../auth/auth';

const router: Router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // check for errors in user input
    let error: ErrorResponse = { errors: [] };
    if(username.length === 0) error.errors.push('provide a username');
    if(email.length === 0) error.errors.push('provide a email');
    if(password.length === 0) error.errors.push('provide a password');
    if(error.errors.length !== 0) return res.send(error);

    try {
        // try to register user
        const registrationResponse: string = await registerUser(username, email, password);

        // if username or email is taken
        if(registrationResponse === 'username or email taken') {
            error.errors.push('username or email taken');
            return res.send(error);
        }

        return res.send({ message: 'success' });
    }

    catch(err) {
        next(err.message);
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // check for errors in user input
    let error: ErrorResponse = { errors: [] };
    if(username.length === 0) error.errors.push('provide a username');
    if(password.length === 0) error.errors.push('provide a password');
    if(error.errors.length !== 0) return res.send(error);
    
    try {
        // create json web token
        const token = await createNewToken(username, password);
        
        if(token === '') {
            error.errors.push('invalid username or password');
            return res.send(error);
        }

        return res.send({ token: token });
    }

    catch(err) {
        next(err.message);
    }
});

export default router;