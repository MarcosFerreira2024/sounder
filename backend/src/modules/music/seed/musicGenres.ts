import { prisma } from "../../../libs/prismaClient";

async function seedGenres() {
  console.group("Seeding genres");

  const genres = [
    { name: "Pop" },
    { name: "Rock" },
    { name: "Hip-Hop" },
    { name: "Rap" },
    { name: "R&B" },
    { name: "Jazz" },
    { name: "Blues" },
    { name: "Classical" },
    { name: "Electronic" },
    { name: "EDM" },

    { name: "House" },
    { name: "Techno" },
    { name: "Trance" },
    { name: "Dubstep" },
    { name: "Drum and Bass" },
    { name: "Jungle" },
    { name: "Breakbeat" },
    { name: "Garage" },
    { name: "UK Garage" },
    { name: "Grime" },
    { name: "Hardcore" },
    { name: "Hardstyle" },
    { name: "Psytrance" },
    { name: "IDM" },
    { name: "Ambient" },
    { name: "Minimal" },
    { name: "Synthwave" },
    { name: "Vaporwave" },
    { name: "Industrial" },

    { name: "Alternative Rock" },
    { name: "Indie Rock" },
    { name: "Progressive Rock" },
    { name: "Post-Rock" },
    { name: "Grunge" },
    { name: "Punk Rock" },
    { name: "Hard Rock" },
    { name: "Heavy Metal" },
    { name: "Death Metal" },
    { name: "Black Metal" },
    { name: "Emo" },
    { name: "Shoegaze" },
    { name: "Dream Pop" },

    { name: "Trap" },
    { name: "Drill" },
    { name: "Boom Bap" },

    { name: "Soul" },
    { name: "Funk" },
    { name: "Gospel" },
    { name: "Reggae" },
    { name: "Ska" },
    { name: "Country" },
    { name: "Folk" },

    { name: "Latin" },
    { name: "Salsa" },
    { name: "Bachata" },
    { name: "Reggaeton" },
    { name: "Afrobeats" },
    { name: "World Music" },

    { name: "K-Pop" },
    { name: "J-Pop" },

    { name: "MPB" },
    { name: "Sertanejo" },
    { name: "Pagode" },
    { name: "Samba" },
    { name: "Forro" },
    { name: "Axe" },
    { name: "Bossa Nova" },
    { name: "Choro" },
    { name: "Frevo" },
    { name: "Maracatu" },
    { name: "Funk Carioca" },

    { name: "Lo-Fi" },
    { name: "Soundtrack" },
    { name: "Experimental" },
    { name: "Spoken Word" },
    { name: "Children Music" }
  ];

  const results: {
    name: string;
    action: "CREATED" | "UPDATED";
  }[] = [];

  let processedGenres = 0;

  for (const genre of genres) {

    try {
      const existing = await prisma.genre.findUnique({
        where: { name: genre.name }
      });

      await prisma.genre.upsert({
        where: { name: genre.name },
        update: {},
        create: { name: genre.name }
      });

      results.push({
        name: genre.name,
        action: existing ? "UPDATED" : "CREATED"
      });

      processedGenres++;
    } catch (error) {
      console.error("Error:", error);
    }

  }

  console.log(`Genres seeding completed. Total processed: ${processedGenres}.`);

  console.groupCollapsed("Genres summary");
  console.table(results);
}

export { seedGenres };
