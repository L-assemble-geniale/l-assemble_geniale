import express from "express";
import cors from 'cors';
import appDataSource from "./data-source";

appDataSource.initialize().then(() => {

    //Parameters
    const app = express();

    app.use(express.json());
    app.use(
        cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        })
    );
    app.use(express.json());

    //Routes
    app.use();

    app.listen(process.env.PORT, () => {
        console.log(
            `API is running on port :${process.env.PORT}`
        );
    });
})
    .catch((err) => {
        console.log(`Une erreur est survenue : `, err)
    });


