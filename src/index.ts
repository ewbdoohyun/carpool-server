import { Options } from "graphql-yoga";
import app from "./app";

const PORT : number | string = process.env.PORT || 4000;
const PLATGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions : Options = {
    port: PORT, 
    playground: PLATGROUND_ENDPOINT,
    endpoint : GRAPHQL_ENDPOINT
}

const handleAppStat = () => console.log(`Listing on port ${PORT}`)

app.start(appOptions, handleAppStat);