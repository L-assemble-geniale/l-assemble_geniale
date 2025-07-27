import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Adress } from "./entities/Adress";
import { Category } from "./entities/Category";
import { Event } from "./entities/Event";
import { Invitation } from "./entities/Invitation";
import { Member } from "./entities/Member";
import { News } from "./entities/News";
import { Question } from "./entities/Question";
import { Response } from "./entities/Response";
import { Recommandation } from "./entities/Recommandation";
import { RegisterToEvent } from "./entities/RegisterToEvent";
import { Residence } from "./entities/Residence";

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
    entities: [Adress, Category, Event, Invitation, Member, News, Question, Recommandation, RegisterToEvent, Residence, Response],
});

export default appDataSource;