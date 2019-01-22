import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";

const PORT : number | string = process.env.PORT || 4000;
const PLATGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions : Options = {
    port: PORT, 
    playground: PLATGROUND_ENDPOINT,
    endpoint : GRAPHQL_ENDPOINT
}

const handleAppStat = () => console.log(`Listing on port ${PORT}`)

createConnection(connectionOptions).then(() => {
    app.start(appOptions, handleAppStat);
})

app.start(appOptions, handleAppStat);