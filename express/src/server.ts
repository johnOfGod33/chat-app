import cors from "cors";
import express, { Express, Request, Response } from "express";
import { PORT } from "./config/constants";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`server runing at port ${PORT}`);
});
