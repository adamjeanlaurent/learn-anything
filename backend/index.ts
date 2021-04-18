// npm
import {  Express, NextFunction , Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

// local
import authRoute from './route/authRoute';
import testRoute from './route/testRoute';
import roadmapRoute from './route/roadmapRoute';

// setup express
const PORT = process.env.PORT;
const app: Express = express();
app.enable("trust proxy");
dotenv.config({ path:'../env' });

// middleware 
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    if(process.env.NODE_ENV === 'production') {
        return res.json({
            error: 'Internal Error Occured🥞'
        });
    }
    
    return res.json({
        error: error.stack
    });
});

// routes
app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/roadmap', roadmapRoute);

// app listener
app.listen(PORT || 3000, () => {
    console.log('app Running!');
});