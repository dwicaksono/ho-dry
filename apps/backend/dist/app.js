import { Hono } from "hono";
import routes from "./routes";
import { cors } from "hono/cors";
const app = new Hono();
// global middlewares
app.use("*", cors({ origin: "*" })); // restrict origin in prod
app.route("/", routes);
export default app;
