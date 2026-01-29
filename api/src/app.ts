import express from "express";
import cors from "cors";

import residenceRouter from "./routes/ResidenceRoutes";
import authRouter from "./routes/AuthRoutes";
import invitationRouter from "./routes/InvitationRoutes";
import newsRouter from "./routes/NewsRoutes";
import memberRouter from "./routes/MemberRoutes";
import recommandationRoutes from "./routes/RecommendationRoutes";
import categoryRouter from "./routes/CategoryRoutes";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
  );

  // Route simple pour tests pipeline
  app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

  app.use("/api/residence", residenceRouter);
  app.use("/api/user", authRouter);
  app.use("/api/user", invitationRouter);
  app.use("/api/news", newsRouter);
  app.use("/api/members", memberRouter);
  app.use("/api/recommandations", recommandationRoutes);
  app.use("/api/categories", categoryRouter);

  return app;
}
