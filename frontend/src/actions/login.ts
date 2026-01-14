import { routes } from "../consts/routes";
import  Cookies  from "js-cookie";

type loginData = {
    email: string;
    password: string;
}


async function login(data:loginData) {

    const response = await fetch(routes.auth.login, {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(data),
    })

    const json = await response.json()
    if(json.status !== 200) throw new Error(json.error)

    Cookies.set("token", json.data.token);
}

export default login