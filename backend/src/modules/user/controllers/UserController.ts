import { container } from "tsyringe";
import { UpdateUser } from "../useCases/UpdateUser.js";
import { GetUser } from "../useCases/GetUser.js";
import { DeleteUser } from "../useCases/DeleteUser.js";
import { Request, Response } from "express";
import { handleAppError } from "../../../shared/helpers/handleAppError.js";
import { ChangeProfilePicture } from "../useCases/ChangeProfilePicture.js";

class UserController {
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query as { userId: string };

      const user = await container
        .resolve(UpdateUser)
        .execute(req.user!, req.body, userId);

      return res.status(200).json({
        data: user,
        message: "User updated successfully",
      });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async changeProfilePicture(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.file) throw new Error("Image is required");

      const user = await container.resolve(ChangeProfilePicture).execute({
        image: {
          buffer: req.file.buffer,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
        },
        user: req.user!,
        userId: (req.params.userId as string) ?? undefined,
      });
      return res.status(200).json({
        data: user,
        message: "User photo updated successfully",
      });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query as { userId: string };

      const user = await container.resolve(GetUser).execute(req.user!, userId);
      return res.status(200).json({
        data: user,
        message: "User found successfully",
      });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params as { userId: string };

      await container.resolve(DeleteUser).execute(req.user!, userId);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }
}

export { UserController };
