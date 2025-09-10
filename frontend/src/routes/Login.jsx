import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        senha: password,
      });

      // Se login OK, guarda user e vai pra home
      setUser(response.data);
      navigate("/home"); // redireciona para a rota /home
    } catch (error) {
      // Se erro, mostra mensagem
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status === 401) {
        setError("Usuário ou senha inválidos");
      } else {
        setError("Ocorreu um erro, tente novamente");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 sm:px-4">
      {user == null ? (
        <div className="bg-gray-800/90 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md text-center">
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Login</h2>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base sm:text-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-base sm:text-lg"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition duration-300 text-base sm:text-lg"
            >
              Entrar
            </button>
          </form>

          {/* Erro */}
          {error && <p className="text-red-500 mt-4 text-sm sm:text-base">{error}</p>}

          {/* Link para cadastro */}
          <p className="mt-6 text-gray-300 text-sm">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <Link to="/home" />
        </div>
      )}
    </div>
  );
};

export default Login;
