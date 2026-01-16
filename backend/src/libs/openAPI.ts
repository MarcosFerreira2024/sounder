import { Elysia } from 'elysia'
import {  openapi } from '@elysiajs/openapi'
import z from 'zod'

function openAPI (app:Elysia) {

    app.use(openapi({
	    mapJsonSchema: {
		    zod: z.toJSONSchema
	}
    })) 


    return app

}

export {openAPI}