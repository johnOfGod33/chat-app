import cors from "cors";
import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config/constants";

const app: Express = express();
const swaggerFile = require("./config/swagger-output.json");

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello world this is the swagger file ${swaggerFile}`);
});

app.listen(PORT, () => {
  console.log(`server runing at port ${PORT}`);
});
