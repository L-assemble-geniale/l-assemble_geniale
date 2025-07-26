import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.local" });

const appDataSource = new DataSource({
    // DB connexion
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Params
    synchronize: false,
    logging: false,

    //Data types
    entities: [],
});

export default appDataSource;