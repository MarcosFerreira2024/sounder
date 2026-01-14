import {  useState } from "react";
import { ZodError } from "zod";
import { loginSchema, registerSchema } from "../libs/schemas/authSchema";
import { useNavigate } from "react-router-dom";
import signup from "../actions/signup";
import login from "../actions/login";
import { useAppError } from "../contexts/ErrorContext";

function useAuth(type: "login" | "signup") {
  const { handleAppErrors } = useAppError();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (type === "login") {
        if (!email || !password) {
          throw new Error("Todos os campos devem ser preenchidos");
        }

        const data = loginSchema.parse({ email, password });
        await login(data);
        navigate("/");
      }

      if (type === "signup") {
        if (!name || !surname || !email || !password) {
          throw new Error("Todos os campos devem ser preenchidos");
        }

        const data = registerSchema.parse({
          name,
          surname,
          email,
          password,
        });

        await signup(data);
        navigate("/login");
      }

      throw new Error("A type must be selected on useAuth");
    } catch (err) {

      handleAppErrors(err)

    }
  }

  return {
    name,
    surname,
    email,
    password,

    setName,
    setSurname,
    setEmail,
    setPassword,

    handleSubmit,
  };
}

export default useAuth;
