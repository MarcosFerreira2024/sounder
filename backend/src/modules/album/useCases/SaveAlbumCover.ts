import { injectable } from "tsyringe";
import { Request } from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { prisma } from "../../../libs/prismaClient.js";
import { AppUser } from "../../../shared/types/user.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";

@injectable()
class SaveAlbumCover {
    async execute(req: Request): Promise<string> {
        const user = req.user as AppUser;
        const albumName = req.body.name;
        const artistId = req.body.artistId;
        const file = req.file;

        if (!albumName) {
            throw new Error("Album name is required");
        }

        if (!file) {
            throw new Error("Cover image is required");
        }
        
        let targetArtistId: string;

        if (artistId) {
            if (!isAdmin(user)) throw new Error("You don't have permissions to create an album for another artist");
            targetArtistId = artistId;
        } else {
            if (!user.artist) throw new Error("This user is not an artist or it's not assigned to an artist");
            targetArtistId = user.artist.id;
        }

        const artist = await prisma.artist.findUnique({
            where: { id: targetArtistId },
            include: { user: { select: { name: true } } }
        });

        if (!artist) {
            throw new Error("Artist not found for the given ID");
        }

        const artistName = artist.user.name.replace(/\s+/g, '_');
        const sanitizedAlbumName = albumName.replace(/\s+/g, '_');

        const destinationPath = path.join("src", "storage", "cover", artistName, sanitizedAlbumName);
        fs.mkdirSync(destinationPath, { recursive: true });

        const hashed = crypto.randomBytes(16).toString("hex");
        const filename = hashed + path.extname(file.originalname);
        const filepath = path.join(destinationPath, filename);

        fs.writeFileSync(filepath, file.buffer);

        return filepath;
    }
}

export { SaveAlbumCover };
