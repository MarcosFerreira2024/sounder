import { container } from "tsyringe";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";
import { DeleteUserUseCase } from "../useCases/DeleteUserUseCase";
import { Request, Response } from "express";
import { handleAppError } from "../../../helpers/handleAppError";

class UserController {

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params as { id: string };


            const user = await container.resolve(UpdateUserUseCase).execute(req.user!,id, req.body);
            
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
            const { id } = req.params as { id: string };

            const user = await container.resolve(GetUserUseCase).execute(id);
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
            const { id } = req.params as { id: string };


            await container.resolve(DeleteUserUseCase).execute(req.user!,id);
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error: any) {
            return handleAppError(res, error);
        }
    }
}

export { UserController };