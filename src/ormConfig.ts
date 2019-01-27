import { ConnectionOptions } from "typeorm"
// console.log(process.env);


const connectionOptions:ConnectionOptions = {
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: ["entities/*.*"],
    host: process.env.DB_ENDPOINT,
    port: 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD 
}


export default connectionOptions;

// psql -U postgres -h localhost -W
