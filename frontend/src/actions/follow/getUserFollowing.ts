import { routes } from "../../consts/routes";

async function getUserFollowing (userId: string) {


    const response = await fetch(routes.follow.getFollowingsById(userId),{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })

    const json = await response.json()


    return json.data
    


}
export default getUserFollowing