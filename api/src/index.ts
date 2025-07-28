import express from "express";
import cors from 'cors';
import appDataSource from "./data-source";
import residenceRouter from "./routes/ResidenceRoutes";

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
    app.use("/api/residence", residenceRouter);

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`API is running on port : ${port}`);
    });
})
    .catch((err) => {
        console.log(`Une erreur s'est produite :`, err);
    });

