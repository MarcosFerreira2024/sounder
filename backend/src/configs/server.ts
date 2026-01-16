import Elysia from "elysia"
import { pluginManager } from "../managers/pluginManager"
import cors from "@elysiajs/cors"
import { routesManager } from "../managers/routesManager"

class Server {

    constructor(public port:number, public app:Elysia) {


        app.use(cors({
            origin:["http://localhost:5173"],
            allowedHeaders:["Content-Type", "Authorization"],
            credentials:true,
            methods:["GET", "POST", "PATCH", "DELETE"]

        }))
        pluginManager(app)
        routesManager(app)

    }


    run () {
        this.app.listen(this.port)
        console.log(`Servidor rodando em http://localhost:${this.port}`)
    }



}

export {Server}