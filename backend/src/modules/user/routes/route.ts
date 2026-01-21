import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { FollowController } from "../../follow/controllers/FollowController";
import { requireAuth } from "../../../middleware/requireAuth";
import { validate } from "../../../middleware/validateSchema";
import { followSchema } from "../../follow/schemas/schema";

export function userRoutes(): Router {
    const router = Router();
    const userController = new UserController();
    const followController = new FollowController();
    // const playlistController = new PlaylistController();



    /**
     * @openapi
     * /user/{id}/follow:
     *   post:
     *     summary: /user/{id}/follow
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID to follow.
     *     responses:
     *       200:
     *         description: Successfully followed the user.
     *       400:
     *         description: Invalid ID format.
     *       401:
     *         description: Unauthorized.
     */
    router.post("/:id/follow", validate({ params: followSchema }), deserializeUser, requireAuth, (req: Request, res: Response) => followController.follow(req, res));
    
    /**
     * @openapi
     * /user/{id}/unfollow:
     *   post:
     *     summary: /user/{id}/unfollow
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID to unfollow.
     *     responses:
     *       200:
     *         description: Successfully unfollowed the user.
     *       400:
     *         description: Invalid ID format.
     *       401:
     *         description: Unauthorized.
     */
    router.post("/:id/unfollow", validate({ params: followSchema }), deserializeUser, requireAuth, (req: Request, res: Response) => followController.unfollow(req, res));


    /**
     * @openapi
     * /user/{id}/followers:
     *   get:
     *     summary: /user/{id}/followers
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID.
     *     responses:
     *       200:
     *         description: A list of followers.
     *       400:
     *         description: Invalid ID format.
     */
    router.get("/:id/followers", validate({ params: followSchema }), (req: Request, res: Response) => followController.getFollowers(req, res));
    
    /**
     * @openapi
     * /user/{id}/following:
     *   get:
     *     summary: /user/{id}/following
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID.
     *     responses:
     *       200:
     *         description: A list of users that the specified user is following.
     *       400:
     *         description: Invalid ID format.
     */
    router.get("/:id/following", validate({ params: followSchema }), (req: Request, res: Response) => followController.getFollowing(req, res));

    //router.get("/:id/playlists", validate({ params: followSchema }), (req: Request, res: Response) => playlistController.getPlaylists(req, res));

    /**
     * @openapi
     * /user:
     *   get:
     *     summary: /user
     *     tags: [User]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: The authenticated user's data.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *       401:
     *         description: Unauthorized.
     */
    router.get("/", deserializeUser, requireAuth, (req: Request, res: Response) => {
        res.json(req.user);
    });

    /**
     * @openapi
     * /user/{id}:
     *   get:
     *     summary: /user/{id}
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID.
     *     responses:
     *       200:
     *         description: The user data.
     *       404:
     *         description: User not found.
     */
    router.get("/:id", validate({ params: followSchema }), (req: Request, res: Response) => userController.getUser(req, res));

    /**
     * @openapi
     * /user/{id}:
     *   delete:
     *     summary: /user/{id}
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID to delete.
     *     responses:
     *       200:
     *         description: User deleted successfully.
     *       404:
     *         description: User not found.
     */
    router.delete("/:id",deserializeUser,requireAuth, validate({ params: followSchema }), (req: Request, res: Response) => userController.delete(req, res));

    /**
     * @openapi
     * /user/{id}:
     *   put:
     *     summary: /user/{id}
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: User updated successfully.
     *       400:
     *         description: Invalid update data.
     *       404:
     *         description: User not found.
     */
    router.put("/:id",deserializeUser,requireAuth, validate({ params: followSchema }), (req: Request, res: Response) => userController.update(req, res));

    return router;
}