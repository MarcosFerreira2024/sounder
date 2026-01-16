import Elysia from "elysia";

function routesManager(app:Elysia){


    app.get("/",()=> "Hello Elysia")

    return app
}

export {routesManager}