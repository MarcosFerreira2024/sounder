import { auth } from "../../../configs/auth.js";
import { faker } from "@faker-js/faker";

async function mockUsers(userQuantity?: number) {
  const usersToCreate = userQuantity ?? 20;
  const createdUsers: { name: string; email: string }[] = [];
  const failedUsers: { email: string; error: unknown }[] = [];

  console.groupCollapsed(`Seeding users (${usersToCreate})`);

  for (let i = 0; i < usersToCreate; i++) {
    const userData = {
      email: faker.internet.email({
        provider: `${Date.now()}sounder.com`,
      }),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      image: faker.image.avatar(),
    };

    try {
      const { user } = await auth.api.signUpEmail({
        body: userData,
      });

      createdUsers.push({
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      failedUsers.push({
        email: userData.email,
        error,
      });
    }
  }

  if (createdUsers.length) {
    console.groupCollapsed(`Created users (${createdUsers.length})`);
    console.table(createdUsers);
    console.groupEnd();
  }

  if (failedUsers.length) {
    console.groupCollapsed(`Failed users (${failedUsers.length})`);
    failedUsers.forEach((f) =>
      console.error(`Error creating ${f.email}`, f.error),
    );
    console.groupEnd();
  }

  console.groupEnd();
}

export { mockUsers };
