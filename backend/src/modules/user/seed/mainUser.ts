import { auth } from "../../../configs/auth.js";
import { faker } from '@faker-js/faker';
import { prisma } from "../../../libs/prismaClient.js";

async function mainUser () {



    console.log( `Seeding main user ...` )

        try {

            const alreadyExists = await prisma.user.findFirst({
                where: {
                    email: process.env.ADMIN_EMAIL as string
                }
            })
            
            if(alreadyExists) {
                return console.log("Admin user already exists. Skipping creation.");
            }

            const createdUser = await auth.api.signUpEmail({
                body: {
                    email: process.env.ADMIN_EMAIL as string,
                    name: process.env.ADMIN_NAME as string,
                    password: process.env.ADMIN_PASSWORD as string,
                    image: faker.image.avatar()
                }
            })

            await prisma.user.update({
                where: {
                    id: createdUser.user.id
                },
                data: {
                    role: "ADMIN"
                }
            })

            console.log(`Admin user created`)
        }


        catch (error) {

            console.error(`Error creating admin`, error);

            return;
        }



        




}

export { mainUser };