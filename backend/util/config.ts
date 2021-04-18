import dotenv from 'dotenv';

dotenv.config();

// are we in a production environment
const __PROD__: boolean = (process.env.NODE_ENV === 'production');

const _CONFIG = {
    DB: {
        HOST: __PROD__ ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
        USER: __PROD__ ? process.env.DB_USER_PROD : process.env.DB_USER_DEV,
        PASSWORD: __PROD__ ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD_DEV,
        DATABASE: __PROD__ ? process.env.DB_NAME_PROD : process.env.DB_NAME_DEV
    },
    AUTH: {
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
    }
}

export default _CONFIG;