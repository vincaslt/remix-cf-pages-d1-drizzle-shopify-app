import { onRequest as ____path___js_onRequest } from "/home/vincaslt/remix-cf-demo-app/functions/[[path]].js"

export const routes = [
    {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  ]