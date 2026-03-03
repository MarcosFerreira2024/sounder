import { prisma } from "../../../libs/prismaClient.js";
import crypto from "crypto";

class ArtistFactory {
  generateEmail(name: string) {
    const hash = crypto
      .createHash("md5")
      .update(name)
      .digest("hex")
      .slice(0, 10);
    return `${name.trim().toLowerCase().replace(/\s+/g, "")}${hash}@sounder.com`;
  }

  prepareArtistToSeed(name: string) {
    const email = this.generateEmail(name);
    return {
      name,
      email,
    };
  }
}

async function seedArtists() {
  const factory = new ArtistFactory();
  const createdArtists: { name: string; email: string }[] = [];
  const failedArtists: { name: string; email: string; error: unknown }[] = [];

  const artistNames = [
    "The Beatles",
    "Paramore",
    "Beyoncé",
    "Kendrick Lamar",
    "Taylor Swift",
    "Coldplay",
    "Adele",
    "Drake",
    "Eminem",
    "Billie Eilish",
    "Rihanna",
    "Imagine Dragons",
    "Bruno Mars",
    "Ed Sheeran",
    "Lizzo",
    "Lady Gaga",
    "Metallica",
    "Linkin Park",
    "Queen",
    "Pink Floyd",
    "Nirvana",
    "Post Malone",
    "Dua Lipa",
    "Shakira",
    "The Weeknd",
    "Ariana Grande",
    "Travis Scott",
    "Kanye West",
    "Doja Cat",
    "Green Day",
    "Red Hot Chili Peppers",
    "Sia",
    "Foo Fighters",
    "Miley Cyrus",
    "Katy Perry",
    "Justin Bieber",
    "Maroon 5",
    "Sam Smith",
    "Panic! At The Disco",
    "Cold War Kids",
    "Paramore",
    "The Strokes",
    "Florence + The Machine",
    "Muse",
    "Halsey",
    "Twenty One Pilots",
    "Lana Del Rey",
    "My Chemical Romance",
    "Arctic Monkeys",
    "Imagine Dragons",
    "Michael Jackson",
    "Madonna",
    "Prince",
    "Elton John",
    "Stevie Wonder",
    "Whitney Houston",
    "Mariah Carey",
    "Celine Dion",
    "Frank Sinatra",
    "Elvis Presley",
    "Bob Dylan",
    "Led Zeppelin",
    "The Rolling Stones",
    "Queen",
    "AC/DC",
    "Guns N' Roses",
    "U2",
    "Daft Punk",
    "R.E.M.",
    "Oasis",
    "Blur",
    "Radiohead",
    "Gorillaz",
    "The Cure",
    "Depeche Mode",
    "Bon Jovi",
    "Iron Maiden",
    "Judas Priest",
    "Motörhead",
    "Slayer",
    "Megadeth",
    "Anthrax",
    "Opeth",
    "Dream Theater",
    "Tool",
    "System Of A Down",
    "Slipknot",
    "Rage Against The Machine",
    "Linkin Park",
    "Limp Bizkit",
    "Korn",
    "Disturbed",
    "Avenged Sevenfold",
    "Bring Me The Horizon",
    " Architects",
    "A Day To Remember",
    "Asking Alexandria",
    "Black Veil Brides",
    "Falling In Reverse",
    "Pierce The Veil",
    "Anitta",
    "Roberto Carlos",
    "Ivete Sangalo",
    "Caetano Veloso",
    "Gilberto Gil",
    "Gal Costa",
    "Maria Bethânia",
    "Chico Buarque",
    "Elis Regina",
    "Tim Maia",
    "Marisa Monte",
    "Djavan",
    "Lulu Santos",
    "Claudia Leitte",
    "Wesley Safadão",
    "Gusttavo Lima",
    "Alok",
    "IZA",
    "Pabllo Vittar",
    "Titãs",
    "Paralamas do Sucesso",
    "Skank",
    "Jota Quest",
    "Legião Urbana",
    "Raul Seixas",
    "Joji",
    "Rex Orange County",
    "Tyler, The Creator",
    "Frank Ocean",
    "The 1975",
  ];

  const artists = artistNames.map((name) => factory.prepareArtistToSeed(name));

  console.groupCollapsed(`Seeding artists (${artists.length})`);

  for (const artist of artists) {
    try {
      let createdUser = await prisma.user.findUnique({
        where: { email: artist.email },
      });

      if (!createdUser) {
        createdUser = await prisma.user.create({
          data: {
            email: artist.email,
            name: artist.name,
          },
        });
      }

      const existingArtist = await prisma.artist.findUnique({
        where: { userId: createdUser.id },
      });

      if (!existingArtist) {
        await prisma.artist.create({
          data: {
            userId: createdUser.id,
          },
        });
      }
      createdArtists.push(artist);
    } catch (err) {
      failedArtists.push({ ...artist, error: err });
    }
  }

  if (createdArtists.length) {
    console.groupCollapsed(`Created artists (${createdArtists.length})`);
    console.table(createdArtists);
    console.groupEnd();
  }

  if (failedArtists.length) {
    console.groupCollapsed(`Failed artists (${failedArtists.length})`);
    failedArtists.forEach((f) =>
      console.error(`Error creating ${f.name}: ${f.email}`, f.error),
    );
    console.groupEnd();
  }

  console.groupEnd();
}

export { seedArtists };
