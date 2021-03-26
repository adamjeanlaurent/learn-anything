"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var config_1 = __importDefault(require("../util/config"));
// initialize reusable sql connection
var connection = mysql2_1.default.createPool({
    host: config_1.default.DB.HOST,
    user: config_1.default.DB.USER,
    password: config_1.default.DB.PASSWORD,
    database: 'hello world'
});
exports.default = connection;
