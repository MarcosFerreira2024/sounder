import Elysia from "elysia";
import { betterAuth } from "../libs/betterAuth";
import { openAPI } from "../libs/openAPI";

function pluginManager (app:Elysia) {


    betterAuth(app)
    openAPI(app)

    return app
}

export {pluginManager}