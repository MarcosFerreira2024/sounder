import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";
import AuthProviders from "../components/AuthProviders";

function Signup() {
  return (
    <AuthLayout
      title={"Efetue seu Cadastro"}
      text={"Já possui uma conta?"}
      link={"/login"}
      linkText={"Logar"}
      isTyping={false}
    >
      <form className="w-full flex flex-col gap-6">
        <div className="flex gap-4">
          <InputLabel
            text="Nome"
            name="nome"
            onChange={() => {}}
            placeholder="Digite seu nome"
            type="text"
          />
          <InputLabel
            text="Sobrenome"
            name="surname"
            onChange={() => {}}
            placeholder="Digite seu sobrenome"
            type="text"
          />{" "}
        </div>
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
        <Button title="Criar Conta" size="lg" roundedValue="md">
          Criar Conta
        </Button>
        <AuthProviders />
      </form>
    </AuthLayout>
  );
}

export default Signup;
