"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// are we in a production or developement environment
var __PROD__ = (process.env.NODE_ENV === 'production');
var _CONFIG = {
    DB: {
        HOST: __PROD__ ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV,
        USER: __PROD__ ? process.env.DB_USER_PROD : process.env.DB_USER_DEV,
        PASSWORD: __PROD__ ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD_DEV,
        DATABASE: __PROD__ ? process.env.DB_NAME_PROD : process.env.DB_NAME_DEV
    },
    APIKEY: {}
};
exports.default = _CONFIG;
