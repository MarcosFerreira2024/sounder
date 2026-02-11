import { seedGenres } from "../../modules/music/seed/musicGenres";
import { mainUserPlaylist } from "../../modules/playlist/seed/mainUserPlaylist";
import { mainUser } from "../../modules/user/seed/mainUser";
import { mockUsers } from "../../modules/user/seed/mockUsers";
import { seedArtists } from "../../modules/artist/seeds/seedArtists";
import { seedMusicForAdminPlaylists } from "./seedMusicForAdminPlaylists";
import dotenv from "dotenv";
(async () => {
  console.log("Seeding data...");

  dotenv.config();

  const startedAt = new Date();

  (await mainUser(),
    await Promise.all([
      seedGenres(),
      mainUserPlaylist(5),
      mockUsers(20),
      seedArtists(),
    ]));

  await seedMusicForAdminPlaylists();

  const endedAt = new Date();
  const timeTaken = (endedAt.getTime() - startedAt.getTime()) / 1000;
  console.log("Seeding completed.");

  console.log(`Seeding finished in ${timeTaken} seconds.`);
})();
