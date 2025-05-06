import swaggerAutogen from "swagger-autogen";
import { PORT } from "./constants";
const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: `localhost:${PORT}`,
};

const outputFile = "./swagger-output.json";
const routes = ["../**/routers.ts", "../**/routers.js"];

swaggerAutogen()(outputFile, routes, doc);
