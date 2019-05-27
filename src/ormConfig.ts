import { ConnectionOptions } from "typeorm"

const connectionOptions:ConnectionOptions = {
    // type: "mariadb",
    type: "postgres",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: ["entities/*.*"],
    // host: process.env.MARIADB_ENDPOINT,
    // port: 3306,
    // username: process.env.MARIADB_USERNAME,
    // password: process.env.MARIADB_PASSWORD 
        host: process.env.DB_ENDPOINT,
        port: 5433,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD 
}


export default connectionOptions;

// psql -U postgres -h localhost -W
