import { seedGenres } from "../../modules/music/seed/musicGenres";
import { mainUserPlaylist } from "../../modules/playlist/seed/mainUserPlaylist";
import { mainUser } from "../../modules/user/seed/mainUser";
import { mockUsers } from "../../modules/user/seed/mockUsers";
import dotenv from "dotenv";
(async ()=> {
  console.log("Seeding data...");

  dotenv.config();

  const startedAt = new Date();


  await seedGenres();
  await mainUser();
  await mainUserPlaylist(5)
  await mockUsers(20);


  const endedAt = new Date();
  const timeTaken = (endedAt.getTime() - startedAt.getTime()) / 1000;
  console.log("Seeding completed.");

  console.log(`Seeding finished in ${timeTaken} seconds.`);











})()
