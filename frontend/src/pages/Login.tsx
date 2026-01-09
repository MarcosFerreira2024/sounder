import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router-dom";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";
import AuthProviders from "../components/AuthProviders";

function Login() {
  return (
    <AuthLayout
      title={"Efetue seu Login"}
      text={"Ainda não possui uma conta?"}
      link={"/signup"}
      linkText={"Registre-se"}
      isTyping={false}
    >
      <form className="w-full flex flex-col gap-6">
        <InputLabel
          text="Email"
          name="email"
          onChange={() => {}}
          placeholder="Digite seu Email"
          type="email"
        />
        <InputLabel
          text="Senha"
          name="password"
          onChange={() => {}}
          placeholder="Digite sua senha"
          type="text"
        />{" "}
        <Button title="Entrar" size="lg" roundedValue="md">
          Entrar
        </Button>
        <AuthProviders />
      </form>
    </AuthLayout>
  );
}

export default Login;
