import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Tasks"];

export const list = createRoute({
  method: "get",
  path: "/tasks",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({
        title: z.string(),
        done: z.boolean(),
      })),
      "List of tasks",
    ),
  },
});

export type ListRoute = typeof list;
