const mysql = require("mysql2");
require('dotenv').config();
const dbConfig = {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    connectTimeout: process.env.DB_CONNECT_TIMEOUT, // 60 seconds
    waitForConnections: true,
};

const connection = mysql.createPool(dbConfig);

const handleDisconnect = (pool) => {
    pool.on("connection", (connection) => {
        console.log("DB Connection established");
        connection.on("error", (err) => {
            if (err.code === "PROTOCOL_CONNECTION_LOST") {
                console.error("Database connection was closed.");
            } else if (err.code === "ER_CON_COUNT_ERROR") {
                console.error("Database has too many connections.");
            } else if (err.code === "ECONNREFUSED") {
                console.error("Database connection was refused.");
            }
        });
    });

    pool.on("acquire", (connection) => {
        console.log("Connection %d acquired", connection.threadId);
    });

    pool.on("enqueue", () => {
        console.log("Waiting for available connection slot");
    });

    pool.on("release", (connection) => {
        console.log("Connection %d released", connection.threadId);
    });
}

handleDisconnect(connection);

module.exports = connection;