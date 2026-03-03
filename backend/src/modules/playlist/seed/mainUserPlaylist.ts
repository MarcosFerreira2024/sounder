import { faker } from "@faker-js/faker";
import { prisma } from "../../../libs/prismaClient.js";

async function mainUserPlaylist(playlistQuantity?: number) {
  console.group("Seeding playlists");

  const playlists: { name: string; image: string }[] = [];
  const results: {
    name: string;
    status: "CREATED" | "SKIPPED" | "ERROR";
    owner: string;
  }[] = [];

  let createdPlaylists = 0;
  const playlistsToCreate = playlistQuantity ?? 5;
  const ownerEmail = process.env.ADMIN_EMAIL as string;

  for (let i = 0; i < playlistsToCreate; i++) {
    playlists.push({
      name: `${faker.music.genre()} Hits`,
      image: faker.image.url({ width: 300, height: 300 }),
    });
  }

  for (const playlist of playlists) {
    try {
      const alreadyExists = await prisma.playlist.findFirst({
        where: {
          owner: { email: ownerEmail },
          name: playlist.name,
        },
      });

      if (!alreadyExists) {
        await prisma.playlist.create({
          data: {
            name: playlist.name,
            image: playlist.image,
            owner: {
              connect: { email: ownerEmail },
            },
          },
        });

        createdPlaylists++;
        results.push({
          name: playlist.name,
          status: "CREATED",
          owner: ownerEmail,
        });
      } else {
        results.push({
          name: playlist.name,
          status: "SKIPPED",
          owner: ownerEmail,
        });

        console.log(" Already exists");
      }
    } catch (error) {
      results.push({
        name: playlist.name,
        status: "ERROR",
        owner: ownerEmail,
      });

      console.error("Error:", error);
    }

    console.groupEnd();
  }

  console.log(`New playlists created: ${createdPlaylists}`);

  console.groupCollapsed("Playlists summary");
  console.table(results);
  console.groupEnd();

  console.groupEnd();
}

export { mainUserPlaylist };
