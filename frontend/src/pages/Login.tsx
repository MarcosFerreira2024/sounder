import AuthLayout from "../layouts/AuthLayout";
import InputLabel from "../components/ui/InputLabel";
import Button from "../components/ui/Button";
import AuthProviders from "../components/auth/AuthProviders";
import useAuth from "../hooks/useAuth";

function Login() {
  const { email, password, setEmail, setPassword, handleSubmit } =
    useAuth("login");
  return (
    <AuthLayout
      title={"Efetue seu Login"}
      text={"Ainda não possui uma conta?"}
      link={"/signup"}
      linkText={"Registre-se"}
      isTyping={false}
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col  gap-6">
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
          onChange={setPassword}
          placeholder="Digite sua senha"
          type="password"
          value={password}
        />
        <Button
          className="h-[50px] w-full"
          title="Entrar"
          size="lg"
          roundedValue="md"
        >
          Entrar
        </Button>
        <AuthProviders />
      </form>
    </AuthLayout>
  );
}

export default Login;
