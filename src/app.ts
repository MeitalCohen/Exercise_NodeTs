import express from "express";
import { IdentitiesApi } from "./api/identities/api";
import { MetricsApi } from "./api/metric/api";
import * as bodyParser from "body-parser";
import cors from "cors";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const port = 3000;

  IdentitiesApi.initRoutes(app);
  MetricsApi.initRoutes(app);

  app.get("/", (req, res) => {
    res.send("Service is up and running!");
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().then();
