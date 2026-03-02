import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppNotifications } from "../contexts/NotificationsContext";
import { authClient } from "../libs/auth/auth";

function useAuth(type?: "login" | "signup" | "callback") {
  const { handleAppNotificationsError, setNotification } =
    useAppNotifications();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignOut = async () => {
    setNotification("Deslogando ...");
    await authClient.signOut();
    navigate("/login");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (type === "login") {
        if (!email || !password) {
          throw new Error("Todos os campos devem ser preenchidos");
        }
        setNotification("Logando ...");

        const data = await authClient.signIn.email({
          email,
          password,
        });
        if (data.error) throw new Error(data.error.message);
        setNotification("Login efetuado com sucesso");

        navigate("/");
      }

      if (type === "signup") {
        if (!name || !surname || !email || !password) {
          throw new Error("Todos os campos devem ser preenchidos");
        }
        setNotification("Registrando ...");

        const data = await authClient.signUp.email({
          name: name + " " + surname,
          email,
          password,
        });
        if (data.error) throw new Error(data.error.message);
        setNotification("Registro efetuado com sucesso");

        navigate("/login");
      }
    } catch (err) {
      handleAppNotificationsError(err);
    }
  }

  return {
    name,
    surname,
    email,
    password,

    handleSignOut,
    setName,
    setSurname,
    setEmail,
    setPassword,

    handleSubmit,
  };
}

export default useAuth;
