import mysql from 'mysql2/promise';
import _CONFIG from '../util/config'; 

// initialize reusable sql connection
const connection = mysql.createPool({
    host: _CONFIG.DB.HOST,
    user: _CONFIG.DB.USER,
    password: _CONFIG.DB.PASSWORD,
    database: _CONFIG.DB.DATABASE
});

export default connection;