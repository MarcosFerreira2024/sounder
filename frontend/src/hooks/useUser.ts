import { useState } from "react";
import { userMock } from "../data/userMock";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo:string
};

function useUser() {






  const [user, setUserState] = useState<User | null>(userMock);


  function setUser(user: User) {
    setUserState(user);
  }







  return {
    user,
    setUser,
  };
}

export { useUser };
