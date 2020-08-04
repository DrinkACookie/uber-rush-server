"use strict";
exports.__esModule = true;
var connectionOptions = {
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};
exports["default"] = connectionOptions;
