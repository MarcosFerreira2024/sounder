import { routes } from "../consts/routes";

type signupData = {
    name: string;
    surname: string;
    email: string;
    password: string;
}


async function signup(data:signupData) {

    const response = await fetch(routes.auth.signup, {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(data),
    })

    const json = await response.json()
    if(json.status !== 200) throw new Error(json.error)
    return json.data

}

export default signup