import { container } from "tsyringe";
import { UpdateUser } from "../useCases/UpdateUser";
import { GetUser } from "../useCases/GetUser";
import { DeleteUser } from "../useCases/DeleteUser";
import { Request, Response } from "express";
import { handleAppError } from "../../../shared/helpers/handleAppError";

class UserController {

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { userId:id } = req.params as { userId: string };


            const user = await container.resolve(UpdateUser).execute(req.user!,id, req.body);
            
            return res.status(200).json({
                data: user,
                message: "User updated successfully"
            });
        } catch (error: any) {
            return handleAppError(res, error);
        }
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const { userId:id } = req.params as { userId: string };

            const user = await container.resolve(GetUser).execute(id);
            return res.status(200).json({
                data: user,
                message: "User found successfully"
            });
        } catch (error: any) {
            return handleAppError(res, error);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { userId:id } = req.params as { userId: string };


            await container.resolve(DeleteUser).execute(req.user!,id);
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            return handleAppError(res, error);
        }
    }
}

export { UserController };