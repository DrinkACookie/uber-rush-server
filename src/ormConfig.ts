import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME ,
  synchronize: true, //서버가 실행 될 때마다, DB를 원하는 모양으로 동기화
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export default connectionOptions;
