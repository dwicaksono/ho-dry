import type { AppRouteHandler } from "@/lib/types";

import type { ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    {
      title: "Task 1",
      done: false,
    },
    {
      title: "Task 2",
      done: true,
    },
  ]);
};
