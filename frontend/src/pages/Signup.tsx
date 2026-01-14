import AuthLayout from "../layouts/AuthLayout";
import InputLabel from "../components/ui/InputLabel";
import Button from "../components/ui/Button";
import AuthProviders from "../components/auth/AuthProviders";
import useAuth from "../hooks/useAuth";

function Signup() {
  const {
    email,
    password,
    name,
    surname,
    setEmail,
    setPassword,
    setName,
    setSurname,
    handleSubmit,
  } = useAuth("signup");

  return (
    <AuthLayout
      title="Efetue seu Cadastro"
      text="Já possui uma conta?"
      link="/login"
      linkText="Logar"
      isTyping={false}
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="flex gap-4">
          <InputLabel
            text="Nome"
            name="name"
            value={name}
            onChange={setName}
            placeholder="Digite seu nome"
            type="text"
          />

          <InputLabel
            text="Sobrenome"
            name="surname"
            value={surname}
            onChange={setSurname}
            placeholder="Digite seu sobrenome"
            type="text"
          />
        </div>

        <InputLabel
          text="Email"
          name="email"
          value={email}
          onChange={setEmail}
          placeholder="Digite seu Email"
          type="email"
        />

        <InputLabel
          text="Senha"
          name="password"
          value={password}
          onChange={setPassword}
          placeholder="Digite sua senha"
          type="password"
        />

        <Button type="submit" title="Criar Conta" size="lg" roundedValue="md">
          Criar Conta
        </Button>

        <AuthProviders />
      </form>
    </AuthLayout>
  );
}

export default Signup;
