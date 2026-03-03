import { Application } from "express";
import { apiReference } from "@scalar/express-api-reference";
import swaggerSpec from "./openapiSpec";

function setupScalar(app: Application) {
  app.get("/openapi.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/api/reference",
    apiReference({
      spec: {
        url: "/openapi.json",
      },
    }),
  );
}

export { setupScalar };
