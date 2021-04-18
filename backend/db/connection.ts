import mysql from 'mysql2/promise';
import _CONFIG from '../util/config'; 

// initialize reusable sql connection
const connection = mysql.createPool({
    host: _CONFIG.DB.HOST,
    user: _CONFIG.DB.USER,
    password: _CONFIG.DB.PASSWORD,
    database: _CONFIG.DB.DATABASE
});

// const runSqlQuery = async (query: string): Promise<any> => {
//     const connection = await mysql.createConnection({
//         host: _CONFIG.DB.HOST,
//         user: _CONFIG.DB.USER,
//         password: _CONFIG.DB.PASSWORD,
//         database: _CONFIG.DB.DATABASE
//     });

//     const [res] = await connection.query(query);

//     await connection.end(); // is this how you end ?
//     return res;
// }

export default connection;