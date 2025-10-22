import { Hono } from "hono";
import routes from "./routes";
import { cors } from "hono/cors";
import  { logger } from 'hono/logger'
import { errorHandler } from './middleware/error'

const app = new Hono();

// global middlewares
app.use("*", cors({ origin: "*" })); // restrict origin in prod
app.use("*", logger());
app.route("/", routes);

app.onError(errorHandler);

export default app;
