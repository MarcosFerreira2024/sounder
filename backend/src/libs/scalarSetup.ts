import { Application } from "express";
import { apiReference } from "@scalar/express-api-reference";
import swaggerSpec from "./openapiSpec.js";

function setupScalar(app: Application) {
  app.get("/openapi.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/api/reference",
    apiReference({
      url: "/openapi.json",
    }),
  );
}

export { setupScalar };
