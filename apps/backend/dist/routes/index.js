import { Hono } from "hono";
import authRoute from "./auth";
import laundryRoute from "./laundry";
const router = new Hono();
router.route("/auth", authRoute);
router.route("/laundry", laundryRoute);
export default router;
